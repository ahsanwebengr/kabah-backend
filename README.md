# BMG-Talent-BE

# this project like a job portal related

# bmg-talents

# Steps for AWS EC2 Development

# Step 1:

# Create a new AWS account with the specified AWS account name and password

# Step 2:

# Create a new EC2 instance and select ubuntu the operating System for Application

# Step 3:

# Create key pair for EC2 instance."You can use a key pair to securely connect to your instance. Ensure that you have access to the selected key pair before you launch the instance" .Put the name of the key pair and select the "RSA". Then the key pair file will be downloaded.Then select the created key pair.

-

# Step 4:

# Network settings

# allow the HTTP and HTTPS. The process of creating instances is completed. You can see your new instance

# instance tab

# Step 5:

# -> After creating a new instance set The inbound role for instance.

# -> Select The instance

# -> Then go to the security and you seen the Security groups in security group you seen a link like this "sg-0e98c385313c1895d (launch-wizard-1)" click on link .In this page you seen the "edit inbound rule" button

# -> Then select the anywhere for only HTTP and HTTPS. click on save rule and go to EC2 Tab

# step 6:

# -> Now set the key pair that you downloaded earlier

# -> Select the instance and click on connect Button

# -> Then go to SSH Client Tab

# -> Copy the ssh key

# -> go to your local directory where you download the key pair

# -> and open the terminal and hit the commend that you copy from SSH Client tab

# -> Then it ask some confirmation Enter yes

# -> Note

# -> If your are Ubuntu user Fist allow you key pair file to read permissions

# -> Change the permissions of the key file to make it readable only by you:

# -> hit this commend "chmod 400 kaba_travel.pem"

# -> Now you are successfully login to server

# step 7:

# -> update the operating System and download the Thins

# -> Make new folder

# -> sudo apt update

# -> Install the nodejs from this comment curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# -> Then hit this commend sudo apt-get install -y nodejs

# -> Now check the node -v

# -> install nginx sudo apt install nginx

# -> Go to var/www/html

# -> if the directory not found "sudo -s cd /var/www/html" run this command

# -> Then clone the repository and npm i

# -> install pm2 using this commend "sudo npm install pm2 -g"

# -> Upload the .env file

# -> using sudo nano .env

# -> PM2 Setting

# -> PM2 pm2 start

# -> pm2 start index.js

# -> pm2

# step 8:

# -> nginx config

# -> hit this commend cd /etc/nginx and do ls and seen all the files and go to "sites-available" then create the file according to your project folder name

# -> open the file using sudo nano and set this config into file #. backend api.project.com

server {
listen 80;
server_name api.domain.com ;

    location / {
        proxy_pass http://localhost:9000;
        # Add other proxy-related settings if needed
    }

}

# -> then hit this command "sudo nginx -t" to test the configuration

# -> then restart the nginx server to get the new configuration "sudo systemctl restart nginx " using this command

# -> then Enable the site by creating a symbolic link: using this commend sudo ln -s /etc/nginx/sites-available/project.com /etc/nginx/sites-enabled/

# -> youtub https://www.youtube.com/watch?v=Emn1rZXdWI4
