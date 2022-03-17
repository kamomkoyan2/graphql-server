const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');
const { sequelize } = require('./database/models');
const app = express();

app.use(cors());


console.log(typeDefs);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});



const server = createServer(app);


const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.error(`${(new Date()).toUTCString()} uncaughtException:`, err);
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err);
});


apolloServer.start().then(res => {
    apolloServer.applyMiddleware({ app, path: '/api' });
    server.listen({ port }, () => console.log(
        `Server start at http://localhost:${port}/api`,
      ));

      sequelize.sync({ truncated: true})
      .then(() => {
          console.log(`db connected`)
      })
      
})

