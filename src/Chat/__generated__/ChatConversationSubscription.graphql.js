/**
 * @generated SignedSource<<6d14b76ebe34db362cab5d65b369eae2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import type { ChatMessage$fragmentType } from "./ChatMessage.graphql";
export type AIRole = "assistant" | "user" | "%future added value";
export type ChatConversationSubscription$variables = {|
  conversation: string,
|};
export type ChatConversationSubscription$data = {|
  +aiConversation: ?{|
    +cursor: any,
    +id: string,
    +node: {|
      +role: AIRole,
      +$fragmentSpreads: ChatMessage$fragmentType,
    |},
  |},
|};
export type ChatConversationSubscription = {|
  response: ChatConversationSubscription$data,
  variables: ChatConversationSubscription$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "conversation"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "conversation",
    "variableName": "conversation"
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "role",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatConversationSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AIMessageEdge",
        "kind": "LinkedField",
        "name": "aiConversation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatConversationSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AIMessageEdge",
        "kind": "LinkedField",
        "name": "aiConversation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AIMessage",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v4/*: any*/),
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e20405a527aa8926f11cf56063fe89e",
    "id": null,
    "metadata": {},
    "name": "ChatConversationSubscription",
    "operationKind": "subscription",
    "text": "subscription ChatConversationSubscription(\n  $conversation: ID!\n) {\n  aiConversation(conversation: $conversation) {\n    id\n    cursor\n    node {\n      ...ChatMessage\n      role\n      id\n    }\n  }\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n"
  }
};
})();

(node/*: any*/).hash = "6cc27b7bec8293a450a6a3ee05fe8b5a";

module.exports = ((node/*: any*/)/*: GraphQLSubscription<
  ChatConversationSubscription$variables,
  ChatConversationSubscription$data,
>*/);
