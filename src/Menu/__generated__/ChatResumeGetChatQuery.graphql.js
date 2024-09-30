/**
 * @generated SignedSource<<e9794b7901ee78fb7820b72ac55082d6>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type ChatResumeGetChatQuery$variables = {|
  id: string,
|};
export type ChatResumeGetChatQuery$data = {|
  +node: ?{|
    +createdAt?: any,
    +createdAtFormatted?: string,
    +id: string,
  |},
|};
export type ChatResumeGetChatQuery = {|
  response: ChatResumeGetChatQuery$data,
  variables: ChatResumeGetChatQuery$variables,
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
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAtFormatted",
      "storageKey": null
    }
  ],
  "type": "Chat",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatResumeGetChatQuery",
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
          (v3/*: any*/)
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
    "name": "ChatResumeGetChatQuery",
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9b2a4bfdc479b87fce0ff68e5446e2bd",
    "id": null,
    "metadata": {},
    "name": "ChatResumeGetChatQuery",
    "operationKind": "query",
    "text": "query ChatResumeGetChatQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on Chat {\n      id\n      createdAt\n      createdAtFormatted\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "92a3255185d61a96b20b296b69684198";

module.exports = ((node/*: any*/)/*: Query<
  ChatResumeGetChatQuery$variables,
  ChatResumeGetChatQuery$data,
>*/);
