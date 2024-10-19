/**
 * @generated SignedSource<<be12d85a487949cf74a7afc68d84efa1>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type GitProvider = "GITHUB" | "GITLAB" | "%future added value";
export type GithubReposQuery$variables = {|
  provider: GitProvider,
|};
export type GithubReposQuery$data = {|
  +gitRepos: ?$ReadOnlyArray<{|
    +id: string,
    +name: string,
    +ownerAvatar: ?string,
    +url: string,
  |}>,
|};
export type GithubReposQuery = {|
  response: GithubReposQuery$data,
  variables: GithubReposQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "provider"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "provider",
        "variableName": "provider"
      }
    ],
    "concreteType": "GitRepo",
    "kind": "LinkedField",
    "name": "gitRepos",
    "plural": true,
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "url",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ownerAvatar",
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
    "name": "GithubReposQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GithubReposQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f8e86018f3c1ffc3e4d657b740f9d50b",
    "id": null,
    "metadata": {},
    "name": "GithubReposQuery",
    "operationKind": "query",
    "text": "query GithubReposQuery(\n  $provider: GitProvider!\n) {\n  gitRepos(provider: $provider) {\n    id\n    name\n    url\n    ownerAvatar\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "7b3aa9a53e9f66366fc653085d976154";

module.exports = ((node/*: any*/)/*: Query<
  GithubReposQuery$variables,
  GithubReposQuery$data,
>*/);
