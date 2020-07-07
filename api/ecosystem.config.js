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
    cwd: "/www/dev.rullex.ru/current/api"
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
    cwd: "/www/rullex.ru/current/api"
  },
  ]
}
