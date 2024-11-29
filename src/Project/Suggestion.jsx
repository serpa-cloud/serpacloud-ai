// @flow
import { useCallback } from 'react';
import markdownToLexical from './markdownToLexical';
import { Text, Flexbox, Margin, ComplexEditorToolbar, useApplySuggestion } from '../shared';

import styles from './Suggestion.module.sass';

type Props = {|
  +projectId: string,
  +suggestion: string,
  +onChangeSummary: (any) => void,
  +getSummary: () => Promise<void | null | string>,
|};

function splitAtFirstQuestionMark(input) {
  const index = input.indexOf('?');
  if (index === -1) {
    return [input]; // Si no hay un '?', regresa la cadena completa en un array
  }
  return [input.slice(0, index + 1), input.slice(index + 1).trim()];
}

export default function Suggestion({
  projectId,
  suggestion,
  getSummary,
  onChangeSummary,
}: Props): React$Node {
  const [applySuggestion, suggestionPending] = useApplySuggestion(projectId);
  const [mainSuggestion, secondaryText] = splitAtFirstQuestionMark(suggestion);

  const handleApply = useCallback(async () => {
    try {
      const summary = await getSummary();
      if (summary && suggestion)
        applySuggestion({
          suggestion,
          summary,
          onCompleted(newSummary) {
            console.log(newSummary);
            const newSummaryState = markdownToLexical(newSummary);
            console.log(newSummaryState);

            onChangeSummary(newSummaryState);
          },
        });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [applySuggestion, getSummary, onChangeSummary, suggestion]);

  return (
    <div className={styles.container}>
      <Flexbox flexDirection="column" rowGap={12}>
        <Text type="bs" color="--neutral-color-800">
          <strong>{mainSuggestion}</strong>
        </Text>

        {!!secondaryText && (
          <Text type="bs" color="--neutral-color-600">
            {secondaryText}
          </Text>
        )}
      </Flexbox>
      <Margin top={20}>
        <ComplexEditorToolbar
          items={[
            {
              icon: 'done',
              text: 'Apply',
              onClick: handleApply,
              pending: suggestionPending,
            },
            {
              icon: 'Close',
              text: 'Reject',
              type: 'CANCEL',
              onClick: () => {},
            },
          ]}
        />
      </Margin>
    </div>
  );
}
