# vagrant-meteor-dev
Vagrant box for meteor development preconfigured with:
- ubuntu/precise64
- Nodejs
- MongoDB
- Git
- Meteor
- Meteorite

<h3>Setup</h3>

1. Download Vagrant from here https://www.vagrantup.com/downloads.html
2. Install Virtual Box from here https://www.virtualbox.org/wiki/Downloads, if you wish to use other vagrant providers you may do, please refer to vagrant docs.
3. cd to/your/dev/folder
4. Clone this repo to your local: git clone https://github.com/celloudiallo/vagrant-meteor-dev.git
5. Vagrant up - The first time you vagrant up, vagrant will download the precise64 base box from hashicorp servers and configure it using the shell script in the /vmsetup folder.
6. Vagrant ssh - end you are in your dev box all set.

<h4>MongoDB error</h4>

At this time we cannot just run 'meteor' to run our meteor app. If you do, you will face an error as the one below:
    .=> Started proxy.
    .Unexpected mongo exit code 45. Restarting.
    .Unexpected mongo exit code 45. Restarting.
    .Unexpected mongo exit code 45. Restarting.
    .Can't start Mongo server.
    .MongoDB cannot open or obtain a lock on a file

I believe this is due of the shared folder that vagrant setup between the host and guest.

Alternatively we use our local mongodb or any valid mongo url to start our app as follow:

MONGO_URL=mongodb://localhost:27017/myapp meteor run
