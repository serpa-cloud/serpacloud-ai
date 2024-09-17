/**
 * @generated SignedSource<<96d134c6d9a9780176fdf51331f384c3>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
import type { ChatMessage$fragmentType } from "./ChatMessage.graphql";
export type AIRole = "assistant" | "user" | "%future added value";
export type ChatSendMessageMutation$variables = {|
  connections: $ReadOnlyArray<string>,
  conversation: string,
  message: string,
|};
export type ChatSendMessageMutation$data = {|
  +promptToSerpaCloudAI: ?{|
    +cursor: any,
    +id: string,
    +node: {|
      +role: AIRole,
      +$fragmentSpreads: ChatMessage$fragmentType,
    |},
  |},
|};
export type ChatSendMessageMutation = {|
  response: ChatSendMessageMutation$data,
  variables: ChatSendMessageMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "conversation"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "message"
},
v3 = [
  {
    "kind": "Variable",
    "name": "conversation",
    "variableName": "conversation"
  },
  {
    "kind": "Variable",
    "name": "message",
    "variableName": "message"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "role",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatSendMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "AIMessageEdge",
        "kind": "LinkedField",
        "name": "promptToSerpaCloudAI",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
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
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChatSendMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "AIMessageEdge",
        "kind": "LinkedField",
        "name": "promptToSerpaCloudAI",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AIMessage",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/),
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
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": null,
        "handle": "appendEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "promptToSerpaCloudAI",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "fe12d454f4304325b8627f964696f882",
    "id": null,
    "metadata": {},
    "name": "ChatSendMessageMutation",
    "operationKind": "mutation",
    "text": "mutation ChatSendMessageMutation(\n  $message: String!\n  $conversation: ID!\n) {\n  promptToSerpaCloudAI(message: $message, conversation: $conversation) {\n    id\n    cursor\n    node {\n      ...ChatMessage\n      role\n      id\n    }\n  }\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n"
  }
};
})();

(node/*: any*/).hash = "7b4275d71eef031c1b9f9b775da5aa99";

module.exports = ((node/*: any*/)/*: Mutation<
  ChatSendMessageMutation$variables,
  ChatSendMessageMutation$data,
>*/);
