/**
 * @generated SignedSource<<d5e4a4915b582a6095d2a4c4541442ee>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { FragmentType } from "relay-runtime";
declare export opaque type ProjectPreview$fragmentType: FragmentType;
export type ProjectPreview$data = {|
  +description: string,
  +id: string,
  +name: string,
  +$fragmentType: ProjectPreview$fragmentType,
|};
export type ProjectPreview$key = {
  +$data?: ProjectPreview$data,
  +$fragmentSpreads: ProjectPreview$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProjectPreview",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "AIProject",
  "abstractKey": null
};

(node/*: any*/).hash = "0f7b172ecef6bc046f1a97568a658399";

module.exports = ((node/*: any*/)/*: Fragment<
  ProjectPreview$fragmentType,
  ProjectPreview$data,
>*/);
