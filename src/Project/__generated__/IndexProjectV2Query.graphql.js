/**
 * @generated SignedSource<<759c74b7979826ae74c6d77343676b6a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { ProjectCard$fragmentType } from "./../../ProjectCard/__generated__/ProjectCard.graphql";
export type IndexProjectV2Query$variables = {|
  id: string,
|};
export type IndexProjectV2Query$data = {|
  +node: ?{|
    +id: string,
    +key?: string,
    +name?: ?string,
    +summary?: string,
    +summaryState?: string,
    +$fragmentSpreads: ProjectCard$fragmentType,
  |},
  +projectsTemplates: ?$ReadOnlyArray<{|
    +id: string,
    +userDescription: string,
  |}>,
|};
export type IndexProjectV2Query = {|
  response: IndexProjectV2Query$data,
  variables: IndexProjectV2Query$variables,
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summary",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summaryState",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "AIProjectTemplate",
  "kind": "LinkedField",
  "name": "projectsTemplates",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userDescription",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexProjectV2Query",
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
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProjectCard"
              }
            ],
            "type": "AIProject",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      (v7/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IndexProjectV2Query",
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
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "type": "AIProject",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      (v7/*: any*/)
    ]
  },
  "params": {
    "cacheID": "8af6a91b34fd55294c37b054d7198a4f",
    "id": null,
    "metadata": {},
    "name": "IndexProjectV2Query",
    "operationKind": "query",
    "text": "query IndexProjectV2Query(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    id\n    ... on AIProject {\n      id\n      key\n      name\n      summary\n      summaryState\n      ...ProjectCard\n    }\n  }\n  projectsTemplates {\n    id\n    userDescription\n  }\n}\n\nfragment ProjectCard on AIProject {\n  id\n  key\n  name\n  summary\n}\n"
  }
};
})();

(node/*: any*/).hash = "a0c698441f95ed345fc2b0082a83dbf7";

module.exports = ((node/*: any*/)/*: Query<
  IndexProjectV2Query$variables,
  IndexProjectV2Query$data,
>*/);
