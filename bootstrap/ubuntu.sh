#!/bin/env bash 

# Run as root to launch template #

## packages 
apt-get update >> /dev/null
apt-get install -y git unzip jq curl nginx make cmake
# certbot weridness 
apt remove certbot
snap install core && snap refresh core

# setup certbot 
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot

## domain
domain=bellevuegirlslax

## new user ##
USER="webuser"
PUBLIC_KEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKPaMfTsQcIphBamjqCPRkojuywjIqrT1oNu0ebH5pST admin@bellevuegirlslax.com - macmini4"

## does the user already exist ##
if getent passwd "${USER}" > /dev/null 2>&1; then
    echo "yes the user exists"
    exit 0
else
    echo "Creating user ${USER}"
fi

KEY_SIZE=$(echo "${PUBLIC_KEY}" | cut -d' ' -f2 | wc -c)
if [ "$KEY_SIZE" -lt 33 ]; then
    echo "Invalid public key"
    exit 1
fi

## gecos non-interactive ##
adduser "${USER}" --disabled-password --gecos ""
sudo -u "${USER}" -- sh -c "mkdir /home/webuser/.ssh && chmod 700 /home/webuser/.ssh && touch /home/webuser/.ssh/authorized_keys && chmod 600 /home/webuser/.ssh/authorized_keys"
echo "$PUBLIC_KEY" | sudo -u "${USER}" tee -a /home/webuser/.ssh/authorized_keys

## Firewall 
ufw allow OpenSSH
ufw allow http
ufw allow 'Nginx HTTPS'
ufw deny out 25
ufw enable 

## Basic Web Content 
mkdir -p /var/www/${domain}/html
chown -R $USER:$USER /var/www/${domain}/html
chmod 755 /var/www/${domain}/
sudo -u ${USER} cat > /var/www/${domain}/html/hello.html << EOF
<!DOCTYPE html>
<html>
    <head>
        <title>${domain} Welcome Page</title>
    </head>
    <body>
        <h2>Hello ${domain}</h2>
        <p>Hello to you!</p>
    </body>
</html>
EOF

## NGINX Web Confix 
cat > /etc/nginx/sites-available/${domain} << EOF
server {
        listen 80;
        listen [::]:80;

        root /var/www/${domain}/html;
        index index.html index.htm index.nginx-debian.html;

        server_name uni.${domain}.com;
        listen 443 ssl;
        
        ssl_certificate /etc/letsencrypt/live/uni.${domain}.com/fullchain.pem; 
        ssl_certificate_key /etc/letsencrypt/live/uni.${domain}.com/privkey.pem; 
        
        # special routes for static content 
        # everything else static content 
        location = /hello.html  {
            try_files $uri $uri/ =404;
        }
        location ~ ^/ngxstatic/.+  {
            try_files $uri $uri/ =404;
        }
        # matches these directors with possible subdirs underneath and handles trailing slash 
        location ~ ^/(?:_app|__data|favicon\.png|global\.css|list_alt|regen|restock|login|logout|oauth|api|users|activity|about|add)(?:/|$) {
             proxy_buffering off;
             proxy_pass http://127.0.0.1:4000;
             proxy_set_header Host \$host;
             proxy_set_header X-Forwarded-For \$remote_addr;
         }
         # matches root 
         location = / {
             proxy_buffering off;
             proxy_pass http://127.0.0.1:4000;
             proxy_set_header Host \$host;
             proxy_set_header X-Forwarded-For \$remote_addr;
         }
         # Return 404 for everything else
         location / {
             return 404;
         }
}
EOF

# establish config & restart
ln -s /etc/nginx/sites-available/${domain} /etc/nginx/sites-enabled/
systemctl stop nginx

# create certs for SSL 
certbot certonly --standalone -d uni.${domain}.com

systemctl start nginx

## Manual Steps Install Node & NPM
## as webuser
sudo -u webuser -c bash 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash'
sudo -u webuser -c bash 'nvm install node'
sudo -u webuser -c bash 'git clone https://github.com/ericpassmore/uniforms'

## update image location for files
# routes add
# const imagePath = `/var/www/bellevuegirlslax/html/ngxstatic/qrcodes/equipment-yuni-${jerseyNumber}-home.png`
## usual pre-steps
npm install
npm run build
## run node process
cd uniforms
nohup bash -c 'HOST=127.0.0.1 PORT=4000 node build ' &
