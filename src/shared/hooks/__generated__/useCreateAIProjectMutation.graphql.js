/**
 * @generated SignedSource<<ffbc360e5725767ceedc79d760930f47>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type useCreateAIProjectMutation$variables = {||};
export type useCreateAIProjectMutation$data = {|
  +createAIProject: {|
    +id: string,
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
    "alias": null,
    "args": null,
    "concreteType": "AIProject",
    "kind": "LinkedField",
    "name": "createAIProject",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateAIProjectMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useCreateAIProjectMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "768648b0cb2abd836b779c828c05ab57",
    "id": null,
    "metadata": {},
    "name": "useCreateAIProjectMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateAIProjectMutation {\n  createAIProject {\n    id\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "acb4125579810cfa50ed4cd3567e80ad";

module.exports = ((node/*: any*/)/*: Mutation<
  useCreateAIProjectMutation$variables,
  useCreateAIProjectMutation$data,
>*/);
