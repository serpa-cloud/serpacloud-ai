/**
 * @generated SignedSource<<f19e14d323d115db5705fb619e6bc1cd>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import type { ChatMessage$fragmentType } from "./ChatMessage.graphql";
export type AIRole = "assistant" | "user" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ChatList$fragmentType: FragmentType;
type ChatListPaginationQuery$variables = any;
export type ChatList$data = {|
  +conversation: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +cursor: any,
      +id: string,
      +node: {|
        +role: AIRole,
        +$fragmentSpreads: ChatMessage$fragmentType,
      |},
    |}>,
    +pageInfo: ?{|
      +hasPreviousPage: ?boolean,
      +startCursor: ?any,
    |},
  |},
  +$fragmentType: ChatList$fragmentType,
|};
export type ChatList$key = {
  +$data?: ChatList$data,
  +$fragmentSpreads: ChatList$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = [
  "conversation"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "before"
    },
    {
      "kind": "RootArgument",
      "name": "conversation"
    },
    {
      "kind": "RootArgument",
      "name": "last"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "last",
        "cursor": "before",
        "direction": "backward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": null,
        "backward": {
          "count": "last",
          "cursor": "before"
        },
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ChatListPaginationQuery.graphql')
    }
  },
  "name": "ChatList",
  "selections": [
    {
      "alias": "conversation",
      "args": [
        {
          "kind": "Variable",
          "name": "conversation",
          "variableName": "conversation"
        }
      ],
      "concreteType": "AIMessagesConnection",
      "kind": "LinkedField",
      "name": "__ChatList__conversation_connection",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ChatMessage"
                },
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "62f6a0ce8cacef6830f2ee0a89d24e58";

module.exports = ((node/*: any*/)/*: RefetchableFragment<
  ChatList$fragmentType,
  ChatList$data,
  ChatListPaginationQuery$variables,
>*/);
