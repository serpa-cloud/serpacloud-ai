/**
 * @generated SignedSource<<9b02a19247407822a232deeb999fd9fb>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
import type { ScrolledListElement$fragmentType } from "./ScrolledListElement.graphql";
export type ElasticIndex = "ACCOUNTS" | "ALL" | "APPS" | "ARTIFACTS" | "BUILDS" | "CHANNELS" | "CHATS" | "DEPLOYMENTS" | "DOCKERFILES" | "ENVIRONMENTS" | "IMPLEMENTATIONS" | "KUBERNETES" | "ORGS" | "POSTS" | "PROJECTS" | "RELEASES" | "SITES" | "%future added value";
export type FilterInput = {|
  gt?: ?number,
  lte?: ?number,
  property: string,
  type: string,
  value?: ?string,
  valueBoolean?: ?boolean,
  valueNumber?: ?number,
|};
export type QueryInput = {|
  field: $ReadOnlyArray<string>,
  value: string,
|};
export type SortInput = {|
  property: string,
  value: string,
|};
export type ScrolledListPaginationQuery$variables = {|
  after?: ?any,
  filterMatrix?: ?$ReadOnlyArray<?$ReadOnlyArray<?FilterInput>>,
  first?: ?number,
  index?: ?ElasticIndex,
  query?: ?QueryInput,
  sort?: ?SortInput,
|};
export type ScrolledListPaginationQuery$data = {|
  +$fragmentSpreads: ScrolledListElement$fragmentType,
|};
export type ScrolledListPaginationQuery = {|
  response: ScrolledListPaginationQuery$data,
  variables: ScrolledListPaginationQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "filterMatrix"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "index"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "query"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sort"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "filterMatrix",
    "variableName": "filterMatrix"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "index",
    "variableName": "index"
  },
  {
    "kind": "Variable",
    "name": "query",
    "variableName": "query"
  },
  {
    "kind": "Variable",
    "name": "sort",
    "variableName": "sort"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ScrolledListPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ScrolledListElement"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ScrolledListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EntitiesConnection",
        "kind": "LinkedField",
        "name": "entities",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "finalCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Edge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "resume",
                        "storageKey": null
                      }
                    ],
                    "type": "Chat",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      }
                    ],
                    "type": "AIProject",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "type": "Node",
                    "abstractKey": "__isNode"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "sort",
          "index",
          "query",
          "filterMatrix"
        ],
        "handle": "connection",
        "key": "ScrolledList_root_entities",
        "kind": "LinkedHandle",
        "name": "entities"
      }
    ]
  },
  "params": {
    "cacheID": "3dde8b7c2f0ccb9f93c640a57fd4c716",
    "id": null,
    "metadata": {},
    "name": "ScrolledListPaginationQuery",
    "operationKind": "query",
    "text": "query ScrolledListPaginationQuery(\n  $after: Cursor\n  $filterMatrix: [[FilterInput]]\n  $first: Int\n  $index: ElasticIndex\n  $query: QueryInput\n  $sort: SortInput\n) {\n  ...ScrolledListElement\n}\n\nfragment ChatResume on Chat {\n  id\n  resume\n}\n\nfragment ProjectPreview on AIProject {\n  id\n  name\n  description\n}\n\nfragment ScrolledListElement on Query {\n  entities(sort: $sort, first: $first, after: $after, index: $index, query: $query, filterMatrix: $filterMatrix) {\n    pageInfo {\n      hasNextPage\n      endCursor\n      finalCursor\n    }\n    edges {\n      id\n      cursor\n      node {\n        __typename\n        ... on Chat {\n          id\n          ...ChatResume\n        }\n        ... on AIProject {\n          id\n          ...ProjectPreview\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "647882b12e0d67329c1dfa2f0d981165";

module.exports = ((node/*: any*/)/*: Query<
  ScrolledListPaginationQuery$variables,
  ScrolledListPaginationQuery$data,
>*/);
