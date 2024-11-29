// @flow

// Libs
import React from 'react';
import { Navigate } from 'react-router-dom';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';

type Props = {
  children: any,
  publicRoute?: boolean,
  redirectTo: string,
  fallback?: React$Node,
};

export default function SessionController({
  children,
  redirectTo,
  fallback = null,
  publicRoute = false,
}: Props): React$Node {
  const userData = useLazyLoadQuery(
    graphql`
      query SessionControllerQuery {
        me {
          id
          username
          name
          lastname
          fullname
          email
          gender
          pronoun
          description
          uiTheme
          profileAvatar: media(width: 352, height: 352) {
            ...Avatar
          }
          composerAvatar: media(width: 80, height: 80) {
            ...Avatar
          }
          badgeAvatar: media(width: 64, height: 64) {
            ...Avatar
          }
        }
      }
    `,
    {},
    { fetchPolicy: 'store-and-network' },
  );

  const me = userData?.me || {};
  const isRegistered = !!me?.id;

  const mustRedirect = (publicRoute && isRegistered) || (!publicRoute && !isRegistered);

  if (mustRedirect) return <Navigate to={redirectTo} />;

  return <React.Suspense fallback={fallback || <div />}>{children}</React.Suspense>;
}
