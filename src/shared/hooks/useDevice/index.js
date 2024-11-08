import { useContext } from 'react';
import { ResizerContext } from './ResizerProvider';

export default function useDevice() {
  const device = useContext(ResizerContext);

  return device;
}
