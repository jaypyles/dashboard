# Server Manager

Custom built server manager/dashboard. Easily configure hosts and commands using `.yaml` files. Integrates with self-hosted app integrations such as: Arr stack, Jellyfin, etc.

## Features

### Dashboard

- View CPU usage, storage usage, and running container counts
- Run commands on multiple hosts
- Docker app integrations

![main_page](https://github.com/jaypyles/dashboard/blob/master/docs/main_page.png)

### Server Page

- Queue remote commands
- Save command outputs for viewing
- Add new commands
- Change configuration in app

![server_page](https://github.com/jaypyles/dashboard/blob/master/docs/server_page.png)

## Adding Configs

Configs must be placed underneath `/dashboard/configs` with the name `<name>.yaml`

Example config:

```yaml
host:
  name: server
  hostname: 127.0.0.1
  port: 22
  username: user
  password: password

commands:
  - name: "view app logs"
    command: "docker logs server-dashboard"
    args: # args is optional
      - flag: "-n"
        value: "100"
```
