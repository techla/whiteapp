const {GIT_BRANCH: branch} = process.env;

module.exports = {
  branches: ["master", {name: 'develop', prerelease: true}],
  plugins: branch === 'develop' ? [
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
