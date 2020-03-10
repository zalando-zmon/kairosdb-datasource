ZMON source code on GitHub is no longer in active development. Zalando will no longer actively review issues or merge pull-requests.

ZMON is still being used at Zalando and serves us well for many purposes. We are now deeper into our observability journey and understand better that we need other telemetry sources and tools to elevate our understanding of the systems we operate. We support the [OpenTelemetry](https://opentelemetry.io/) initiative and recommended others starting their journey to begin there.

If members of the community are interested in continuing developing ZMON, consider forking it. Please review the licence before you do.

# kairosdb-datasource

Starting in Grafana 3.x the KairosDB data source is no longer included out of the box.

But it is easy to install this plugin!

## Installation
Either clone this repo into your grafana plugins directory (default /var/lib/grafana/plugins if your installing grafana with package). Then run grunt to compile typescript.
Restart grafana-server and the plugin should be automatically detected and used.

```
git clone https://github.com/grafana/kairosdb-datasource
npm install
grunt
sudo service grafana-server restart
```

## Clone into a directory of your choice

Then edit your grafana.ini config file (Default location is at /etc/grafana/grafana.ini) and add this:

```ini
[plugin.kairosdb]
path = /home/your/clone/dir/datasource-plugin-kairosdb
```

Note that if you clone it into the grafana plugins directory you do not need to add the above config option. That is only
if you want to place the plugin in a directory outside the standard plugins directory. Be aware that grafana-server
needs read access to the directory.
