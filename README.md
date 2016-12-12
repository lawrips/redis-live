# Redis Live

## Current Status
A front end UX for redis, built in node + react. Early, functional, operational. 

Current features of the web interface:

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

## Why another Redis dashboard? 


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

## Demo
View Redis Live running against a live cluster at [www.redislive.com](http://www.redislive.com)