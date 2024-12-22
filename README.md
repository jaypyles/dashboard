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

## Deployment

To deploy the dashboard, you can use the `docker-compose.yml` file.

Run the command: `make pull up`

## Integrations

Integrates with several self-hosted apps such as: Arr stack, Jellyfin, etc. Used to report quick stats and link to external apps.

All example config files can be found in the `docs/integrations` folder.

## Adding Configs

Configs must be placed underneath `/dashboard/configs` with the name `<name>.yaml` or you can mount a volume to `/project/configs`

Example config:

Note: the name of the config file must match the name key in the config file.

```yaml
host:
  name: server
  hostname: 127.0.0.1
  port: 22
  username: user
  password: password
  storage:
    - /path/to/storage/to/monitor

commands:
  - name: "view app logs"
    command: "docker logs server-dashboard"
    args: # args is optional
      - flag: "-n"
        value: "100"
```

### Adding Integrations

Integrations must be placed underneath `/dashboard/configs/integrations` with the name `<name>.yml`

The `display_url` is optional and is used if you want to display a different url than the `url` in the integration, for example: http://192.168.1.100:8096 is the jellyfin url, but you want to display the jellyfin dashboard url located https://yourdomain.com/jellyfin.

Example integration:

```yaml
url: <url>
api_key: <api_key>
display_url: <display_url> # optional
```

### Editing the Background

You can click the file icon in the top right corner to change the background or you can upload a new image to the `/dashboard/configs/assets/background.jpeg` file.

The background will be displayed on the dashboard and the server page.
