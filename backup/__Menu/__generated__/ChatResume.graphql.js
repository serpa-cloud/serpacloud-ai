/**
 * @generated SignedSource<<6dc60c7f1c8ea9c5ac2c04f55a8666a0>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ChatResume$fragmentType: FragmentType;
export type ChatResume$data = {|
  +id: string,
  +resume: ?string,
  +$fragmentType: ChatResume$fragmentType,
|};
export type ChatResume$key = {
  +$data?: ChatResume$data,
  +$fragmentSpreads: ChatResume$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatResume",
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
      "name": "resume",
      "storageKey": null
    }
  ],
  "type": "Chat",
  "abstractKey": null
};

(node/*: any*/).hash = "11f334ce59fe840654b979b99eedc06e";

module.exports = ((node/*: any*/)/*: Fragment<
  ChatResume$fragmentType,
  ChatResume$data,
>*/);
