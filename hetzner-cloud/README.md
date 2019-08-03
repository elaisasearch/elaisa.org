# Hetzner Cloud

The production version is hosted on servers provided by [Hetzner](https://www.hetzner.de/) from Germany.

## Swarm Manager Coniguration

The `manager.cfg` file configures the installation of docker on the manager server which is created with: 
```bash
hcloud server create --name swarm-manager \
    --type cx21 \
    --location fsn1 \
    --image ubuntu-18.04 \
    --user-data-from-file ./manager.cfg \
    --ssh-key hetzner-cloud-key
```