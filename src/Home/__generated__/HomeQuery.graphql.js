/**
 * @generated SignedSource<<f2a857ce51005c29b9578c0fa39893a4>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { ProjectCard$fragmentType } from "./../../ProjectCard/__generated__/ProjectCard.graphql";
export type HomeQuery$variables = {||};
export type HomeQuery$data = {|
  +entities: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +cursor: any,
      +id: string,
      +node: {|
        +__typename: "AIProject",
        +id: string,
        +$fragmentSpreads: ProjectCard$fragmentType,
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other",
      |},
    |}>,
    +pageInfo: ?{|
      +endCursor: ?any,
      +finalCursor: ?any,
      +hasNextPage: ?boolean,
    |},
  |},
  +me: ?{|
    +id: string,
    +name: ?string,
  |},
|};
export type HomeQuery = {|
  response: HomeQuery$data,
  variables: HomeQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "me",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  {
    "kind": "Literal",
    "name": "index",
    "value": "PROJECTS"
  }
],
v4 = {
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "EntitiesConnection",
        "kind": "LinkedField",
        "name": "entities",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Edge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v0/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "ProjectCard"
                      }
                    ],
                    "type": "AIProject",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "entities(first:3,index:\"PROJECTS\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "EntitiesConnection",
        "kind": "LinkedField",
        "name": "entities",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Edge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v6/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "key",
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "summary",
                        "storageKey": null
                      }
                    ],
                    "type": "AIProject",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v0/*: any*/)
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
        "storageKey": "entities(first:3,index:\"PROJECTS\")"
      }
    ]
  },
  "params": {
    "cacheID": "40b83bba32ce39e0ee4bf368aa0fbfab",
    "id": null,
    "metadata": {},
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery {\n  me {\n    id\n    name\n  }\n  entities(first: 3, index: PROJECTS) {\n    pageInfo {\n      hasNextPage\n      endCursor\n      finalCursor\n    }\n    edges {\n      id\n      cursor\n      node {\n        __typename\n        ... on AIProject {\n          id\n          ...ProjectCard\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ProjectCard on AIProject {\n  id\n  key\n  name\n  summary\n}\n"
  }
};
})();

(node/*: any*/).hash = "ed0b82be36103d2d030ee23b31caa6f3";

module.exports = ((node/*: any*/)/*: Query<
  HomeQuery$variables,
  HomeQuery$data,
>*/);
