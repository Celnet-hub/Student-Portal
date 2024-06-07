#!/bin/bash

cd /home/ubuntu

# Install NodeJS
echo "Installing NodeJS"
touch .bashrc
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install v16

# Clone website code
echo "Cloning website"
git clone https://github.com/Celnet-hub/Student-Portal.git
git checkout cicd-project
cd Student-Portal/
# Install dependencies
#echo "Installing dependencies"
#npm install

# Forward port 80 traffic to port 3000
#echo "Forwarding 80 -> 3000"
#iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000

# Install & use pm2 to run Node app in background
#npm install pm2@latest -g
#pm2 start --name studentportalfrontend npm -- start


# Update package index
sudo apt update -y

# Install prerequisite packages
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add the Docker repository to APT sources
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index again
sudo apt update -y

# Install Docker engine
sudo apt install docker-ce docker-ce-cli containerd.io -y

# Verify installation
sudo docker run hello-world

sudo docker compose up -d --build

sudo chmod 666 /var/run/docker.sock

sudo docker exec -it student-portal-pybackend-1 python manage.py makemigrations students

sudo docker exec -it student-portal-pybackend-1 python manage.py migrate