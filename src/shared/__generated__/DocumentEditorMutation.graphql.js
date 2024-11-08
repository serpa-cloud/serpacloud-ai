/**
 * @generated SignedSource<<1ec3b8e580c7234c9081ae73949550cc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type DocumentEditorMutation$variables = {|
  id: string,
  summary: string,
|};
export type DocumentEditorMutation$data = {|
  +updateProjectSummary: {|
    +id: string,
    +summary: string,
  |},
|};
export type DocumentEditorMutation = {|
  response: DocumentEditorMutation$data,
  variables: DocumentEditorMutation$variables,
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
    "name": "DocumentEditorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DocumentEditorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "676ff69b198823979a307ef6cfb29293",
    "id": null,
    "metadata": {},
    "name": "DocumentEditorMutation",
    "operationKind": "mutation",
    "text": "mutation DocumentEditorMutation(\n  $id: ID!\n  $summary: String!\n) {\n  updateProjectSummary(id: $id, summary: $summary) {\n    id\n    summary\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "108ac0c97d438b665eaae39bb35c07eb";

module.exports = ((node/*: any*/)/*: Mutation<
  DocumentEditorMutation$variables,
  DocumentEditorMutation$data,
>*/);
