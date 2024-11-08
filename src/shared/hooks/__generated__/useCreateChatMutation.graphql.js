/**
 * @generated SignedSource<<e5f330dfacef50eecaaa927c99a79e41>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
import type { MessagesList$fragmentType } from "./../../../Chat/__generated__/MessagesList.graphql";
export type useCreateChatMutation$variables = {|
  before?: ?any,
  last?: ?number,
  projectId: string,
|};
export type useCreateChatMutation$data = {|
  +createChat: {|
    +id: string,
    +$fragmentSpreads: MessagesList$fragmentType,
  |},
|};
export type useCreateChatMutation = {|
  response: useCreateChatMutation$data,
  variables: useCreateChatMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "before"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "projectId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "projectId",
    "variableName": "projectId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateChatMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "createChat",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessagesList"
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
    "name": "useCreateChatMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "createChat",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v5/*: any*/),
            "concreteType": "AIMessagesConnection",
            "kind": "LinkedField",
            "name": "messages",
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
                  (v4/*: any*/),
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
                      (v4/*: any*/),
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
            "args": (v5/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "MessagesList__messages",
            "kind": "LinkedHandle",
            "name": "messages"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a95515912d7eceff7109c4a7f94c8867",
    "id": null,
    "metadata": {},
    "name": "useCreateChatMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateChatMutation(\n  $projectId: ID!\n  $last: Int\n  $before: Cursor\n) {\n  createChat(projectId: $projectId) {\n    id\n    ...MessagesList\n  }\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n\nfragment MessagesList on Chat {\n  id\n  messages(last: $last, before: $before) {\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      id\n      cursor\n      node {\n        ...ChatMessage\n        role\n        id\n        __typename\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "a7f439f411207f382dbbbac351f23bf9";

module.exports = ((node/*: any*/)/*: Mutation<
  useCreateChatMutation$variables,
  useCreateChatMutation$data,
>*/);
