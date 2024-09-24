// @flow
import stylex from '@serpa-cloud/stylex';
import { Suspense, useState, useMemo } from 'react';
import { graphql, useMutation, useLazyLoadQuery } from 'react-relay';

import {
  Icon,
  Text,
  Avatar,
  Spinner,
  Flexbox,
  Padding,
  Divider,
  InteractiveElement,
} from '../shared';

import type { NamespaceSelectorMutation } from './__generated__/NamespaceSelectorMutation.graphql';

const styles = stylex.create({
  root: {
    width: '240px',
  },
  head: {
    borderBottom: '1px solid var(--divider)',
  },
  addContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'var(--neutral-color-300)',
  },
  row: {
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: 'var(--fds-duration-short-in)',
    transitionTimingFunction: 'var(--fds-animation-fade-in)',
    ':hover': {
      backgroundColor: 'var(--hover-overlay)',
      transitionDuration: 'var(--fds-duration-short-out)',
      transitionTimingFunction: 'var(--fds-animation-fade-out)',
    },
  },
});

function OrgList(): React$Node {
  const [selectedNameSpace, setSelectedNameSpace] = useState<string>('');

  const orgsData = useLazyLoadQuery(
    graphql`
      query NamespaceSelectorQuery {
        me {
          id
          name: fullname
          key: username
          media(width: 80, height: 80) {
            ...Avatar
          }
          organizations {
            id
            key
            name
            media(width: 80, height: 80) {
              ...Avatar
            }
          }
        }
      }
    `,
    {},
    {
      fetchPolicy: 'store-or-network',
    },
  );

  const { me } = orgsData;

  const orgs = useMemo(() => {
    return [
      {
        id: me?.id ?? '',
        name: me?.name,
        key: me?.key ?? '',
        media: me?.media,
      },
    ].concat([...(me?.organizations ?? [])]);
  }, [me]);

  const [setNameSpace, setNameSpaceIsPending] = useMutation<NamespaceSelectorMutation>(graphql`
    mutation NamespaceSelectorMutation($namespaceId: ID!) {
      setNamespace(namespaceId: $namespaceId)
    }
  `);

  return (
    <Padding horizontal={4} vertical={8}>
      <Flexbox flexDirection="column" rowGap={8}>
        {(orgs ?? []).map((org) => (
          <InteractiveElement
            key={org.id}
            className={stylex(styles.row)}
            onClick={() => {
              setSelectedNameSpace(org.id);

              setNameSpace({
                variables: {
                  namespaceId: org.id,
                },
                onCompleted() {
                  global?.localStorage?.removeItem('MICROAPP.PROCESS');
                  // eslint-disable-next-line no-self-assign
                  window.location.href = window.location.href;
                },
              });
            }}
          >
            <Padding vertical={4} left={4} right={8}>
              <Flexbox alignItems="center" justifyContent="space-between">
                <Flexbox columnGap={12} alignItems="center">
                  <Avatar
                    node={org.media ?? null}
                    fallbackIcon={<Icon icon="domain" size={16} />}
                  />
                  <Flexbox flexDirection="column" rowGap={8}>
                    <Text type="s0b" color="--neutral-color-800">
                      {org.name}
                    </Text>
                    <Text type="s0r" color="--neutral-color-600">
                      {`@${org.key}`}
                    </Text>
                  </Flexbox>
                </Flexbox>
                {setNameSpaceIsPending && selectedNameSpace === org.id && <Spinner size={16} />}
              </Flexbox>
            </Padding>
          </InteractiveElement>
        ))}
      </Flexbox>
      {false && (
        <>
          <Padding vertical={8}>
            <Divider />
          </Padding>
          <InteractiveElement className={stylex(styles.row)} onClick={() => {}}>
            <Padding vertical={4} horizontal={4}>
              <Flexbox columnGap={12} alignItems="center">
                <Flexbox
                  className={stylex(styles.addContainer)}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon icon="add" size={20} weight={400} color="--neutral-color-600" />
                </Flexbox>
                <Flexbox flexDirection="column" rowGap={8}>
                  <Text type="s0b" color="--neutral-color-800" id="namespaceSelector.createOrg" />
                </Flexbox>
              </Flexbox>
            </Padding>
          </InteractiveElement>
        </>
      )}
    </Padding>
  );
}

export default function OrgsSelector(): React$Node {
  return (
    <div className={stylex(styles.root)}>
      <Suspense
        fallback={
          <Flexbox alignItems="center" justifyContent="center">
            <Padding vertical={80}>
              <Spinner />
            </Padding>
          </Flexbox>
        }
      >
        <OrgList />
      </Suspense>
    </div>
  );
}
