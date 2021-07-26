const {GIT_BRANCH: branch} = process.env;

module.exports = {
  branches: ["master", "release", {name: "develop", prerelease: true}],
  plugins: /^develop|(feature|bugfix)\/(BE|CC|SHOPPING)\.\d*\..*$/.test(branch) ? [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["semantic-release-heroku", {
      "name": "techla-whiteapp",
    }]
  ] : [
    ["semantic-release-docker", {
      "name": "techla/whiteapp"
    }]
   ],
};
