# Server Manager

Custom built server manager/dashboard. Easily configure hosts and commands using `.yaml` files.

## Coming Soon

Docker app integrations, with an API for easily building custom widgets.

## Features

### Dashboard

- View CPU usage and storage usage
- Run commands on multiple hosts

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
