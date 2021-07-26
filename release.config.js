const {GIT_BRANCH: branch} = process.env;
const isDevBranch = /^develop|(feature|bugfix)\/(BE|CC|SHOPPING)\.\d*\..*$/.test(branch);
const developAppName = 'techla-whiteapp'
const featureAppName = `${developAppName}-${branch.match(/\d+/g)[0]}`

module.exports = {
  branches: [
    "master",
    "release",
    {name: "develop", prerelease: true},
    {name: "feature", prerelease: true},
    {name: "bugfix", prerelease: true}],
  plugins: isDevBranch ? [
    ["semantic-release-heroku", {
      "name": branch === 'develop' ? developAppName : featureAppName
    }],
    "@semantic-release/changelog"
  ] : [
    ["semantic-release-docker", {
      "name": "techla/whiteapp"
    }]
   ],
};
