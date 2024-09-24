/**
 * @generated SignedSource<<5d032698289541a028be409d474281a8>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignupGithubMutation$variables = {|
  code: string,
|};
export type SignupGithubMutation$data = {|
  +githubOauth: ?string,
|};
export type SignupGithubMutation = {|
  response: SignupGithubMutation$data,
  variables: SignupGithubMutation$variables,
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
    "name": "SignupGithubMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupGithubMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cbd8efa3ea77a46b32b672f0833cadc2",
    "id": null,
    "metadata": {},
    "name": "SignupGithubMutation",
    "operationKind": "mutation",
    "text": "mutation SignupGithubMutation(\n  $code: String!\n) {\n  githubOauth(code: $code)\n}\n"
  }
};
})();

(node/*: any*/).hash = "8709735a7d5f8e81a6bce8f9a030792f";

module.exports = ((node/*: any*/)/*: Mutation<
  SignupGithubMutation$variables,
  SignupGithubMutation$data,
>*/);
