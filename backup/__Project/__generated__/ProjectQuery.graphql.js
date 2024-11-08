/**
 * @generated SignedSource<<87b798ad6444dde0cf3ad2c169ab89a8>>
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
    +name?: string,
    +stackPreferences?: ?string,
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
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b7304b09056ccc4015216bef3d36da74",
    "id": null,
    "metadata": {},
    "name": "ProjectQuery",
    "operationKind": "query",
    "text": "query ProjectQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on AIProject {\n      id\n      name\n      description\n      stackPreferences\n      firstConversation {\n        id\n        resume\n      }\n      currentConversation {\n        id\n        resume\n      }\n    }\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "39d01fa2591b65bc9fd00fe6a586cc76";

module.exports = ((node/*: any*/)/*: Query<
  ProjectQuery$variables,
  ProjectQuery$data,
>*/);
