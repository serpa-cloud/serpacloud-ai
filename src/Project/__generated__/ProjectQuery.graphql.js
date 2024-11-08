/**
 * @generated SignedSource<<4d15d4ef52ac750c3bc518223c454aa8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type ProjectQuery$variables = {|
  id: string,
|};
export type ProjectQuery$data = {|
  +node: ?{|
    +id: string,
    +key?: string,
    +name?: string,
    +summary?: string,
  |},
|};
export type ProjectQuery = {|
  response: ProjectQuery$data,
  variables: ProjectQuery$variables,
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
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "key",
      "storageKey": null
    },
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
      "name": "summary",
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
    "name": "ProjectQuery",
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
          (v3/*: any*/)
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
    "name": "ProjectQuery",
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b65076babfd875defdb9bfc44a04d771",
    "id": null,
    "metadata": {},
    "name": "ProjectQuery",
    "operationKind": "query",
    "text": "query ProjectQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on AIProject {\n      id\n      key\n      name\n      summary\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "7c834dbda4b24de4a5ef5b45baafb45e";

module.exports = ((node/*: any*/)/*: Query<
  ProjectQuery$variables,
  ProjectQuery$data,
>*/);
