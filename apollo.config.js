// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'shlyntools',
      // URL to the GraphQL API
      url: 'https://api.studio.thegraph.com/query/37941/xensubgraph/v0.0.1',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ]
  }
}