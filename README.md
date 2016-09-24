# redis-live

## Current Status
A front end UX for redis, built in node + react. Very early days. 

Current features:

* Autocompletion for commands
* Free form querying (e.g. "SET hello world", "GET hello")
* Server stats   
* Cluster support and status 
* Support for Redis 3.x
* Whitelisted / blacklisted commands

Still changing a lot but feel free to use. 

Planned features:
* Authentication 

## Usage

To run:
1 . Download (and unzip) or clone this repo

2 . Create a ./config/config.json with the following values (currently cluster only):
```
{
   "cluster":[
        {
            "host": "ahostinthecluster",
            "port": 6379
        }
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
View Redis Live running against a cluster at [www.redislive.com](www.redislive.com)