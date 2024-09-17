// Environment https://relay.dev/docs/en/network-layer.html
// import { v1 as uuidv1 } from 'uuid';
import {
  Store,
  Network,
  Observable,
  Environment,
  RecordSource,
  QueryResponseCache,
} from 'relay-runtime';

import { createClient } from 'graphql-ws';

const subscriptionsClient = createClient({
  url: process.env.REACT_APP_WS_ENDPOINT || 'ws://localhost:7100/_graphql',
});

/**
 * Cache graphql responses into relay data
 * 5 minutes to cache responses from graphql
 * https://relay.dev/docs/en/network-layer.html#caching
 */
const ttl = 60000 * 1;
const cache = new QueryResponseCache({ size: 250, ttl });
const endpoint = '/_graphql';

const isEnglish = window.location.hostname.includes('en.');

function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0');
}

function generateId(len) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

// Function to fetch from grapqhl
function fetcher({ isQuery, isMutation, operation, variables, sink }) {
  // We send the query(operation.text) and the variables of the query
  const body = {
    variables,
    query: operation.text,
  };
  const traceId = generateId(16);

  fetch(endpoint, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'x-request-id': traceId,
      'x-b3-traceid': traceId,
      'x-traceid': traceId,
      'x-b3-spanid': traceId,
      'x-locale': isEnglish ? 'en' : 'es',
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const json = await res.json();
      sink.next(json);
      sink.complete();

      if (isQuery && json) cache.set(operation.text || operation.id, variables, json);
      if (isMutation) cache.clear();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.trace(err);
    });
}

function fetchQuery(operation, variables, cacheConfig) {
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';

  /**
   * We receive this flag from relay, if cacheConfig.force is true
   * we ignore the cache and execute fetcher helper.
   *
   * We lookup for data in the cache with the query(operation.text) and variables
   */
  return Observable.create((sink) => {
    const forceFetch = cacheConfig && cacheConfig.force;
    const fromCache = cache.get(operation.text || operation.id, variables);

    if (isQuery && fromCache !== null && !forceFetch) {
      sink.next(fromCache);
      return sink.complete();
    }

    // Return fetcher promise
    return fetcher({ isQuery, isMutation, operation, variables, sink });
  });
}

function subscribe(operation, variables) {
  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }
    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink,
    );
  });
}

const store = new Store(new RecordSource(window.relayRecords), {});
const network = Network.create(fetchQuery, subscribe);
const environment = new Environment({
  store,
  network,
});

window.environment = environment;

export default environment;
