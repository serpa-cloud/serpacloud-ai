/**
 * @generated SignedSource<<a1f1df40f71d3892b115797dd101d4fa>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest, Query } from 'relay-runtime';
import type { Avatar$fragmentType } from "./../shared/__generated__/Avatar.graphql";
export type Gender = "FEMALE" | "MALE" | "NONBINARY" | "OTHER" | "QUEER" | "TRANSGENDERFEMALE" | "TRANSGENDERMALE" | "%future added value";
export type Pronoun = "HE" | "OTHER" | "SHE" | "THEY" | "%future added value";
export type UITheme = "DARK" | "LIGHT" | "%future added value";
export type SessionControllerQuery$variables = {||};
export type SessionControllerQuery$data = {|
  +me: ?{|
    +badgeAvatar: ?{|
      +$fragmentSpreads: Avatar$fragmentType,
    |},
    +composerAvatar: ?{|
      +$fragmentSpreads: Avatar$fragmentType,
    |},
    +description: string,
    +email: string,
    +fullname: ?string,
    +gender: ?Gender,
    +id: string,
    +lastname: ?string,
    +name: ?string,
    +profileAvatar: ?{|
      +$fragmentSpreads: Avatar$fragmentType,
    |},
    +pronoun: ?Pronoun,
    +uiTheme: ?UITheme,
    +username: string,
  |},
|};
export type SessionControllerQuery = {|
  response: SessionControllerQuery$data,
  variables: SessionControllerQuery$variables,
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastname",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullname",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "gender",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pronoun",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "uiTheme",
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 352
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 352
  }
],
v11 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "Avatar"
  }
],
v12 = [
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
v13 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 64
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 64
  }
],
v14 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SessionControllerQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": "profileAvatar",
            "args": (v10/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v11/*: any*/),
            "storageKey": "media(height:352,width:352)"
          },
          {
            "alias": "composerAvatar",
            "args": (v12/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v11/*: any*/),
            "storageKey": "media(height:80,width:80)"
          },
          {
            "alias": "badgeAvatar",
            "args": (v13/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v11/*: any*/),
            "storageKey": "media(height:64,width:64)"
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
    "name": "SessionControllerQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": "profileAvatar",
            "args": (v10/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v14/*: any*/),
            "storageKey": "media(height:352,width:352)"
          },
          {
            "alias": "composerAvatar",
            "args": (v12/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v14/*: any*/),
            "storageKey": "media(height:80,width:80)"
          },
          {
            "alias": "badgeAvatar",
            "args": (v13/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v14/*: any*/),
            "storageKey": "media(height:64,width:64)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d1fd0374eb3408214507bdd674d305c6",
    "id": null,
    "metadata": {},
    "name": "SessionControllerQuery",
    "operationKind": "query",
    "text": "query SessionControllerQuery {\n  me {\n    id\n    username\n    name\n    lastname\n    fullname\n    email\n    gender\n    pronoun\n    description\n    uiTheme\n    profileAvatar: media(width: 352, height: 352) {\n      ...Avatar\n      id\n    }\n    composerAvatar: media(width: 80, height: 80) {\n      ...Avatar\n      id\n    }\n    badgeAvatar: media(width: 64, height: 64) {\n      ...Avatar\n      id\n    }\n  }\n}\n\nfragment Avatar on Image {\n  id\n  url\n  alt\n  width\n  height\n}\n"
  }
};
})();

(node/*: any*/).hash = "38be69d7fa1c8a312cdd1b2b0abca89b";

module.exports = ((node/*: any*/)/*: Query<
  SessionControllerQuery$variables,
  SessionControllerQuery$data,
>*/);
