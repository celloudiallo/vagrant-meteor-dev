# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "hashicorp/precise64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:3000" will access port 3000 on the guest machine (VM).
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  config.vm.provider "virtualbox" do |vb|
    
    vb.customize ["modifyvm", :id, "--ioapic", "on"] # This is needed for multiple CPUs
    vb.customize ["modifyvm", :id, "--memory", "1024"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
  end

  #provsion the box using the our bootstrap shell script i
  config.vm.provision "shell" do |s|
    s.path = "vmsetup/bootstrap.sh"
    s.keep_color = true
  end

end
