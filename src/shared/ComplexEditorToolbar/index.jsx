/* eslint-disable react/no-array-index-key */
// @flow

import Flexbox from '../Flexbox';

import Button from '../MiniButton';

type ToolbarItem = {|
  +icon: string,
  +text: string,
  +type?: ?string,
  +pending?: ?boolean,
  +onClick: () => void | Promise<void>,
|};

type Props = {|
  +items: Array<ToolbarItem>,
|};

export default function ComplexEditorToolbar({ items }: Props): React$Node {
  return (
    <Flexbox alignItems="center" columnGap={12}>
      {items.map((item, i) => (
        <Button
          key={i}
          icon={item.icon}
          text={item.text}
          type={item.type}
          onClick={item.onClick}
          pending={item.pending}
        />
      ))}
    </Flexbox>
  );
}
