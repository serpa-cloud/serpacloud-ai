// @flow
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import stylex from '@serpa-cloud/stylex';
import { useCallback, useEffect } from 'react';
import { useMutation, graphql } from 'react-relay';
import * as amplitude from '@amplitude/analytics-browser';

import {
  Card,
  Text,
  Input,
  Button,
  Margin,
  Padding,
  Flexbox,
  useInput,
  validateData,
  InteractiveElement,
  Spinner,
} from '../shared';

import Loader from '../Chat/Loader';

import { ReactComponent as GithubLogo } from './github-logo.svg';

import type { SignupMutation } from './__generated__/SignupMutation.graphql';
import type { SignupGithubMutation } from './__generated__/SignupGithubMutation.graphql';

const styles = stylex.create({
  content: {
    height: '100%',
  },
  container: {
    height: '100vh',
    overflow: 'auto',
    boxSizing: 'border-box',
  },
  logo: {
    width: 64,
    height: 48,
    '@media (max-width: 960px)': {
      width: 64,
      height: 48,
    },
  },
  card: {
    width: 480,
    maxWidth: 'calc(100vw - 16px)',
  },
  fullWidth: {
    width: '100%',
    boxSizing: 'border-box',
  },

  signButton: {
    borderRadius: 4,
    height: 40,
  },
  googleButton: {
    border: '1px solid var(--neutral-color-300)',
  },
  githubButton: {
    backgroundColor: '#000000',
  },
});

export default function Signup(): React$Node {
  const intl = useIntl();

  const handleGithubLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=3c99fab1cc5756199981&scope=user,user:email,repo,read:org&redirect_uri=${encodeURIComponent(
        `${window.location.origin}${window.location.pathname}?method=github`,
      )}`,
    );
  };

  const [connectToGithub, pendingConnectionToGithub] = useMutation<SignupGithubMutation>(graphql`
    mutation SignupGithubMutation($code: String!) {
      githubOauth(code: $code)
    }
  `);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const method = params.get('method');

    if (code) {
      if (method === 'github')
        connectToGithub({
          variables: { code },
          onCompleted(response) {
            if (response.githubOauth) {
              window.location.href = '/app';
            }
          },
          onError(error) {
            // eslint-disable-next-line no-console
            console.trace(error);
          },
        });
    }
  }, [connectToGithub]);

  const email = useInput({
    name: 'email',
    required: true,
    // eslint-disable-next-line no-useless-escape
    regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/,
    validateEvent: 'blur',
    label: intl.formatMessage({ id: 'sign.email' }),
    value: '',
    errors: {
      requiredError: intl.formatMessage({ id: 'input.requiredError' }),
      regexpError: intl.formatMessage({ id: 'input.useValidEmail' }),
      defaultError: 'Please insert a valid email',
    },
  });

  const password = useInput({
    name: 'password',
    type: 'password',
    required: true,
    label: intl.formatMessage({ id: 'sign.password' }),
    value: '',
    errors: {
      requiredError: intl.formatMessage({ id: 'input.requiredError' }),
    },
  });

  const [createAccount, commitPending] = useMutation<SignupMutation>(graphql`
    mutation SignupMutation($input: SignupInput!) {
      signup(input: $input)
    }
  `);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { errors, data } = validateData<{
        email: string,
        password: string,
      }>([email, password]);

      if (!errors) {
        createAccount({
          variables: {
            input: {
              ...data,
            },
          },
          onCompleted(response) {
            if (response.signup) {
              amplitude.track('Sign Up');
              window.dataLayer = window.dataLayer || [];

              window.dataLayer.push({
                event: 'signupEvent',
                eventCallback: () => {
                  window.location.href = '/app';
                },
              });
            } else {
              alert('sign.signupError');
            }
          },
          onError() {
            alert('sign.signupError');
          },
        });
      } else {
        alert('sign.singupDefaultError');
      }
    },
    [email, password, createAccount],
  );

  return (
    <Padding top={40} bottom={24} className={stylex(styles.container)}>
      <Flexbox
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        className={stylex(styles.content)}
      >
        <Loader size={80} />
        <Margin top={16} bottom={24}>
          <Text type="h5" component="h1" id="signup.title" color="--neutral-color-800" />
        </Margin>
        <Card className={stylex(styles.card)}>
          {pendingConnectionToGithub ? (
            <Padding vertical={80}>
              <Flexbox alignItems="center" justifyContent="center">
                <Spinner size={40} />
              </Flexbox>
            </Padding>
          ) : (
            <>
              <Padding horizontal={16} top={16} bottom={16}>
                <form onSubmit={handleSubmit} autoComplete="nope">
                  <input type="submit" style={{ display: 'none' }} />
                  <Flexbox flexDirection="column">
                    <Flexbox flexDirection="column" rowGap={16}>
                      <Flexbox columnGap={8} flexDirectionM="column" rowGapM={16}>
                        <div className={stylex(styles.fullWidth)}>
                          <Input input={email.input} />
                        </div>

                        <div className={stylex(styles.fullWidth)}>
                          <Input input={password.input} />
                        </div>
                      </Flexbox>
                    </Flexbox>

                    <Margin top={40} className={stylex(styles.fullWidth)}>
                      <div className={stylex(styles.fullWidth)}>
                        <Button
                          loading={commitPending}
                          intlId="signup.button"
                          onClick={handleSubmit}
                        />
                      </div>
                    </Margin>
                  </Flexbox>
                </form>

                {false && (
                  <Margin top={16}>
                    <InteractiveElement onClick={handleGithubLogin}>
                      <Flexbox
                        justifyContent="center"
                        alignItems="center"
                        className={stylex(styles.signButton, styles.githubButton)}
                        columnGap={8}
                      >
                        <GithubLogo width={24} />
                        <Text color="--neutral-color-100" type="s0b" id="sign.githubSignup" />
                      </Flexbox>
                    </InteractiveElement>
                  </Margin>
                )}
              </Padding>
            </>
          )}
        </Card>

        <Margin top={16}>
          <Card className={stylex(styles.card)}>
            <Padding vertical={24} horizontal={16}>
              <Text
                type="s1r"
                id="sign.haveAccount"
                textAlign="center"
                values={{
                  link: (str) => (
                    <Link to="/session/signin" type="s0r">
                      {str}
                    </Link>
                  ),
                }}
              />
            </Padding>
          </Card>
        </Margin>
      </Flexbox>
    </Padding>
  );
}
