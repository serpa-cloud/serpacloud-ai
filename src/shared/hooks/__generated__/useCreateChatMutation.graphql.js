/**
 * @generated SignedSource<<dcd138bb1152f8d2f28877fd65cab860>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
import type { ChatResume$fragmentType } from "./../../../Menu/__generated__/ChatResume.graphql";
import type { MessagesList$fragmentType } from "./../../../Chat/__generated__/MessagesList.graphql";
export type useCreateChatMutation$variables = {|
  before?: ?any,
  connections: $ReadOnlyArray<string>,
  last?: ?number,
|};
export type useCreateChatMutation$data = {|
  +createChat: {|
    +cursor: any,
    +id: string,
    +node: {|
      +id?: string,
      +$fragmentSpreads: ChatResume$fragmentType & MessagesList$fragmentType,
    |},
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
  "name": "connections"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = [
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
        "args": null,
        "concreteType": "Edge",
        "kind": "LinkedField",
        "name": "createChat",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ChatResume"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "MessagesList"
                  }
                ],
                "type": "Chat",
                "abstractKey": null
              }
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateChatMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Edge",
        "kind": "LinkedField",
        "name": "createChat",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "resume",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v6/*: any*/),
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
                          (v3/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AIMessage",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
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
                              (v5/*: any*/)
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
                    "args": (v6/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "MessagesList__messages",
                    "kind": "LinkedHandle",
                    "name": "messages"
                  }
                ],
                "type": "Chat",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "filters": null,
        "handle": "prependEdge",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createChat",
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
    "cacheID": "ec4a69b372b74ea0d53d7c7f453d9924",
    "id": null,
    "metadata": {},
    "name": "useCreateChatMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateChatMutation(\n  $last: Int\n  $before: Cursor\n) {\n  createChat {\n    id\n    cursor\n    node {\n      __typename\n      ... on Chat {\n        id\n        ...ChatResume\n        ...MessagesList\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ChatMessage on AIMessage {\n  id\n  role\n  content\n  createdAt\n}\n\nfragment ChatResume on Chat {\n  id\n  resume\n}\n\nfragment MessagesList on Chat {\n  id\n  messages(last: $last, before: $before) {\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      id\n      cursor\n      node {\n        ...ChatMessage\n        role\n        id\n        __typename\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "9fb4cb7556a0e675a59c68c577263375";

module.exports = ((node/*: any*/)/*: Mutation<
  useCreateChatMutation$variables,
  useCreateChatMutation$data,
>*/);
