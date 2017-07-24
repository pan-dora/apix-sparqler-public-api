JSONLD-Framer
======

A basic service that can frame JSON-LD document sources.

Example:

Define API source document base and frame URIs in config/default.json:
```json
"iiif": {
    "service": "http://localhost:9104/sparqler?type=manifest&node=http://localhost:8080/fcrepo/rest/collection/",
    "frame": "http://localhost:3000/frame.json",
  },
```  
 Start service:
 
         $ npm start
         
 GET service resource (in this example, a IIIF manifest):
            
         curl http://localhost:3000/{collection_id}/{object_id}
         
         
See also:

[APIX-Sparqler](https://github.com/pan-dora/apix-sparqler)         