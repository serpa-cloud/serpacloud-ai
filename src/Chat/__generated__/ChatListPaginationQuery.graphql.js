/**
 * @generated SignedSource<<5ae945ed410a46af75523994582e1a95>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
import type { ChatList$fragmentType } from "./ChatList.graphql";
export type ChatListPaginationQuery$variables = {|
  before?: ?any,
  conversation: string,
  last?: ?number,
|};
export type ChatListPaginationQuery$data = {|
  +$fragmentSpreads: ChatList$fragmentType,
|};
export type ChatListPaginationQuery = {|
  response: ChatListPaginationQuery$data,
  variables: ChatListPaginationQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "before"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "conversation"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "last"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
  },
  {
    "kind": "Variable",
    "name": "conversation",
    "variableName": "conversation"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
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
    "name": "ChatListPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ChatList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AIMessagesConnection",
        "kind": "LinkedField",
        "name": "conversation",
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
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AIMessageEdge",
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
                "concreteType": "AIMessage",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "role",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "content",
                    "storageKey": null
                  },
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
                    "name": "__typename",
                    "storageKey": null
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
          "conversation"
        ],
        "handle": "connection",
        "key": "ChatList__conversation",
        "kind": "LinkedHandle",
        "name": "conversation"
      }
    ]
  },
  "params": {
    "cacheID": "aa4bda29672b8fc797a64fdc4b419e79",
    "id": null,
    "metadata": {},
    "name": "ChatListPaginationQuery",
    "operationKind": "query",
    "text": "query ChatListPaginationQuery(\n  $before: Cursor\n  $conversation: String!\n  $last: Int\n) {\n  ...ChatList\n}\n\nfragment ChatList on Query {\n  conversation(last: $last, before: $before, conversation: $conversation) {\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      id\n      cursor\n      node {\n        ...ChatMessage\n        role\n        id\n        __typename\n      }\n    }\n  }\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n"
  }
};
})();

(node/*: any*/).hash = "62f6a0ce8cacef6830f2ee0a89d24e58";

module.exports = ((node/*: any*/)/*: Query<
  ChatListPaginationQuery$variables,
  ChatListPaginationQuery$data,
>*/);
