/**
 * @generated SignedSource<<1fd5ac20639a989d49d530c6fdb5abc0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { Avatar$fragmentType } from "./../../shared/__generated__/Avatar.graphql";
export type HeaderQuery$variables = {||};
export type HeaderQuery$data = {|
  +me: ?{|
    +id: string,
    +media: ?{|
      +id: string,
      +$fragmentSpreads: Avatar$fragmentType,
    |},
  |},
|};
export type HeaderQuery = {|
  response: HeaderQuery$data,
  variables: HeaderQuery$variables,
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
v1 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HeaderQuery",
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
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Avatar"
              }
            ],
            "storageKey": "media(height:80,width:80)"
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
    "name": "HeaderQuery",
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
          {
            "alias": null,
            "args": (v1/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d7e97eb1faf31d4e0159e8113d71b3e4",
    "id": null,
    "metadata": {},
    "name": "HeaderQuery",
    "operationKind": "query",
    "text": "query HeaderQuery {\n  me {\n    id\n    media(width: 80, height: 80) {\n      id\n      ...Avatar\n    }\n  }\n}\n\nfragment Avatar on Image {\n  id\n  url\n  alt\n  width\n  height\n}\n"
  }
};
})();

(node/*: any*/).hash = "5cedcea9cdd0a1e9c3b9dd8e9191577c";

module.exports = ((node/*: any*/)/*: Query<
  HeaderQuery$variables,
  HeaderQuery$data,
>*/);
