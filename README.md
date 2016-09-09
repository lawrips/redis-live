# redis-live

A front end UX for redis, built in node + react. Very early days. 

Planned features:

* Autocompletion for commands
* Free form querying (e.g. "SET hello world", "GET hello")
* Server stats 
* Cluster support and status
* Authentication 
* Standalone client library


Still changing daily, so not worth trying yet - but if you want to give it a shot, feel free. 

To run:

1. Create a ./config/config.json with the following values (currently cluster only):
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

2. Then:
```
npm start
```