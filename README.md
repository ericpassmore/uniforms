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

## QR Codes
Make the directory for the static images. `mkdir -p /var/www/ngstatic/qrcodes`. Make sure it is owned by webuser and writable by webuser. 
Need to updates paths for QRCodes. In `QRCode.svelte` put the relative URL path. In `routes/add/+page.server.ts` put the full path to directory. 
```
lib/QRCode.svelte:            src="/ngxstatic/qrcodes/equipment-{type}-{number}-{redir}.png"
routes/add/+page.server.ts:            const imagePath = `/var/www/ngxstatic/qrcodes/equipment-yuni-${jerseyNumber}-home.png`
```

## Host Setup
The setup scripts for digital ocean and ubuntu are under bootstrap.
