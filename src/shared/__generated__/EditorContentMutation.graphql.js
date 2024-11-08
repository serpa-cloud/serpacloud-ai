/**
 * @generated SignedSource<<63918a55794b6ed61331577a342a0e50>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditorContentMutation$variables = {|
  id: string,
  summary: string,
|};
export type EditorContentMutation$data = {|
  +updateProjectSummary: {|
    +id: string,
    +summary: string,
  |},
|};
export type EditorContentMutation = {|
  response: EditorContentMutation$data,
  variables: EditorContentMutation$variables,
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
    "name": "EditorContentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditorContentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "64cffc16d7e738cde89e6e287a347a29",
    "id": null,
    "metadata": {},
    "name": "EditorContentMutation",
    "operationKind": "mutation",
    "text": "mutation EditorContentMutation(\n  $id: ID!\n  $summary: String!\n) {\n  updateProjectSummary(id: $id, summary: $summary) {\n    id\n    summary\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "8095e6d89324db002cde80e4aa669fdc";

module.exports = ((node/*: any*/)/*: Mutation<
  EditorContentMutation$variables,
  EditorContentMutation$data,
>*/);
