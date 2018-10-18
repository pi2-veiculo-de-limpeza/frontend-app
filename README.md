# Installation and usage

## Using Docker

Run:

```
docker-compose up
```
After the server started, access [Expo app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) on your smartphone and scan the QR Code that showed up.

And congratulations, it's done.

### Important   
Maybe, trying to run the project may throw an _error_ message like this on your bash:
```
Unable to start server
app | See https://git.io/v5vcn for more information, either install watchman or run the following snippet:
app |   sudo sysctl -w fs.inotify.max_user_instances=1024
app |   sudo sysctl -w fs.inotify.max_user_watches=12288
```

To workaround this issue change (or update) */etc/sysctl.conf* with the following content:
```
fs.inotify.max_user_instances=1024
fs.inotify.max_user_watches=12288
```

And to apply that changes, run:
```
sudo sysctl -p
```
