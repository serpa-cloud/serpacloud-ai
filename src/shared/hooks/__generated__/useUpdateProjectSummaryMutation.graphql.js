/**
 * @generated SignedSource<<b00d4c88d16aa5436175c102dc6b2a59>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Mutation } from 'relay-runtime';
import type { ProjectCard$fragmentType } from "./../../../ProjectCard/__generated__/ProjectCard.graphql";
export type useUpdateProjectSummaryMutation$variables = {|
  id: string,
  summary: string,
  summaryState: string,
  title: string,
|};
export type useUpdateProjectSummaryMutation$data = {|
  +updateProjectSummary: {|
    +id: string,
    +key: string,
    +name: ?string,
    +summary: string,
    +summaryState: string,
    +$fragmentSpreads: ProjectCard$fragmentType,
  |},
|};
export type useUpdateProjectSummaryMutation = {|
  response: useUpdateProjectSummaryMutation$data,
  variables: useUpdateProjectSummaryMutation$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "summary"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "summaryState"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "title"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "summary",
    "variableName": "summary"
  },
  {
    "kind": "Variable",
    "name": "summaryState",
    "variableName": "summaryState"
  },
  {
    "kind": "Variable",
    "name": "title",
    "variableName": "title"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summary",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summaryState",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateProjectSummaryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "AIProject",
        "kind": "LinkedField",
        "name": "updateProjectSummary",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProjectCard"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "useUpdateProjectSummaryMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "AIProject",
        "kind": "LinkedField",
        "name": "updateProjectSummary",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e858dfc5d31cac94bbe75e745b07eb5d",
    "id": null,
    "metadata": {},
    "name": "useUpdateProjectSummaryMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateProjectSummaryMutation(\n  $id: ID!\n  $title: String!\n  $summary: String!\n  $summaryState: String!\n) {\n  updateProjectSummary(id: $id, title: $title, summary: $summary, summaryState: $summaryState) {\n    id\n    key\n    name\n    summary\n    summaryState\n    ...ProjectCard\n  }\n}\n\nfragment ProjectCard on AIProject {\n  id\n  key\n  name\n  summary\n}\n"
  }
};
})();

(node/*: any*/).hash = "29e91fa038d6b2aea79d66d7798c5ade";

module.exports = ((node/*: any*/)/*: Mutation<
  useUpdateProjectSummaryMutation$variables,
  useUpdateProjectSummaryMutation$data,
>*/);
