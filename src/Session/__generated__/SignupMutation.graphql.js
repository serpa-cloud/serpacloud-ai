/**
 * @generated SignedSource<<492f8b3b48ba949d5f62997deaa69b51>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignupInput = {|
  email: string,
  password: string,
  username: string,
|};
export type SignupMutation$variables = {|
  input: SignupInput,
|};
export type SignupMutation$data = {|
  +signup: ?string,
|};
export type SignupMutation = {|
  response: SignupMutation$data,
  variables: SignupMutation$variables,
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
    "name": "signup",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignupMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "37e56bb9a0abbb08f2d4607f25a5a4a7",
    "id": null,
    "metadata": {},
    "name": "SignupMutation",
    "operationKind": "mutation",
    "text": "mutation SignupMutation(\n  $input: SignupInput!\n) {\n  signup(input: $input)\n}\n"
  }
};
})();

(node/*: any*/).hash = "e09007596941cdbe9d28a40b8c93f1da";

module.exports = ((node/*: any*/)/*: Mutation<
  SignupMutation$variables,
  SignupMutation$data,
>*/);
