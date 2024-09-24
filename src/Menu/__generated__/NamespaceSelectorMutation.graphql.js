/**
 * @generated SignedSource<<9eb0c8c30f7e6f70547137fac2d57161>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type NamespaceSelectorMutation$variables = {|
  namespaceId: string,
|};
export type NamespaceSelectorMutation$data = {|
  +setNamespace: boolean,
|};
export type NamespaceSelectorMutation = {|
  response: NamespaceSelectorMutation$data,
  variables: NamespaceSelectorMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "namespaceId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "namespaceId",
        "variableName": "namespaceId"
      }
    ],
    "kind": "ScalarField",
    "name": "setNamespace",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NamespaceSelectorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NamespaceSelectorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "06119eceadaa689e3cbbb32d4c5b93b4",
    "id": null,
    "metadata": {},
    "name": "NamespaceSelectorMutation",
    "operationKind": "mutation",
    "text": "mutation NamespaceSelectorMutation(\n  $namespaceId: ID!\n) {\n  setNamespace(namespaceId: $namespaceId)\n}\n"
  }
};
})();

(node/*: any*/).hash = "b3f176a0c4029207a351261bab666384";

module.exports = ((node/*: any*/)/*: Mutation<
  NamespaceSelectorMutation$variables,
  NamespaceSelectorMutation$data,
>*/);
