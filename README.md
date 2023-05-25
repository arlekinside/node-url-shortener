# Start instructions
<br>

## MongoDB startup

### Start MongoDB with any preferred way

#### Docker for example
```shell
docker run -it --name sortener_mongo -p 27017:27017 -d mongo:latest
```
<br>

## Run node app

### From project root navigate to `back` folder
```shell
cd back
```

### Customize `.env` if needed
```dotenv
NODE_PORT=8080

DB_URL=mongodb://localhost:27017
DB_NANE=link

AUTH_SECRET=really_secret
```

### Build project (yarn/npm)
```shell
yarn build
```

### Run project (yarn/npm)
```shell
yarn start
```
<br>

## Testing

### See `requests.http` for available http requests
