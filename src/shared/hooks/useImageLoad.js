// @flow
import { useState } from 'react';

type ImageLocation = string | ArrayBuffer | null;

function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0');
}

function generateId(len) {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

export default function useImageload(
  alt?: ?string,
  callback?: (id: string, location: string, disposeImage: () => void) => void,
  options?: ?{ upload: boolean } = { upload: true },
): [
  string | null,
  boolean,
  ImageLocation,
  ImageLocation,
  (e: SyntheticEvent<HTMLInputElement>) => void,
  () => void,
  (File | Blob) => void,
] {
  const [isPending, setIsPending] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [url, setUrl] = useState(null);
  const [id, setId] = useState(null);

  function disposeImage() {
    setPreviewUrl(null);
    setUrl(null);
    setId(null);
  }

  function onUpload(file) {
    const formData = new FormData();

    formData.append('image', file);
    formData.append('alt', alt ?? '');

    const traceId = generateId(16);
    setIsPending(true);

    fetch(`${process.env.REACT_APP_MEDIA_HOST ?? ''}/media/upload`, {
      mode: 'cors',
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'x-request-id': traceId,
        'x-b3-traceid': traceId,
        'x-traceid': traceId,
        'x-b3-spanid': traceId,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsPending(false);
        const { _id, origin } = res?.data;
        if (_id) {
          setUrl(() => origin);
          setId(() => _id);
          if (callback) callback(_id, origin, disposeImage);
        }
      })
      .catch((err) => {
        setIsPending(false);
        // eslint-disable-next-line no-console
        console.trace({ err });
      });
  }

  function onChange(event: SyntheticEvent<HTMLInputElement>) {
    setUrl(null);
    setId(null);
    setPreviewUrl(null);
    // eslint-disable-next-line prefer-destructuring
    const target: HTMLInputElement = event.currentTarget;
    const file: File = target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };

      if (options?.upload) {
        onUpload(file);
      }
    }
  }

  return [id, isPending, url, previewUrl, onChange, disposeImage, onUpload];
}
