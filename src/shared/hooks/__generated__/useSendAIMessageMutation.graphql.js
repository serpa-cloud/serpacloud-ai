/**
 * @generated SignedSource<<5224c3f4bf8bd0b5720aba9a9fa4c861>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
import type { ChatMessage$fragmentType } from "./../../../Chat/__generated__/ChatMessage.graphql";
export type AIRole = "assistant" | "user" | "%future added value";
export type useSendAIMessageMutation$variables = {|
  connections: $ReadOnlyArray<string>,
  conversation: string,
  message: string,
|};
export type useSendAIMessageMutation$data = {|
  +promptToSerpaCloudAI: ?{|
    +cursor: any,
    +id: string,
    +node: {|
      +role: AIRole,
      +$fragmentSpreads: ChatMessage$fragmentType,
    |},
  |},
|};
export type useSendAIMessageMutation = {|
  response: useSendAIMessageMutation$data,
  variables: useSendAIMessageMutation$variables,
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
    "name": "useSendAIMessageMutation",
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
    "name": "useSendAIMessageMutation",
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
    "cacheID": "0033f60ce6d3b089141f4593c8187a78",
    "id": null,
    "metadata": {},
    "name": "useSendAIMessageMutation",
    "operationKind": "mutation",
    "text": "mutation useSendAIMessageMutation(\n  $message: String!\n  $conversation: ID!\n) {\n  promptToSerpaCloudAI(message: $message, conversation: $conversation) {\n    id\n    cursor\n    node {\n      ...ChatMessage\n      role\n      id\n    }\n  }\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n"
  }
};
})();

(node/*: any*/).hash = "268e163d518a65ad255eb5a211c0de83";

module.exports = ((node/*: any*/)/*: Mutation<
  useSendAIMessageMutation$variables,
  useSendAIMessageMutation$data,
>*/);
