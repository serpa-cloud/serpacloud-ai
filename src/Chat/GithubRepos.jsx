// @flow
import stylex from '@serpa-cloud/stylex';
import { useMemo, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';

import { Icon, Text, Flexbox, Margin, FastSearchInput, InteractiveElement } from '../shared';

const styles = stylex.create({
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  repo: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    ':hover': {
      background: 'var(--neutral-color-200)',
    },
  },
});

export default function GithubRepos(): React$Node {
  const [searchValue, setSearchValue] = useState<string>('');

  const data = useLazyLoadQuery(
    graphql`
      query GithubReposQuery($provider: GitProvider!) {
        gitRepos(provider: $provider) {
          id
          name
          url
          ownerAvatar
        }
      }
    `,
    {
      provider: 'GITHUB',
    },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  const finalRepos = useMemo(() => {
    return (
      data?.gitRepos
        ?.filter((repo) => {
          if (searchValue) {
            if (
              !repo.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .includes(
                  searchValue
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, ''),
                )
            )
              return false;

            return true;
          }
          return true;
        })
        ?.slice(0, 5) ?? []
    );
  }, [data, searchValue]);

  return (
    <div>
      <FastSearchInput onChange={setSearchValue} placeholder="Search your repos" />

      <Margin top={16}>
        <Flexbox flexDirection="column" rowGap={4}>
          {finalRepos?.map((repo) => {
            return (
              <InteractiveElement className={stylex(styles.repo)}>
                <Flexbox alignItems="center" justifyContent="space-between">
                  <Flexbox alignItems="center" columnGap={8}>
                    <img className={stylex(styles.avatar)} src={repo.ownerAvatar} alt={repo.name} />
                    <Text type="s1m">{repo.name}</Text>
                  </Flexbox>

                  <Icon icon="radio_button_unchecked" color="--neutral-color-400" />
                </Flexbox>
              </InteractiveElement>
            );
          })}
        </Flexbox>
      </Margin>
    </div>
  );
}
