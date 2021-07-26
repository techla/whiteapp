const { GIT_BRANCH: branch } = process.env;
const isDevelopmentBranch = /^develop|(feature|bugfix)\/(BE|CC|SHOPPING)\.\d*\..*$/.test(branch);
const herokuPlugins = [
  [
    '@semantic-release/exec',
    {
      prepareCmd:
        branch === 'develop'
          ? 'yarn heroku:create techla-whiteapp > /dev/null 2>&1 || true'
          : `yarn heroku:create techla-whiteapp-${
              branch.match(/\d+/g)[0]
            } > /dev/null 2>&1 || true`,
    },
  ],
  '@semantic-release/commit-analyzer',
  [
    'semantic-release-heroku',
    {
      name: branch === 'develop' ? 'techla-whiteapp' : `techla-whiteapp-${branch.match(/\d+/g)[0]}`,
    },
  ],
];
const dockerPlugins = [
  ['@semantic-release/exec', { prepareCmd: 'yarn docker:build ' }],
  '@semantic-release/commit-analyzer',
  ['semantic-release-docker', { name: 'techla/whiteapp' }],
];

module.exports = {
  branches: [
    'master',
    'release',
    { name: 'develop', prerelease: 'rc' },
    { name: 'feature/*', prerelease: 'alpha' },
    { name: 'bugfix/*', prerelease: 'beta' },
  ],
  plugins: isDevelopmentBranch ? herokuPlugins : dockerPlugins,
};
