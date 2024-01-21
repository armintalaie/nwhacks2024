# nwHacks 2024

[Notion](https://www.notion.so/armin-notes/Nw-Hacks-7fae1e0be8f4421b9334ea3640ebd552?pvs=4).

## WSL

```plaintext
# on linux
export WSL_HOST_IP="$(tail -1 /etc/resolv.conf | cut -d' ' -f2)"
socat TCP-LISTEN:5037,reuseaddr,fork TCP:$WSL_HOST_IP:5037

# on windows
# turn off your firewall! ya... i know

# forward windows to wsl
netsh interface portproxy add v4tov4 listenport=8081 listenaddress=0.0.0.0 connectport=8081 connectaddress=172.28.62.61

# run adb
adb -a nodaemon server start
```
