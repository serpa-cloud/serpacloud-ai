/**
 * @generated SignedSource<<402c1a18f821b5a24193a35919f339ef>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ProjectCard$fragmentType: FragmentType;
export type ProjectCard$data = {|
  +id: string,
  +key: string,
  +name: ?string,
  +summary: string,
  +$fragmentType: ProjectCard$fragmentType,
|};
export type ProjectCard$key = {
  +$data?: ProjectCard$data,
  +$fragmentSpreads: ProjectCard$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProjectCard",
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
      "name": "key",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "summary",
      "storageKey": null
    }
  ],
  "type": "AIProject",
  "abstractKey": null
};

(node/*: any*/).hash = "0afb480ce7680ab961948a940de1c1d2";

module.exports = ((node/*: any*/)/*: Fragment<
  ProjectCard$fragmentType,
  ProjectCard$data,
>*/);
