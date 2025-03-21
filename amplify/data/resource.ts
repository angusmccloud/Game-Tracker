import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Games: a
    .model({
      gameId: a.id().required(),
      joinCode: a.string().required(),
      gameStatus: a.string().required(),
      currentRound: a.integer(),
      gameNotes: a.string(),
      archiveGamePlayers: a.json().array(),
      archiveTurns: a.json().array(),
      gamePlayers: a.hasMany("GamePlayers", "gameId"),
      turns: a.hasMany("Turns", "gameId"),
    })
    .identifier(["gameId"])
    .authorization((allow) => [
      allow.owner(),
      allow.publicApiKey().to(['read']),
    ]),

  GamePlayers: a
    .model({
      gamePlayerId: a.id().required(),
      gameId: a.id().required(),
      name: a.string().required(),
      icon: a.string(),
      items: a.string().array(),
      game: a.belongsTo("Games", "gameId"),
      turns: a.hasMany("Turns", "gamePlayerId"),
    })
    .identifier(["gamePlayerId"])
    .secondaryIndexes((index) => [index("gameId")])
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'create', 'update']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),

  Turns: a
    .model({
      turnId: a.id().required(),
      gameId: a.id().required(),
      gamePlayerId: a.id().required(),
      roundNumber: a.integer().required(),
      turnStatus: a.string().required(),
      flagForDMActionAtRoundEnd: a.boolean().required(),
      notesForDM: a.string(),
      game: a.belongsTo("Games", "gameId"),
      gamePlayer: a.belongsTo("GamePlayers", "gamePlayerId"),
    })
    .identifier(["turnId"])
    .secondaryIndexes((index) => [index("gameId")])
    .authorization((allow) => [
      allow.publicApiKey().to(['read', 'create', 'update']),
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 7,
    }
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
