APIX-SPARQLER-public-api
======

A basic node js app that reads and serializes a response from the [APIX-Sparqler](https://github.com/pan-dora/apix-sparqler) service.

It performs three functions:
1. (re)compacts the framed response to remove `@graph` from the manifest Map using the modified javascript jsonld library.
2. rewrites and simplifies the APIX-SPARQLER request URI.
3. uses the redis client to cache query responses.  

Example:

Define API source document base in config/default.json:
```json
"iiif": {
    "service": "http://localhost:9104/sparqler?type=manifest&node=http://localhost:8080/fcrepo/rest/collection/",
  },
```  
 Start service:
 
         $ npm start
         
 GET service resource (in this example, a IIIF manifest):
            
         curl http://localhost:3000/{collection_id}/{object_id}
         
         
See also:

[APIX-Sparqler](https://github.com/pan-dora/apix-sparqler)         