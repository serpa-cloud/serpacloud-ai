// @flow

import { useState } from 'react';

import './FileInput.css';

import Text from './Text';
import Icon from './Icon';

type Props = {|
  accept?: string,
  label: string,
  onChange: (files: FileList | null) => void,
|};

export default function FileInput({ accept, label, onChange }: Props): React$Node {
  const [previewUrl, setPreviewUrl] = useState(null);

  function handleOnChange(e) {
    onChange(e.target.files);

    setPreviewUrl(null);

    const target: HTMLInputElement = e.currentTarget;
    const file: File = target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
    }
  }
  return (
    <div className="Input__wrapper">
      <div className="Input__fake_image_container">
        <div className="Input__fake_image_content">
          {previewUrl && <img src={previewUrl} alt="Preview" className="Input__fake_image" />}
          {!previewUrl && (
            <>
              <Icon icon="image" size={40} />
              <label htmlFor="fileInput">
                <Text type="s0b">{label}</Text>
              </label>
            </>
          )}
        </div>
        <input
          id="fileInput"
          type="file"
          accept={accept}
          className="Input__input"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

FileInput.defaultProps = {
  accept: '',
};
