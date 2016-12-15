![Redis Live](./lib/public/img/logo.png)

## Current Status
A front end UX for redis, built in Node.js and React providing a quick, glancable view of all the Redis servers in your cluster as well as a historical view of key metrics (e.g. used memory, # keys, etc). 

While this project is early it is functional, operational. You can view a demo at [www.redislive.com](http://www.redislive.com).

Current features of Redis Live (v0.4.5):

* Redis console for free form querying (e.g. "SET hello world", "GET hello")
* Autocompletion and whitelisted / blacklisted commands
* Individual server stats (leveraging the INFO command)  
* Cluster support and status (e.g. which slave nodes are connected to the cluster, etc)
* Historical stats on memory usage, # of connected clients with interactive charts and glanceable spark lines 
* Responsive UX
* Tested / support for Redis 3.x

Currently, recommend running this only in a secure network (until auth and additional security is added).

Features under consideration for the future (particularly if I get demand / requests):

* Authentication 
* Redis server & cluster creation
* Better setup tools / script for installation of Redis-Live
* Additional UX

To request a feature, just open a Github issue.



## Running using Node.js
To run using Node.js, simply:

1. Download (and unzip) or clone this repo
2. Create a configuration file ./config/config.json (instructions in the [configuration section](#configuration))
3. Then run:

```
npm i
npm start
```

You can now browse to http://localhost:9999 to see the Redis Live dashboard. If you want to change the default port, change the environment variable PORT. For example (MacOS):

```
export PORT=10000
```

## Running as a Docker Container
Alternatively, you can run Redis Live in a docker container.

1. To build the docker image, you can either do this manually from the git repo, or pull down the latest version from the public docker registry:

```
docker pull lawrips/redis-live
```

2. Then create a configuration file that Redis Live will need to locate your redis servers (instructions in the [configuration section](#configuration))
 

3. The use the following startup script: 

```
docker run -d --restart=always -it -p 80:9999 \
-e "PORT"=9999 \
-v [path_to_your_config.json]:/usr/src/app/config/config.json lawrips/redis-live
```

This will make redis-live available on port 80, and also map the config file you created in the previous section. Make sure to replace [path_to_your_config.json] with the absolute path on your local machine so the Docker host knows how to map the file. 

NOTE - if you're working with Docker for development against local Redis server(s), you'll need to do some port mapping magic to get Docker to talk to your host Redis. 

You can now browse to http://localhost to see the Redis Live dashboard. 


## Configuration 

Before you can run Redis Live, it needs to know where to find your Redis server(s). To do this, create a file with the following setup:

### For a single server
To connect to a server running on localhost on port 6379, with a password of abcdefg

```
{
   "server":
    {
        "host": "127.0.0.1",
        "port": 6379,
        "password": "abcdefg"
    }
}
```

An example of this file [can be found here](./config/config_server_sample.json).

### For a cluster
To connect to a cluster of six servers, use config in the following format:
```
{
   "cluster":[
        {
            "host": "server1incluster",
            "port": 6379
        },
        {
            "host": "server2incluster",
            "port": 6379
        },
        {
            "host": "server3incluster",
            "port": 6379
        },
        {
            "host": "server4incluster",
            "port": 6379
        },
        {
            "host": "server5incluster",
            "port": 6379
        },
        {
            "host": "server6incluster",
            "port": 6379
        },
    ],
    "options": {
        "password":"clusterpassword"
    }
}
```

An example of this file [can be found here](./config/config_cluster_sample.json).

## Historical stats
Redis Live uses another library called Redis Stats (which I also wrote) to generate historical data over time using the redis INFO command. This library gets auto installed and started with Redis Live and uses the standard redis INFO command to generate statistics such as total number of keys, used memory, uptime, etc. The data is recorded at regular intervals and then stored back into the same Redis server where it's consumed by Redis Live (or can be accessed directly for your own purposes). [Find out more about this library here](https://www.npmjs.com/package/redis-stats).  

## Advanced options

### Command / querying options
Redis Live supports querying against a redis database for freeform redis queries (e.g. GET, SET, MGET, etc). For security reasons, there are configuration files in /config/blacklist.json and /config/whitelist.json. These represent a blacklist of commands that should not be allowed and a whitelist of commands that should be allowed, respectively. 

By default, the whitelist.json file is populated with the following commands:

```
[
"CLUSTER NODES",
"GET",
"INFO",
"SET"
]
```

If you wish to expand this set, just add additional commands to this array. Alternatively, you can remove all entries from the whitelist (leaving it with an empty array) which will mean that ALL commands will be allowed. To remove comamnds selectively from the allowed set, just add to blacklist.json array. 

## Demo
View Redis Live running against 6 node (3 master / 3 slave) Redis cluster at [www.redislive.com](http://www.redislive.com)