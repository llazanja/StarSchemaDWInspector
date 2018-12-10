# StarSchemaDWInspector

### Clone the repository
```
git clone git@github.com:llazanja/StarSchemaDWInspector.git
```

### Position yourself inside the project root directory
```
cd StarSchemaDWInspector/
```

### Install dependencies
```
npm install
```

### Create file with environment variables
```
touch server/.env
Edit it and add following properties:
    PORT=<port>
    MSSQL_USER=<username>
    MSSQL_PASSWORD=<password>
    MSSQL_HOST=<host_ip>
    MSSQL_DATABASE=<database>
```

### Run server
```
npm run sstart
```

### Run client
```
npm run cstart
```
