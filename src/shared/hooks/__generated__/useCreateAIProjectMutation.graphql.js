/**
 * @generated SignedSource<<3f38014bf2d00366b905aba4cf02c45c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type AIProjectType = "CREATE" | "IMPROVE" | "%future added value";
export type useCreateAIProjectMutation$variables = {|
  description: string,
  mode: AIProjectType,
|};
export type useCreateAIProjectMutation$data = {|
  +createAIProject: {|
    +currentConversation: ?{|
      +id: string,
    |},
    +description: string,
    +id: string,
    +name: string,
  |},
|};
export type useCreateAIProjectMutation = {|
  response: useCreateAIProjectMutation$data,
  variables: useCreateAIProjectMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "description"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mode"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "mode",
        "variableName": "mode"
      }
    ],
    "concreteType": "AIProject",
    "kind": "LinkedField",
    "name": "createAIProject",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "currentConversation",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateAIProjectMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateAIProjectMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f540fd61e9ab3cb144c6b10149403a9b",
    "id": null,
    "metadata": {},
    "name": "useCreateAIProjectMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateAIProjectMutation(\n  $description: String!\n  $mode: AIProjectType!\n) {\n  createAIProject(description: $description, mode: $mode) {\n    id\n    name\n    description\n    currentConversation {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "1336f6b416f77c24a0304590831c28db";

module.exports = ((node/*: any*/)/*: Mutation<
  useCreateAIProjectMutation$variables,
  useCreateAIProjectMutation$data,
>*/);
