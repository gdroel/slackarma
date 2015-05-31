var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/slackrep';

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, team VARCHAR(40) not null, rep INT)');

query.on('end', function() { client.end(); });
