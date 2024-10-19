/**
 * @generated SignedSource<<443867f54215db4c84a3cad9e25032ee>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import type { ChatResume$fragmentType } from "./../../Menu/__generated__/ChatResume.graphql";
import type { ProjectPreview$fragmentType } from "./../../Projects/__generated__/ProjectPreview.graphql";
import type { FragmentType } from "relay-runtime";
declare export opaque type ScrolledListElement$fragmentType: FragmentType;
type ScrolledListPaginationQuery$variables = any;
export type ScrolledListElement$data = {|
  +entities: ?{|
    +edges: ?$ReadOnlyArray<?{|
      +cursor: any,
      +id: string,
      +node: {|
        +__typename: "AIProject",
        +id: string,
        +$fragmentSpreads: ProjectPreview$fragmentType,
      |} | {|
        +__typename: "Chat",
        +id: string,
        +$fragmentSpreads: ChatResume$fragmentType,
      |} | {|
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        +__typename: "%other",
      |},
    |}>,
    +pageInfo: ?{|
      +endCursor: ?any,
      +finalCursor: ?any,
      +hasNextPage: ?boolean,
    |},
  |},
  +$fragmentType: ScrolledListElement$fragmentType,
|};
export type ScrolledListElement$key = {
  +$data?: ScrolledListElement$data,
  +$fragmentSpreads: ScrolledListElement$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = (function(){
var v0 = [
  "entities"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "filterMatrix"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "index"
    },
    {
      "kind": "RootArgument",
      "name": "query"
    },
    {
      "kind": "RootArgument",
      "name": "sort"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ScrolledListPaginationQuery.graphql')
    }
  },
  "name": "ScrolledListElement",
  "selections": [
    {
      "alias": "entities",
      "args": [
        {
          "kind": "Variable",
          "name": "filterMatrix",
          "variableName": "filterMatrix"
        },
        {
          "kind": "Variable",
          "name": "index",
          "variableName": "index"
        },
        {
          "kind": "Variable",
          "name": "query",
          "variableName": "query"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "EntitiesConnection",
      "kind": "LinkedField",
      "name": "__ScrolledList_root_entities_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "finalCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Edge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
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
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ChatResume"
                    }
                  ],
                  "type": "Chat",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v1/*: any*/),
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ProjectPreview"
                    }
                  ],
                  "type": "AIProject",
                  "abstractKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node/*: any*/).hash = "647882b12e0d67329c1dfa2f0d981165";

module.exports = ((node/*: any*/)/*: RefetchableFragment<
  ScrolledListElement$fragmentType,
  ScrolledListElement$data,
  ScrolledListPaginationQuery$variables,
>*/);
