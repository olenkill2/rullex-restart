module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit)

  const apps = {
    develop: {
      api: 'dev_api',
      site: 'dev_site',
    },
    production: {
      api: 'prod_api',
      site: 'prod_site',
    }
  }

  const app = apps[shipit.environment]

  shipit.initConfig({
    default: {
      deployTo: '/var/www/dev.rullex.ru/',
      shared: {
        dirs: ['node_modules'],
        overwrite: true
      },
      keepReleases: 2,
      repositoryUrl: 'https://github.com/olenkill2/rullex-restart',
    },
    develop: {
      deployTo: '/var/www/dev.rullex.ru/',
      servers: 'www-data@45.84.0.171',
      branch: 'develop'
    },
    production: {
      deployTo: '/var/www/rullex.ru/',
      servers: 'www-data@45.84.0.171',
      branch: 'master'
    }
  })

  shipit.on('updated', () => {
    shipit.start('npm:install')
  })

  // shipit.on('published', () => {
  //   // shipit.start('buildSite')
  // })

  shipit.on('cleaned', () => {
    shipit.start('pm2:restart')
  })

  shipit.blTask('npm:install', async () => {
    await shipit.remote(`cd ${shipit.releasePath}/api && npm ci --production`)
    // await shipit.remote(`cd ${shipit.releasePath}/api && npm ci --production && cd ../site && npm ci`)
    // await shipit.remote(`cd ${shipit.releasePath}/site && npm ci`)
  })

  shipit.blTask('buildSite', async () => {
    await shipit.remote(`cd ${shipit.releasePath}/site && npm run build`)
  })

  shipit.blTask('pm2:restart', async () => {
    await shipit.remote(`pm2 delete -s ${app.api} ${app.site} || :`);
    await shipit.remote(`cd ${shipit.releasePath}/api && pm2 startOrReload ecosystem.config.js --only ${app.api}
    && pm2 startOrReload ecosystem.config.js --only ${app.site} && pm2 save
    `);
    // await shipit.remote(`cd ${shipit.releasePath}/site && pm2 startOrReload ecosystem.config.js --only ${app.site}`);
    await shipit.remote(`pm2 save`);
  })
}
