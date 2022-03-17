require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: "Admin@123",
    database: 'graph_db',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: 'TEST_DATABASE_URL',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    host: '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL',
  },
};
