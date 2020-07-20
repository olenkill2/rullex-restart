/* eslint-disable */

module.exports = {
  apps: [
    {
      name: "dev_api",
      script: "index.js",
      env: {
        "NODE_ENV": "production",
        "NODE_CONFIG_ENV": "stage",
        "BASE_URL": "https://dev.rullex.ru/"
      },
      instances: "1",
    },
    {
      name: "prod_api",
      script: "index.js",
      env: {
        "NODE_ENV": "production",
        "NODE_CONFIG_ENV": "production",
        "BASE_URL": "https://rullex.ru/"
      },
      instances: "1",
    }
  ]
}
