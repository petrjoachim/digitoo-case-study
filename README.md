# User management API

## Running the app

```bash
# start a database (e.g. with docker)
docker run -d --name postgres-container -e POSTGRES_PASSWORD=my_cats_name -p 5432:5432 postgres
docker exec -it postgres-container psql -U postgres -c "CREATE DATABASE digitoo"

# install dependencies
npm ci

# create .env file
# you can use .env.example and fill in your database connection secrets
tee -a .env << END
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_PASSWORD=my_cats_name
DATABASE_USERNAME=postgres
DATABASE_NAME=digitoo
END

# start dev server
npm run start:dev

# your backend should now run on <http://localhost:1337/>
```

## Tests

```bash
# unit tests
$ npm run test
```
