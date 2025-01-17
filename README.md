# Uniform

Project to register and checkout uniforms. 

## SvelteKit 
Dev Mode 
```
npm run dev -- --open
```
Build 
```
npm run build 
```

## Production Setup
The setup scripts for digital ocean and ubuntu are under bootstrap.
- Run the ubuntu.sh commands to setup the environment 
  - creates new user
  - creates nginx proxy pass and config
  - downloads the uniform code base
- From the top level patch in the changes to the adaptor. This is [needed to run node](https://svelte.dev/docs/kit/adapter-node)
  - `npm i -D @sveltejs/adapter-node`
  - `patch -p1 < bootstrap/node-adaptor.patch`

## QR Codes
Make the directory for the static images. `mkdir -p /var/www/ngstatic/qrcodes`. Make sure it is owned by webuser and writable by webuser. 
Need to updates paths for QRCodes. In `QRCode.svelte` put the relative URL path. In `routes/add/+page.server.ts` put the full path to directory. 
```
lib/QRCode.svelte:            src="/ngxstatic/qrcodes/equipment-{type}-{number}-{redir}.png"
routes/add/+page.server.ts:            const imagePath = `/var/www/ngxstatic/qrcodes/equipment-yuni-${jerseyNumber}-home.png`
```

## Run
This is how you run with node adaptor. 
`nohup bash -c 'HOST=127.0.0.1 PORT=4000 node build ' &`

## System Requirements
Needs at least 1Gb of RAM for npm install of vite. 
