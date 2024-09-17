/**
 * @generated SignedSource<<7209365790a898ea765abe0f48e68de4>>
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
export type MessagesConversationSubscription$variables = {|
  conversation: string,
|};
export type MessagesConversationSubscription$data = {|
  +aiConversation: ?{|
    +cursor: any,
    +id: string,
    +node: {|
      +role: AIRole,
      +$fragmentSpreads: ChatMessage$fragmentType,
    |},
  |},
|};
export type MessagesConversationSubscription = {|
  response: MessagesConversationSubscription$data,
  variables: MessagesConversationSubscription$variables,
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
    "name": "MessagesConversationSubscription",
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
    "name": "MessagesConversationSubscription",
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
    "cacheID": "71b46f92bdd610f285e4d8f55b04cfdb",
    "id": null,
    "metadata": {},
    "name": "MessagesConversationSubscription",
    "operationKind": "subscription",
    "text": "subscription MessagesConversationSubscription(\n  $conversation: ID!\n) {\n  aiConversation(conversation: $conversation) {\n    id\n    cursor\n    node {\n      ...ChatMessage\n      role\n      id\n    }\n  }\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n"
  }
};
})();

(node/*: any*/).hash = "b27cc11cc99924295d5d50a8a1dd97c7";

module.exports = ((node/*: any*/)/*: GraphQLSubscription<
  MessagesConversationSubscription$variables,
  MessagesConversationSubscription$data,
>*/);
