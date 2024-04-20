# Setup
## run mongo db
### Docker
1. pull mongodb image `docker pull mongodb/mongodb-community-server:latest`
2. start mongo image `docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest`
3. check if the container running with `docker container ls` 
### Others
* in case of using mongodb in the cloud just update the `MONGO_URL` in the `server/.env` file

## Set up the server
1. go to server folder `$ cd server`
2. run `$ npm i` to install all dependencies
3. run `$ npm start` to start the server
*  if the server run successfully you should see the logs:
```
[socket] - Socket server started on port 8080
Connected to mongoDB successfully.
Successfully initialize mock data in mongodb
Server run on port 4000
```

## Set up the client
1. got to the client folder `$ cd client`
2. run `$ npm i` to install all dependencies
3. run `$ npm start` to start the server
*  if the app run successfully you should see the logs:
```
Compiled successfully!
```
* client run on port 3000 by default


# TODO:
1. add comment about lock
2. add comment about ws