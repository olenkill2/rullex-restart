/* eslint-disable */

module.exports = {
  apps: [
    {
      name: "dev_site",
      script: "npm",
      args: "run start-dev",
      env: {
        "NODE_ENV": "production",
        "BASE_URL": "https://dev.rullex.ru/",
        "PORT": 3001
      },
      instances: "1",
    },
    {
      name: "prod_site",
      script: "npm",
      args: "run start-prod",
      env: {
        "NODE_ENV": "production",
        "BASE_URL": "https://rullex.ru/",
        "PORT": 3000
      },
      instances: "1",
    }
  ]
}
