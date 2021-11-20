module.exports = {
  apps: [{
    name: 'webshot',
    script: './index.js',
    max_memory_restart: '200M',
    autorestart: true,
  }],
}
