/**
 * @generated SignedSource<<7695c72c6e6d1ae4b679b0a701faaffe>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AppDashboardQuery$variables = {|
  id: string,
|};
export type AppDashboardQuery$data = {|
  +node: ?{|
    +clarifyingAsks?: ?string,
    +currentConversation?: ?{|
      +id: string,
      +resume: ?string,
    |},
    +description?: string,
    +firstConversation?: ?{|
      +id: string,
      +resume: ?string,
    |},
    +id: string,
    +name?: string,
    +stackPreferences?: ?string,
    +summary?: string,
  |},
|};
export type AppDashboardQuery = {|
  response: AppDashboardQuery$data,
  variables: AppDashboardQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "resume",
    "storageKey": null
  }
],
v4 = {
  "kind": "InlineFragment",
  "selections": [
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
      "name": "clarifyingAsks",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stackPreferences",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "firstConversation",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "currentConversation",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "type": "AIProject",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppDashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppDashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
          (v2/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1273b852824e52f46bfee9943da835e2",
    "id": null,
    "metadata": {},
    "name": "AppDashboardQuery",
    "operationKind": "query",
    "text": "query AppDashboardQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on AIProject {\n      id\n      name\n      clarifyingAsks\n      summary\n      description\n      stackPreferences\n      firstConversation {\n        id\n        resume\n      }\n      currentConversation {\n        id\n        resume\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "9bd2f9cff4df17ed2bfe8af183573eb3";

module.exports = ((node/*: any*/)/*: Query<
  AppDashboardQuery$variables,
  AppDashboardQuery$data,
>*/);
