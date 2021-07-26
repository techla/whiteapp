const { GIT_BRANCH: branch } = process.env;
const isDevelopmentBranch = /^develop|(feature|bugfix)\/(BE|CC|SHOPPING)\.\d*\..*$/.test(branch);

module.exports = {
  branches: [
    'master',
    'release',
    { name: 'develop', prerelease: 'rc' },
    { name: 'feature/*', prerelease: 'alpha' },
    { name: 'bugfix/*', prerelease: 'beta' },
  ],
  plugins: isDevelopmentBranch
    ? [
        [
          '@semantic-release/exec',
          {
            prepareCmd:
              branch === 'develop'
                ? 'yarn heroku:create techla-whiteapp'
                : `yarn heroku:create techla-whiteapp-${branch.match(/\d+/g)[0]}`,
          },
        ],
        [
          'semantic-release-heroku',
          {
            name:
              branch === 'develop'
                ? 'techla-whiteapp'
                : `techla-whiteapp-${branch.match(/\d+/g)[0]}`,
          },
        ],
      ]
    : [
        [
          'semantic-release-docker',
          {
            name: 'techla/whiteapp',
          },
        ],
        '@semantic-release/changelog',
      ],
};
