/* eslint-disable */

module.exports = {
  apps: [{
    name: "dev_api",
    script: "index.js",
    env: {
      "NODE_ENV": "production",
    },
    env_master: {
      "NODE_ENV": "production",
    },
    env_develop: {
      "NODE_ENV": "production",
      "ENV": "develop"
    },
    watch: true,
    instances: "1",
  },{
    name: "prod_api",
    script: "index.js",
    env: {
      "NODE_ENV": "production",
    },
    env_master: {
      "NODE_ENV": "production",
    },
    env_develop: {
      "NODE_ENV": "production",
      "ENV": "develop"
    },
    watch: true,
    instances: "1",
  },
  ]
}
