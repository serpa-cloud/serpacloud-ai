/**
 * @generated SignedSource<<dbbfddd369959c6e0bbd9cf995fc470b>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginInput = {|
  email: string,
  password: string,
|};
export type LoginMutation$variables = {|
  input: LoginInput,
|};
export type LoginMutation$data = {|
  +login: ?string,
|};
export type LoginMutation = {|
  response: LoginMutation$data,
  variables: LoginMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "kind": "ScalarField",
    "name": "login",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6624af325be1d7206dfd9117c2473d32",
    "id": null,
    "metadata": {},
    "name": "LoginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginMutation(\n  $input: LoginInput!\n) {\n  login(input: $input)\n}\n"
  }
};
})();

(node/*: any*/).hash = "73dfe6556cdbadf70ab50e8790304ba3";

module.exports = ((node/*: any*/)/*: Mutation<
  LoginMutation$variables,
  LoginMutation$data,
>*/);
