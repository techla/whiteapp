const {GIT_BRANCH: branch} = process.env;
const isDevBranch = /^develop|(feature|bugfix)\/(BE|CC|SHOPPING)\.\d*\..*$/.test(branch);

module.exports = {
  branches: [
    "master",
    "release",
    {name: "develop", prerelease: 'beta'},
    {name: "feature/*", prerelease: 'beta'},
    {name: "bugfix/*", prerelease: 'beta'}],
  plugins: isDevBranch ? [
    ["semantic-release-heroku", {
      "name": branch === 'develop' ? 'techla-whiteapp' : `'techla-whiteapp'-${branch.match(/\d+/g)[0]}`
    }],
    "@semantic-release/changelog"
  ] : [
    ["semantic-release-docker", {
      "name": "techla/whiteapp"
    }]
   ],
};