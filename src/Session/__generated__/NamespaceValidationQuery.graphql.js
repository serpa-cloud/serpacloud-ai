/**
 * @generated SignedSource<<369d0a85019e4fbc14909149942c4b26>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type NamespaceValidationQuery$variables = {|
  name: string,
|};
export type NamespaceValidationQuery$data = {|
  +namespaceAvailability: boolean,
|};
export type NamespaceValidationQuery = {|
  response: NamespaceValidationQuery$data,
  variables: NamespaceValidationQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "kind": "ScalarField",
    "name": "namespaceAvailability",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NamespaceValidationQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NamespaceValidationQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3fd45052bc829bc46b2285e46f52b65c",
    "id": null,
    "metadata": {},
    "name": "NamespaceValidationQuery",
    "operationKind": "query",
    "text": "query NamespaceValidationQuery(\n  $name: String!\n) {\n  namespaceAvailability(name: $name)\n}\n"
  }
};
})();

(node/*: any*/).hash = "a074b94cde766d2ee058ec2c7aa5e75d";

module.exports = ((node/*: any*/)/*: Query<
  NamespaceValidationQuery$variables,
  NamespaceValidationQuery$data,
>*/);
