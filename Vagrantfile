Vagrant.configure("2") do |config|
  config.hostmanager.enabled = true 
  config.hostmanager.manage_host = true
  config.vbguest.auto_update = false

### Frontend ###
  config.vm.define "docker02" do |docker02|
    docker02.vm.box = "ubuntu/focal64"
    docker02.vm.hostname = "docker02"
    docker02.vm.network "private_network", ip: "192.168.56.5"
    docker02.vm.synced_folder ".", "/vagrant"
    docker02.vm.provider "virtualbox" do |vb|
      vb.memory = "4000"
      vb.name = "docker02"
    # docker02.vm.provision "shell", path: ".\\vagrant_folder\\docker.sh"
    end
    docker02.vm.provision "shell", path: ".\\init.sh"
  end
end