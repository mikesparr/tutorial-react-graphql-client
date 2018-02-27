# React GraphQL (client) Tutorial With Subscriptions
This repository includes a working (as of Feb 27, 2018) React app that uses Apollo GraphQL Client to connect to a GraphQL server and perform queries.

# Dependencies
A running GraphQL server that exposes subscriptions over websockets. This working example uses the tutorial at:
 * https://github.com/mikesparr/tutorial-graphql-subscriptions-redis

You should clone this repo and start it **BEFORE** starting your client server. You will need to make a change to the CORS config in `server.js` to allow requests from `http://localhost:3001` for the client to interact with your server.

# Background
In a new product, we wanted realtime notifications to users, and planned on adding a Redis user cache. Our UI is built with React and Redux, so we decided on GraphQL as the API layer (instead of REST), and wanted to leverage the new subscriptions feature, or at least compare it to polling. This client is an example on how to configure a React app to interact with the GraphQL server and subscriptions.

# System Requirements
 * Node version 6 or later
 * Terminal (command line interface and `npm`)
 * Redis server

# TL;DR
 1. Get GraphQL server running first following steps in above repo
```
git clone git@github.com:mikesparr/tutorial-graphql-subscriptions-redis.git
cd tutorial-graphql-subscriptions-redis
npm install
```

 2. Clone and install the client app
```
git clone git@github.com:mikesparr/tutorial-react-graphql-client.git
cd tutorial-react-graphql-client
npm install
```

 3. Start the server
  * `npm start`

 4. Open browser (2) to http://localhost:3001
  * this is your React client app (just extending demo `App.js` from create-react-app)

 5. Type in some message in form field and submit

 6. Confirm the message appears on page from the subscriptions

 7. Follow steps 5-10 on the GraphQL server README
  * use a different browser window and tabs
  * your client app subscription will automatically update the message
    * try from GraphiQL IDE 
    * try directly from Redis `PUBLISH`

 8. Refresh your client browser and you should see all messages listed at bottom

 9. Congratulations! You have built a client application that can perform queries, mutations, and listen for subscriptions on websocket channel.

# Important lessons learned
 * You must `split` (see index.js file) your `HttpLink` and `WebSocketLink` to handle both queries and subscriptions
 * You must wrap your root component with Client and import necessary helpers on your child components
 * Mutations are complex but once you figure them out, they will be easy. There are many ways to perform them, and even chain them so this is just a simple illustration

# Next steps
Now that you've connected a GraphQL client to a server and interacted, you can learn about caching, pagination and other more advanced topics. Enjoy and best of luck!


