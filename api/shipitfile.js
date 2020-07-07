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
  console.log(app)

  shipit.initConfig({
    default: {
      deployTo: '/var/www/dev.rullex.ru/',
      // shared: {
      //   dirs: ['node_modules'],
      //   overwrite: true
      // },
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
    // shipit.log(shipit)
    shipit.start('npm:install')
  })
  //
  // shipit.on('published', () => {
  //   shipit.start('buildSite')
  // })
  //
  // shipit.on('cleaned', () => {
  //   shipit.start('pm2:restart')
  // })
  //
  shipit.blTask('npm:install', async () => {
    await shipit.remote(`cd ${shipit.releasePath}/api && npm install --production`)
    // await shipit.remote(`cd ${shipit.releasePath}/site && npm install`)
  })
  // //
  // shipit.blTask('pm2:restart', async () => {
  //   await shipit.remote(`pm2 delete -s ${appName} || :`);
  //   try {
  //     await shipit.remote(`pm2 restart dev_api dev_site`)
  //     shipit.log(shipit)
  //   } catch (error) {
  //     shipit.log('No previous process to restart. Continuing.')
  //   }
  // })
  //
  // shipit.blTask('buildSite', async () => {
  //   await shipit.remote(`cd ${shipit.releasePath}/site && npm run build`)
  // })

  // shipit.task('copyConfig', async () => {
  //   await shipit.copyToRemote(
  //     './config',
  //     '/var/apps/super-project/config.json',
  //   )
  // })
}
