/**
 * @generated SignedSource<<024869f98dc5156e99ec6a7b6bf2317d>>
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
    +hasBasicProfile: boolean,
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
  +paymentProfile: ?{|
    +id: string,
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
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasBasicProfile",
  "storageKey": null
},
v11 = [
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
v12 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "Avatar"
  }
],
v13 = [
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
v14 = [
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
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "PaymentProfile",
  "kind": "LinkedField",
  "name": "paymentProfile",
  "plural": false,
  "selections": [
    (v0/*: any*/)
  ],
  "storageKey": null
},
v16 = [
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
          (v10/*: any*/),
          {
            "alias": "profileAvatar",
            "args": (v11/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v12/*: any*/),
            "storageKey": "media(height:352,width:352)"
          },
          {
            "alias": "composerAvatar",
            "args": (v13/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v12/*: any*/),
            "storageKey": "media(height:80,width:80)"
          },
          {
            "alias": "badgeAvatar",
            "args": (v14/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v12/*: any*/),
            "storageKey": "media(height:64,width:64)"
          }
        ],
        "storageKey": null
      },
      (v15/*: any*/)
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
          (v10/*: any*/),
          {
            "alias": "profileAvatar",
            "args": (v11/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v16/*: any*/),
            "storageKey": "media(height:352,width:352)"
          },
          {
            "alias": "composerAvatar",
            "args": (v13/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v16/*: any*/),
            "storageKey": "media(height:80,width:80)"
          },
          {
            "alias": "badgeAvatar",
            "args": (v14/*: any*/),
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "media",
            "plural": false,
            "selections": (v16/*: any*/),
            "storageKey": "media(height:64,width:64)"
          }
        ],
        "storageKey": null
      },
      (v15/*: any*/)
    ]
  },
  "params": {
    "cacheID": "e620d0291a4dbdc9acd9a67f3609eb27",
    "id": null,
    "metadata": {},
    "name": "SessionControllerQuery",
    "operationKind": "query",
    "text": "query SessionControllerQuery {\n  me {\n    id\n    username\n    name\n    lastname\n    fullname\n    email\n    gender\n    pronoun\n    description\n    uiTheme\n    hasBasicProfile\n    profileAvatar: media(width: 352, height: 352) {\n      ...Avatar\n      id\n    }\n    composerAvatar: media(width: 80, height: 80) {\n      ...Avatar\n      id\n    }\n    badgeAvatar: media(width: 64, height: 64) {\n      ...Avatar\n      id\n    }\n  }\n  paymentProfile {\n    id\n  }\n}\n\nfragment Avatar on Image {\n  id\n  url\n  alt\n  width\n  height\n}\n"
  }
};
})();

(node/*: any*/).hash = "a3b2899b145173d12612fd2e7a382e4f";

module.exports = ((node/*: any*/)/*: Query<
  SessionControllerQuery$variables,
  SessionControllerQuery$data,
>*/);
