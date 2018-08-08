## Services Engineer Task

### Setup
    npm install
    npm start

### Description

The implementation uses Node.js/Express to create a simple HTTP server that
serves up the basic Key/Value store API. The data store uses a file-based
database using the open-source google LEVEL DB, which provides basic key/value
get/set capability and nothing else.  The description didnt say how the client
would provide the key in the API call, so I assumed it would be appended to
the url.  Individual 'chunks' of the stored json can be retrieved by name using
a query param, as can any version of the stored document using an 'id' query
parameter.  As POST calls are made using the same KEY the new version is simply appended to the end of the existing array of document versions.  By default the
most recent version is returned for a GET.

### Example curls...

    curl http://localhost:3000/111111 -v -d '{"bleegh": "asdfasfasdf", "html": "foo bar baz"}' -H 'Content-Type: application/json'

    curl http://localhost:3000/111111\?chunk\=html -v  -H 'Content-Type: application/json'

    curl http://localhost:3000/111111\?id\=0 -v  -H 'Content-Type: application/json'
