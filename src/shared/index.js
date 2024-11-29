// @flow

// Components
import Avatar from './Avatar';
import Button from './Button';
import Card from './Card';
import Cascader from './Cascader';
import Checkbox from './Checkbox';
import ComplexEditor from './ComplexEditor';
import ComplexEditorToolbar from './ComplexEditorToolbar';
import ContextualMenu from './ContextualMenu';
import Divider from './Divider';
import DocumentEditor from './DocumentEditor';
import FastSearchInput from './FastSearchInput';
import Flexbox from './Flexbox';
import Grid from './Grid';
import Icon from './Icon';
import Input, { useInput, validateData } from './Input';
import InteractiveElement from './InteractiveElement';
import Margin from './Margin';
import Padding from './Padding';
import ScrolledList from './ScrolledList';
import Search from './Search';
import Spinner from './Spinner';
import TapIcon from './TapIcon';
import Text from './Text';
import MiniButton from './MiniButton';
import Modal from './Modal'; // Importamos el nuevo componente Modal

// Provider
import SocketProvider, {
  useApplySuggestion,
  useGenerateSuggestions,
  useApplyTemplate,
  useProjectInRealTime,
} from './hooks/SocketContext';

// Hooks
import useCreateAIProject from './hooks/useCreateAIProject';
import useDevice from './hooks/useDevice';
import useUpdateProjectSummary from './hooks/useUpdateProjectSummary';

// Utils

// Types

export {
  // Components
  // eslint-disable-next-line import/prefer-default-export
  Avatar,
  Button,
  Card,
  Cascader,
  Checkbox,
  ComplexEditor,
  ComplexEditorToolbar,
  ContextualMenu,
  Divider,
  DocumentEditor,
  FastSearchInput,
  Flexbox,
  Grid,
  Icon,
  Input,
  InteractiveElement,
  Margin,
  Padding,
  ScrolledList,
  Search,
  Spinner,
  TapIcon,
  Text,
  MiniButton,
  Modal, // Exportamos el nuevo componente Modal
  // Provider
  SocketProvider,
  useApplySuggestion,
  useGenerateSuggestions,
  useApplyTemplate,
  useProjectInRealTime,
  // Hooks
  useCreateAIProject,
  useDevice,
  useInput,
  useUpdateProjectSummary,
  // Utils
  validateData,
};
