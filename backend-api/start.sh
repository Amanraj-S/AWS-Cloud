#!/bin/bash

sudo yum update -y

# install node
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs -y

# install git
sudo yum install git -y

# clone project
git clone https://github.com/YOUR_GITHUB_USERNAME/aws-backend-demo.git

cd aws-backend-demo/backend-api

npm install

node server.js