/**
 * @generated SignedSource<<1731210c9ad78447ef6a00df2edc229f>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { Avatar$fragmentType } from "./../../shared/__generated__/Avatar.graphql";
export type MenuQuery$variables = {||};
export type MenuQuery$data = {|
  +getCurrentNameSpace: ?{|
    +id: string,
    +key?: string,
    +media?: ?{|
      +$fragmentSpreads: Avatar$fragmentType,
    |},
    +username?: string,
  |},
|};
export type MenuQuery = {|
  response: MenuQuery$data,
  variables: MenuQuery$variables,
|};
*/

var node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 48
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 48
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "media",
  "plural": false,
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Avatar"
    }
  ],
  "storageKey": "media(height:48,width:48)"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "media",
  "plural": false,
  "selections": [
    (v0/*: any*/),
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
      "name": "alt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "width",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "height",
      "storageKey": null
    }
  ],
  "storageKey": "media(height:48,width:48)"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MenuQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "getCurrentNameSpace",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v1/*: any*/),
              (v3/*: any*/)
            ],
            "type": "User",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v3/*: any*/)
            ],
            "type": "Org",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MenuQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "getCurrentNameSpace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v0/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v1/*: any*/),
              (v5/*: any*/)
            ],
            "type": "User",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "type": "Org",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "772a926090bda6e83da3f12de2a2cc70",
    "id": null,
    "metadata": {},
    "name": "MenuQuery",
    "operationKind": "query",
    "text": "query MenuQuery {\n  getCurrentNameSpace {\n    __typename\n    id\n    ... on User {\n      id\n      username\n      media(width: 48, height: 48) {\n        ...Avatar\n        id\n      }\n    }\n    ... on Org {\n      id\n      key\n      media(width: 48, height: 48) {\n        ...Avatar\n        id\n      }\n    }\n  }\n}\n\nfragment Avatar on Image {\n  id\n  url\n  alt\n  width\n  height\n}\n"
  }
};
})();

(node/*: any*/).hash = "755df70e0dd7e22d1c1d1895ef526d5a";

module.exports = ((node/*: any*/)/*: Query<
  MenuQuery$variables,
  MenuQuery$data,
>*/);
