/**
 * @generated SignedSource<<a810a1f5e3e10c18a5f41ae8c0e8a496>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type Avatar$fragmentType: FragmentType;
export type Avatar$data = {|
  +alt: ?string,
  +height: number,
  +id: string,
  +url: string,
  +width: number,
  +$fragmentType: Avatar$fragmentType,
|};
export type Avatar$key = {
  +$data?: Avatar$data,
  +$fragmentSpreads: Avatar$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Avatar",
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
  "type": "Image",
  "abstractKey": null
};

(node/*: any*/).hash = "c1ac0889d8c79f342de8611be0c8d5d9";

module.exports = ((node/*: any*/)/*: Fragment<
  Avatar$fragmentType,
  Avatar$data,
>*/);
