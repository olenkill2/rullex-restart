/* eslint-disable */

module.exports = {
  apps: [
    {
      name: "dev_site",
      script: "npm",
      args: "run start-dev",
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
      instances: "1",
    },
    {
      name: "prod_site",
      script: "npm",
      args: "run start-prod",
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
      instances: "1",
    }
  ]
}
