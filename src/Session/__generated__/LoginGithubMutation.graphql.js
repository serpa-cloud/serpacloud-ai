/**
 * @generated SignedSource<<2d68b824fcc49c812057b6c2dc51c5c0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginGithubMutation$variables = {|
  code: string,
|};
export type LoginGithubMutation$data = {|
  +githubOauth: ?string,
|};
export type LoginGithubMutation = {|
  response: LoginGithubMutation$data,
  variables: LoginGithubMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "code"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "code",
        "variableName": "code"
      }
    ],
    "kind": "ScalarField",
    "name": "githubOauth",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginGithubMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginGithubMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "88950e4238b764f30f1daedb55dae546",
    "id": null,
    "metadata": {},
    "name": "LoginGithubMutation",
    "operationKind": "mutation",
    "text": "mutation LoginGithubMutation(\n  $code: String!\n) {\n  githubOauth(code: $code)\n}\n"
  }
};
})();

(node/*: any*/).hash = "b5602bd13d0d6e07c8a759963d56600f";

module.exports = ((node/*: any*/)/*: Mutation<
  LoginGithubMutation$variables,
  LoginGithubMutation$data,
>*/);
