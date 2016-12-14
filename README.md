![Redis Live](./lib/public/img/logo.png)

# Redis Live

## Current Status
A front end UX for redis, built in Node.js and React. While this project is early it is functional, operational. You can view a demo at [www.redislive.com](http://www.redislive.com).

Current features of Redis Live (v0.4.5):

* Redis console for free form querying (e.g. "SET hello world", "GET hello")
* Autocompletion and whitelisted / blacklisted commands
* Individual server stats (leveraging the INFO command)  
* Cluster support and status (e.g. which slave nodes are connected to the cluster, etc)
* Tested / support for Redis 3.x
* Historical stats on memory usage, # of connected clients with interactive charts and glanceable spark lines 
* Responsive UX
 
Features under consideration for the future (particularly if I get demand / requests):

* Authentication 
* Redis server & cluster creation
* Better setup tools / script for installation of Redis-Live
* Additional UX

To request a feature, just open a Github issue.

## Usage

To run:

1 . Download (and unzip) or clone this repo

2 . Create a ./config/config.json as follows:

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

3 . Then:
```
npm install
npm start
```

## Advanced options

### Command line options
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