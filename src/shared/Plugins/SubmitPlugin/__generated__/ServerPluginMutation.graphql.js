/**
 * @generated SignedSource<<70361c03f87ca777a7c16f569256c8d2>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type ServerPluginMutation$variables = {|
  id: string,
  summary: string,
|};
export type ServerPluginMutation$data = {|
  +updateProjectSummary: {|
    +id: string,
    +summary: string,
  |},
|};
export type ServerPluginMutation = {|
  response: ServerPluginMutation$data,
  variables: ServerPluginMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "summary"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "summary",
        "variableName": "summary"
      }
    ],
    "concreteType": "AIProject",
    "kind": "LinkedField",
    "name": "updateProjectSummary",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "summary",
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
    "name": "ServerPluginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerPluginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3465c1dd429be6677cc7e6bc4b7eba40",
    "id": null,
    "metadata": {},
    "name": "ServerPluginMutation",
    "operationKind": "mutation",
    "text": "mutation ServerPluginMutation(\n  $id: ID!\n  $summary: String!\n) {\n  updateProjectSummary(id: $id, summary: $summary) {\n    id\n    summary\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "3cfd6f4f48a7e14c66a2d462bd05983b";

module.exports = ((node/*: any*/)/*: Mutation<
  ServerPluginMutation$variables,
  ServerPluginMutation$data,
>*/);
