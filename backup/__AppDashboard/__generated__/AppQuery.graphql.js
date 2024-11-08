/**
 * @generated SignedSource<<5d751ed78b95e27c1f114f9a4998991f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type AIProjectType = "CREATE" | "IMPROVE" | "%future added value";
export type AppQuery$variables = {|
  id: string,
|};
export type AppQuery$data = {|
  +node: ?{|
    +currentConversation?: ?{|
      +id: string,
      +resume: ?string,
    |},
    +description?: string,
    +firstConversation?: ?{|
      +id: string,
      +resume: ?string,
    |},
    +id: string,
    +mode?: AIProjectType,
    +name?: string,
    +stackPreferences?: ?string,
    +summary?: string,
  |},
|};
export type AppQuery = {|
  response: AppQuery$data,
  variables: AppQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "resume",
    "storageKey": null
  }
],
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stackPreferences",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "firstConversation",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "currentConversation",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "type": "AIProject",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "926d5fe4638f7a9dbd7af9dc61d6c6c1",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on AIProject {\n      id\n      name\n      mode\n      summary\n      description\n      stackPreferences\n      firstConversation {\n        id\n        resume\n      }\n      currentConversation {\n        id\n        resume\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "e223e3c938cd6c437263d48e2d9ce093";

module.exports = ((node/*: any*/)/*: Query<
  AppQuery$variables,
  AppQuery$data,
>*/);
