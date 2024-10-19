// @flow
import stylex from '@serpa-cloud/stylex';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { $getRoot, KEY_ENTER_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
  Icon,
  Text,
  Input,
  Button,
  Margin,
  Flexbox,
  Divider,
  useInput,
  InteractiveElement,
  Padding,
  Spinner,
} from '../shared';

import { CascaderOption } from '../shared/Cascader';

const styles = stylex.create({
  editable: {
    userSelect: 'text',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: '100px',
    overflowX: 'hidden',
    overflowY: 'auto',
    overflowWrap: 'break-word',
    outline: 'none',
    paddingTop: 2,
    paddingBottom: 2,
    fontFamily: 'var(--font-family-default)',
    color: 'var(--neutral-color-800)',
    fontSize: 14,
    minHeight: 17,
  },
  expanded: {
    maxHeight: 'none',
    minHeight: 120,
  },
  dialog: {
    borderRadius: 8,
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-1)',
    outline: 'none',
    minWidth: 480,
    boxSizing: 'border-box',
    padding: 0,
  },
  settingElement: {
    padding: 16,
  },
  input: {
    flex: 1,
  },
  repoFallback: {
    width: '100%',
    height: 32,
    borderRadius: 4,
    backgroundColor: 'var(--neutral-color-200)',
  },
  currentDirectory: {
    backgroundColor: 'var(--neutral-color-800)',
    borderRadius: 4,
  },
  modeType: {
    borderRadius: 4,
    backgroundColor: 'var(--neutral-color-200)',
  },
});

type Props = {|
  +standalone: boolean,
  +disable?: ?boolean,
  +creatingProjectPending?: ?boolean,
  +onSubmitMessage: (message: string) => Promise<void> | void,
  +onSubmitProject?: ?({
    description: string,
    stackPreferences: string,
    mode?: ?('CREATE' | 'IMPROVE'),
    directoryPath?: ?string,
  }) => void | Promise<void>,
|};

export default function Content({
  standalone,
  onSubmitMessage,
  onSubmitProject,
  disable,
  creatingProjectPending,
}: Props): React$Node {
  const [localDirectory, setLocalDirectory] = useState({ directory: null, directoryName: null });
  const [selectedSetting, setSelectedSetting] = useState(null);

  const frontend = useInput({
    name: 'frontend',
    label: 'Frontend',
    value: 'auto',
    autoCloseSelect: true,
    hideSearch: true,
  });

  const uiSystem = useInput({
    name: 'uiSystem',
    label: 'UI System',
    value: 'auto',
    autoCloseSelect: true,
    hideSearch: true,
  });

  const css = useInput({
    name: 'css',
    label: 'CSS',
    value: 'auto',
    autoCloseSelect: true,
    hideSearch: true,
  });

  const backend = useInput({
    name: 'backend',
    label: 'Backend',
    value: 'auto',
    autoCloseSelect: true,
    hideSearch: true,
  });

  const db = useInput({
    name: 'db',
    label: 'Database',
    value: 'auto',
    autoCloseSelect: true,
    hideSearch: true,
  });

  const dialogRef = useRef<?HTMLDialogElement>();
  // State to store the editor content
  const [editorText, setEditorText] = useState('');

  // Lexical hook to get the editor context
  const [editor] = useLexicalComposerContext();

  // Use an effect to subscribe to changes in the editor
  useEffect(() => {
    const unsubscribe = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const textContent = root.getTextContent(); // Get the plain text from the editor
        setEditorText(textContent); // Update the state with the editor's content
      });
    });

    return () => {
      unsubscribe(); // Clean up the listener when the component is unmounted
    };
  }, [editor]);

  const handleOnSend = useCallback(() => {
    editor.getEditorState().read(() => {
      const text = $getRoot().getTextContent();

      if (!standalone) {
        onSubmitMessage(text.trim());

        editor.update(() => {
          $getRoot().clear();
        });
      } else if (onSubmitProject) {
        const stackPreferences = `Preferencias para el tech stack:

1. Frontend: ${frontend.input.value}.
2. UI System: ${uiSystem.input.value}.
3. CSS: ${css.input.value}.
4. Backend: ${backend.input.value}.
5. Database: ${db.input.value}.`;

        onSubmitProject({
          description: text.trim(),
          stackPreferences: localDirectory.directory ? '' : stackPreferences,
          mode: localDirectory.directory ? 'IMPROVE' : 'CREATE',
          directoryPath: localDirectory.directory,
        });
      }
    });
  }, [
    editor,
    standalone,
    db.input.value,
    css.input.value,
    onSubmitMessage,
    onSubmitProject,
    backend.input.value,
    frontend.input.value,
    localDirectory.directory,
    uiSystem.input.value,
  ]);

  useEffect(() => {
    editor.focus();
    editor.setEditable(!disable);
  }, [editor, disable]);

  useEffect(() => {
    const removeEnterListener = editor.registerCommand(
      KEY_ENTER_COMMAND,
      (event) => {
        if (event?.shiftKey || event?.ctrlKey || event?.metaKey) {
          return false;
        }
        event?.preventDefault();
        handleOnSend();
        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );

    return () => removeEnterListener();
  }, [editor, handleOnSend]);

  const hasContent = !!editorText;
  const showSettings = hasContent && !!standalone;

  const handleImportProject = async () => {
    const result = await window.codegen.selectDirectory();
    if (result) setLocalDirectory(result);

    dialogRef?.current?.close();
  };

  return (
    <div>
      <ContentEditable className={stylex(styles.editable, showSettings ? styles.expanded : null)} />
      {showSettings && (
        <>
          <Flexbox alignItems="center" justifyContent="space-between">
            <InteractiveElement
              disabled={!!disable}
              onClick={() => dialogRef?.current?.showModal()}
            >
              <Flexbox alignItems="center" columnGap={8}>
                <Icon icon="settings" size={16} color="--primary-color-1" />
                <Flexbox flexDirection="column">
                  <Text type="s0r" color="--neutral-color-600">
                    Advanced Settings
                  </Text>
                </Flexbox>
              </Flexbox>
            </InteractiveElement>

            <Flexbox alignItems="center" columnGap={16}>
              <InteractiveElement
                disabled={!!disable}
                onClick={() => {
                  dialogRef?.current?.showModal();
                  setSelectedSetting('IMPORT');
                }}
              >
                <div className={stylex(styles.modeType)}>
                  <Padding vertical={8} horizontal={8}>
                    <Text type="s0r" color="--neutral-color-800">
                      {localDirectory.directoryName
                        ? `Improve project ${localDirectory.directoryName}`
                        : 'New project'}
                    </Text>
                  </Padding>
                </div>
              </InteractiveElement>
              {creatingProjectPending ? <Spinner size={16} /> : null}
            </Flexbox>
          </Flexbox>
        </>
      )}
      {/* $FlowIssue */}
      <dialog ref={dialogRef} className={stylex(styles.dialog)}>
        {selectedSetting !== 'IMPORT' && (
          <>
            <InteractiveElement
              className={stylex(styles.settingElement)}
              onClick={() => setSelectedSetting((x) => (x ? null : 'PREFERENCES'))}
            >
              <Flexbox alignItems="center" justifyContent="space-between">
                <Flexbox alignItems="center" columnGap={8}>
                  <Icon size={20} icon="settings" color="--neutral-color-800" />
                  <Text type="s0b" color="--neutral-color-800">
                    Preferences for new project
                  </Text>
                </Flexbox>

                <Icon
                  icon={selectedSetting === 'PREFERENCES' ? 'keyboard_arrow_up' : 'chevron_right'}
                />
              </Flexbox>
            </InteractiveElement>

            <Divider />
          </>
        )}

        {selectedSetting !== 'PREFERENCES' && (
          <>
            <InteractiveElement
              className={stylex(styles.settingElement)}
              onClick={() => setSelectedSetting((x) => (x ? null : 'IMPORT'))}
            >
              <Flexbox alignItems="center" justifyContent="space-between">
                <Flexbox alignItems="center" columnGap={8}>
                  <Icon size={20} icon="folder" color="--neutral-color-800" />
                  <Text type="s0b" color="--neutral-color-800">
                    Import folder to project
                  </Text>
                </Flexbox>

                <Icon icon={selectedSetting === 'IMPORT' ? 'keyboard_arrow_up' : 'chevron_right'} />
              </Flexbox>
            </InteractiveElement>

            {selectedSetting ? <Divider /> : null}
          </>
        )}

        {selectedSetting === 'PREFERENCES' && (
          <div className={stylex(styles.settingElement)}>
            <Margin bottom={16}>
              <Text type="s0r" color="--neutral-color-600">
                Select your favorite tech stack (only for new projects)
              </Text>
            </Margin>

            <Flexbox flexDirection="column" rowGap={16}>
              <Flexbox columnGap={8}>
                <div className={stylex(styles.input)}>
                  <Input input={frontend.input}>
                    <CascaderOption
                      value="auto"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Automatic
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="React + Next.js"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          React + Next.js
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="React + Vite"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          React + Vite
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="Angular"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Angular
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="HTML + JS Vanilla"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          HTML + JS Vanilla
                        </Text>
                      }
                    />
                  </Input>
                </div>
                <div className={stylex(styles.input)}>
                  <Input input={uiSystem.input}>
                    <CascaderOption
                      value="auto"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Automatic
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="shadcn/ui"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          shadcn/ui
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="MUI Core"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          MUI Core
                        </Text>
                      }
                    />
                  </Input>
                </div>
              </Flexbox>

              <Flexbox columnGap={8}>
                <div className={stylex(styles.input)}>
                  <Input input={css.input}>
                    <CascaderOption
                      value="auto"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Automatic
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="Tailwind"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Tailwind
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="Sass / Less"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Sass / Less
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="CSS Vanilla"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          CSS Vanilla
                        </Text>
                      }
                    />
                  </Input>
                </div>

                <div className={stylex(styles.input)}>
                  <Input input={backend.input}>
                    <CascaderOption
                      value="auto"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Automatic
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="NodeJS"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          NodeJS
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="Python"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Python
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="Java Spring"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Java Spring
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="PHP"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          PHP
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="Go"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Go
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="Rust"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Rust
                        </Text>
                      }
                    />
                  </Input>
                </div>
              </Flexbox>

              <Flexbox columnGap={8}>
                <div className={stylex(styles.input)}>
                  <Input input={db.input}>
                    <CascaderOption
                      value="auto"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          Automatic
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="PostgreSQL"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          PostgreSQL
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="MongoDB"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          MongoDB
                        </Text>
                      }
                    />
                    <CascaderOption
                      value="No Relational"
                      label={
                        <Text type="s0r" color="--neutral-color-800">
                          No Relational
                        </Text>
                      }
                    />
                  </Input>
                </div>
                <div className={stylex(styles.input)} />
              </Flexbox>
            </Flexbox>

            <Margin top={40}>
              <Button onClick={() => dialogRef?.current?.close()}>Save preferences</Button>
            </Margin>
          </div>
        )}
        {selectedSetting === 'IMPORT' && (
          <div className={stylex(styles.settingElement)}>
            <Margin bottom={16}>
              <Text type="s0r" color="--neutral-color-600">
                Import a directory from your computer to the project
              </Text>
            </Margin>

            {localDirectory.directory && (
              <Margin bottom={16}>
                <Padding vertical={12} horizontal={12} className={stylex(styles.currentDirectory)}>
                  <Flexbox alignItems="center" justifyContent="space-between">
                    <Text type="s0m" color="--neutral-color-100">
                      {localDirectory.directory}
                    </Text>

                    <InteractiveElement
                      onClick={() => setLocalDirectory({ directory: null, directoryName: null })}
                    >
                      <Icon fill icon="delete" size={20} color="--red-300" />
                    </InteractiveElement>
                  </Flexbox>
                </Padding>
              </Margin>
            )}

            <Margin top={24}>
              <Button onClick={handleImportProject} buttonType="secondary">
                {localDirectory.directory ? 'Change directory' : 'Select a directory'}
              </Button>
            </Margin>
          </div>
        )}
      </dialog>
    </div>
  );
}

Content.defaultProps = {
  disable: false,
  creatingProjectPending: false,
  onSubmitProject: null,
};
