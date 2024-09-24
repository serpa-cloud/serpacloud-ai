/* eslint-disable no-nested-ternary */
// @flow
import { useEffect } from 'react';
import stylex from '@serpa-cloud/stylex';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

import { Text, Icon, Margin, Flexbox } from '../shared';

type Props = {|
  +name: string,
  +onChange: (boolean) => void,
|};

const styles = stylex.create({
  container: {
    height: 'auto',
  },
});

export default function NamespaceValidation({ name, onChange }: Props): React$Node {
  const finalName = name
    .toLowerCase() // Convierte a minúsculas
    .replace(/\s+/g, '-') // Reemplaza espacios por guiones
    .replace(/[^a-z0-9-]/g, '') // Quita caracteres que no son letras, números o guiones
    .replace(/^[^a-z]+/, '') // Quita caracteres no permitidos al inicio, hasta encontrar una letra
    .replace(/-+$/, '') // Quita guiones al final
    .substring(0, 63);

  const availabilityData = useLazyLoadQuery(
    graphql`
      query NamespaceValidationQuery($name: String!) {
        namespaceAvailability(name: $name)
      }
    `,
    {
      name: finalName,
    },
    {
      fetchPolicy: 'network-only',
    },
  );

  const isAvailable = availabilityData.namespaceAvailability;

  useEffect(() => {
    onChange(isAvailable);
  }, [isAvailable, onChange]);

  return (
    <Margin top={4}>
      <Flexbox columnGap={8} className={stylex(styles.container)} alignItems="center">
        <Icon
          size={20}
          weight={300}
          icon={isAvailable ? 'done' : 'close'}
          color={isAvailable ? '--green-300' : '--red-300'}
        />
        <Text
          type="bs"
          color="--neutral-color-600"
          id={
            // eslint-disable-next-line no-nested-ternary
            isAvailable
              ? finalName === name
                ? 'sign.availableUsername'
                : 'sign.availableUsername.adjusted'
              : !finalName
              ? 'sign.emptyUsername'
              : finalName === name
              ? 'sign.usernameNotAvailable'
              : 'sign.usernameNotAvailable.adjusted'
          }
          values={{
            strong: () => (
              <strong style={{ color: isAvailable ? 'var(--green-300)' : 'var(--red-300)' }}>
                {finalName}
              </strong>
            ),
          }}
        />
      </Flexbox>
    </Margin>
  );
}
