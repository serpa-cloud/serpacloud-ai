/**
 * @generated SignedSource<<fa9fcc07093b8fe047b32518086683dc>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
export type AIRole = "assistant" | "user" | "%future added value";
import type { FragmentType } from "relay-runtime";
declare export opaque type ChatMessage$fragmentType: FragmentType;
export type ChatMessage$data = {|
  +content: string,
  +createdAt: any,
  +id: string,
  +role: AIRole,
  +$fragmentType: ChatMessage$fragmentType,
|};
export type ChatMessage$key = {
  +$data?: ChatMessage$data,
  +$fragmentSpreads: ChatMessage$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatMessage",
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
      "name": "role",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    }
  ],
  "type": "AIMessage",
  "abstractKey": null
};

(node/*: any*/).hash = "db1c9de8a69a6e015d4c30687beafa70";

module.exports = ((node/*: any*/)/*: Fragment<
  ChatMessage$fragmentType,
  ChatMessage$data,
>*/);
