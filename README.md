# notes-vcita

Basic CRUD API to notes

This API use localStorage and cookie

The localStorage is in the server folder

# notice

>The length of note is limit at 1000000 chars
>
>The first id is 10000

# usage
Clone this folder

Run it as a node server
`
node .
`

The service run at 5000 port in your server

and enjoy...

# function
|__http Act__|__route__|__do__|__param__|__res__|
|---|---|---|---|---|
|post|create|create a new note|text *string*|Id *int*|
|get|read|read note by Id|Id *int*|Id *int*, text *string*|
|put|update|update note by Id|Id *int*,text *string*|Id *int*|
|delete|delete|delete note by Id|Id *int*||

# curl usage

### create
`
curl -X POST -H "Content-Type: application/json" 
    -d '{"text": "new note"}'
    http://localhost:5000/create
`

### read
`
curl -X GET -H "Content-Type: application/json" 
    -d '{"Id": "10000"}' 
    http://localhost:5000/read
`

### update
`
curl -X POST -H "Content-Type: application/json" 
    -d '{"Id": "10000","text": "update text"}' 
    http://localhost:5000/update
`
### delete
`
curl -X POST -H "Content-Type: application/json" 
    -d '{"Id": "10001"}'
    http://localhost:5000/delete
`
