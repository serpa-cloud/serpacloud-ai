// @flow

import useImageload from './hooks/useImageLoad';
import './FileInput.css';

import Text from './Text';
import Icon from './Icon';
import Spinner from './Spinner';

type Props = {|
  accept?: string,
  label: string,
  onChange: ({| id: string | Promise<string>, previewUrl?: ?string |}) => void,
|};

export default function FileInput({ accept, label, onChange }: Props): React$Node {
  const [, isPending, , previewUrl, handleOnChange] = useImageload(
    '',
    (imageId) => {
      onChange({ id: imageId, previewUrl: null });
    },
    {
      upload: true,
    },
  );

  return (
    <div className="Input__wrapper">
      <div className="Input__fake_image_container">
        <div className="Input__fake_image_content">
          {previewUrl && (
            <div className="Input__Preview_image_content">
              <img
                src={previewUrl}
                alt="Preview"
                className="Input__fake_image"
                style={{ opacity: isPending ? 0.6 : 1 }}
              />
              {isPending && (
                <div className="Input__spinner">
                  <Spinner />
                </div>
              )}
            </div>
          )}
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
          disabled={isPending}
        />
      </div>
    </div>
  );
}

FileInput.defaultProps = {
  accept: '',
};
