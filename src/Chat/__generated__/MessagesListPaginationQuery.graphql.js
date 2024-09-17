/**
 * @generated SignedSource<<ae21fe71d87acdea3d296ea5c7600742>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
import type { MessagesList$fragmentType } from "./MessagesList.graphql";
export type MessagesListPaginationQuery$variables = {|
  before?: ?any,
  conversation: string,
  last?: ?number,
|};
export type MessagesListPaginationQuery$data = {|
  +$fragmentSpreads: MessagesList$fragmentType,
|};
export type MessagesListPaginationQuery = {|
  response: MessagesListPaginationQuery$data,
  variables: MessagesListPaginationQuery$variables,
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
    "name": "MessagesListPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MessagesList"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessagesListPaginationQuery",
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
        "key": "MessagesList__conversation",
        "kind": "LinkedHandle",
        "name": "conversation"
      }
    ]
  },
  "params": {
    "cacheID": "5dd7eadaf922bc51730f90fdf14ad098",
    "id": null,
    "metadata": {},
    "name": "MessagesListPaginationQuery",
    "operationKind": "query",
    "text": "query MessagesListPaginationQuery(\n  $before: Cursor\n  $conversation: String!\n  $last: Int\n) {\n  ...MessagesList\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n\nfragment MessagesList on Query {\n  conversation(last: $last, before: $before, conversation: $conversation) {\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      id\n      cursor\n      node {\n        ...ChatMessage\n        role\n        id\n        __typename\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "1c23c5edb825b8cb152e0ddc75c56a5c";

module.exports = ((node/*: any*/)/*: Query<
  MessagesListPaginationQuery$variables,
  MessagesListPaginationQuery$data,
>*/);
