/**
 * @generated SignedSource<<27e861f67eafc922c0c8f0777b6fbe34>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
export type DashboardQuery$variables = {||};
export type DashboardQuery$data = {|
  +me: ?{|
    +fullname: ?string,
    +id: string,
    +lastname: ?string,
    +name: ?string,
    +username: string,
  |},
|};
export type DashboardQuery = {|
  response: DashboardQuery$data,
  variables: DashboardQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
        "name": "username",
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
        "name": "lastname",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fullname",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DashboardQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "51482365d08f2d7745ebe50551d1c0ca",
    "id": null,
    "metadata": {},
    "name": "DashboardQuery",
    "operationKind": "query",
    "text": "query DashboardQuery {\n  me {\n    id\n    username\n    name\n    lastname\n    fullname\n  }\n}\n"
  }
};
})();

(node/*: any*/).hash = "3f179fc8f24b8e566c8ca82d35562acb";

module.exports = ((node/*: any*/)/*: Query<
  DashboardQuery$variables,
  DashboardQuery$data,
>*/);
