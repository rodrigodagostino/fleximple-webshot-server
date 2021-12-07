# Fleximple Webshot Server
Fleximple Webshot is web application that allows you to generate a screen capture of a desired web page. It also gives you the possibility to customize the output image by defining its width, height, get the full page, format, quality and delay.

## Important
This is the server side of a two-part project, therefore it’s meant to work along side with [Fleximple Webshot Client](https://github.com/rodrigodagostino/fleximple-webshot-client), which is included as a **Git submodule**.

This application requires **SSL certificates** in order to not only run, but also allow the direct download of the generated image by clicking on it.

## Project setup
```
yarn install
```

### Initiate and update client submodule
```
git submodule update --init
```

### Update client submodule to latest state
```
git submodule update --remote client
```

### Build client side
```
cd client
yarn install
yarn build
```

### Locally preview and hot-reloads
```
yarn start
```

### Lints
```
yarn lint
```

### Lints and fixes files
```
yarn lint:fix
```

## Deployment

### Private Server
If you mean to deploy this app on your own server, it is recommended to use [PM2](https://pm2.keymetrics.io) to keep the application online 24/7.

#### Install PM2 as a global dependency
With Yarn:
```
yarn global add pm2
```
With NPM:
```
npm install pm2 -g
```

#### Run the app
```
cd /path/to/fleximple-webshot-server
pm2 start
```
Based on the `ecosystem.config.js`, PM2 will start the application without the need for additional parameters.

#### Automatically start on machine restart
```
pm2 startup
pm2 save
```

#### Remove automatic start on machine restart
If you no longer wish to run the app on startup, run the following:
```
pm2 unstartup
pm2 save
```

### DirectAdmin + Apache
In order to use your domain name as a proxy for the port number the app is running on, (while in the Admin Access Level) add the following code to `Server Manager > Custom HTTPD Configurations`:

```
|*if DOMAIN="domain.com"|
	ProxyRequests off
	SSLProxyEngine on

	ProxyPass / "https://www.domain.com:3080/"
	ProxyPassReverse / "https://www.domain.com:3080/"
	ProxyPreserveHost On
|*endif|
```
In case you’re trying to target a subdomain:
```
|*if SUB="subdomain"|
	ProxyRequests off
	SSLProxyEngine on

	ProxyPass / "https://www.domain.com:3080/"
	ProxyPassReverse / "https://www.domain.com:3080/"
	ProxyPreserveHost On
|*endif|
```
To dive deeper into this configuration, here’s a couple of links you should visit:

- [Running DA service through Apache on port 80](https://docs.directadmin.com/directadmin/general-usage/accessing-da-panel.html#running-da-service-through-apache-on-port-80)
- [Customizing Apache](https://docs.directadmin.com/webservices/apache/customizing.html)
