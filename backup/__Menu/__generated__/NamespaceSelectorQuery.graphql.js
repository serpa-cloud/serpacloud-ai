/**
 * @generated SignedSource<<65571cd235b2b818f31d2db2e9d44fa1>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { Avatar$fragmentType } from "./../../shared/__generated__/Avatar.graphql";
export type NamespaceSelectorQuery$variables = {||};
export type NamespaceSelectorQuery$data = {|
  +me: ?{|
    +id: string,
    +key: string,
    +media: ?{|
      +$fragmentSpreads: Avatar$fragmentType,
    |},
    +name: ?string,
    +organizations: $ReadOnlyArray<{|
      +id: string,
      +key: string,
      +media: ?{|
        +$fragmentSpreads: Avatar$fragmentType,
      |},
      +name: string,
    |}>,
  |},
|};
export type NamespaceSelectorQuery = {|
  response: NamespaceSelectorQuery$data,
  variables: NamespaceSelectorQuery$variables,
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
  "alias": "name",
  "args": null,
  "kind": "ScalarField",
  "name": "fullname",
  "storageKey": null
},
v2 = {
  "alias": "key",
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 80
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 80
  }
],
v4 = {
  "alias": null,
  "args": (v3/*: any*/),
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
  "storageKey": "media(height:80,width:80)"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": (v3/*: any*/),
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
  "storageKey": "media(height:80,width:80)"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NamespaceSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Org",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
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
    "name": "NamespaceSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Org",
            "kind": "LinkedField",
            "name": "organizations",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "af15fdef2228a2920bacaaf3eb72d8ff",
    "id": null,
    "metadata": {},
    "name": "NamespaceSelectorQuery",
    "operationKind": "query",
    "text": "query NamespaceSelectorQuery {\n  me {\n    id\n    name: fullname\n    key: username\n    media(width: 80, height: 80) {\n      ...Avatar\n      id\n    }\n    organizations {\n      id\n      key\n      name\n      media(width: 80, height: 80) {\n        ...Avatar\n        id\n      }\n    }\n  }\n}\n\nfragment Avatar on Image {\n  id\n  url\n  alt\n  width\n  height\n}\n"
  }
};
})();

(node/*: any*/).hash = "78a8bf0484c55438511a24139b2350aa";

module.exports = ((node/*: any*/)/*: Query<
  NamespaceSelectorQuery$variables,
  NamespaceSelectorQuery$data,
>*/);
