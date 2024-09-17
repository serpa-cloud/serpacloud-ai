/**
 * @generated SignedSource<<a5cfbcf202fbcf91d96fa06b8f763fe6>>
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
declare export opaque type MessagesList$fragmentType: FragmentType;
type MessagesListPaginationQuery$variables = any;
export type MessagesList$data = {|
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
  +$fragmentType: MessagesList$fragmentType,
|};
export type MessagesList$key = {
  +$data?: MessagesList$data,
  +$fragmentSpreads: MessagesList$fragmentType,
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
      "operation": require('./MessagesListPaginationQuery.graphql')
    }
  },
  "name": "MessagesList",
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
      "name": "__MessagesList__conversation_connection",
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

(node/*: any*/).hash = "1c23c5edb825b8cb152e0ddc75c56a5c";

module.exports = ((node/*: any*/)/*: RefetchableFragment<
  MessagesList$fragmentType,
  MessagesList$data,
  MessagesListPaginationQuery$variables,
>*/);
