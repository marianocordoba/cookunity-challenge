# Cookunity Challenge

## Assumptions

- All the cards belong to the same set
- A card can fight itself (i was not sure about this one but I thought a user could want to see the result of this scenario)
- There can be many cards with the same properties (name, attack, defense, etc)
- A card can have none or one weakness and resistance
- The card has an attack property instead of movements with different attack values. It would be interesting to have different attack values for different movements but for this challenge, I will keep it simple.

## Solution

- I created the whole project within this monorepo using Bun workspaces. 
- The Typescript and Eslint configs are in their own packages to be shared across the whole project.
- The core package contains the entities and some core logic that can be used by different apps within the project.
- For the API I used Elysia, a very fast and lightweight framework for Bun. I would probably use Nest for a real world project because it is more mature, has more features and more developers are familiar with it, but I wanted to try Elysia for this challenge. I had some issues with the Swagger integration but kinda managed to make it work.
- For the database I used a local Postgres database as it was a requirement of the challenge. In a real project I would use SQLite for local development and Postgres for production.
- The frontend is a Next.js 14 app. I focused on keeping most of the components on the server side to improve performance.

## Things to improve

- Add more tests. Currenlty only the `wouldWinAgainst` function is being tested.
- Add more error handling. I am not handling errors in the frontend and the API as I should.
- While Elysia does some validation, I think it would be better to handle it myself and return a proper error message.
- Pagination and filtering. For me this is a must have for a real world project, but I didn't have time to implement it.
- Authentication so users can create their own decks and cards and fight against other users.
- Add a card CRUD to the frontend.

## How to run

- Install [Bun]()

- Install dependencies with `bun install`

- Create an `.env` file in `apps/api` with the following content:

  ```
  DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>
  ```

- Run the migrations by running `bun run --filter api migrate` in the root of the project

- Create an `.env` file in `apps/frontend` with the following content:

  ```
  NEXT_PUBLIC_API_URL=http://localhost:3000
  ```

- Run the project with `bun dev`. This will start the API on port 3000 and the frontend on port 3001 (by default).

- _(Optional)_ Access the API documentation on http://localhost:3000/docs

- _(Optional)_ Create some cards with the API or by running `bun run --filter api seed`

- Access the frontend on http://localhost:3001

- _(Optional)_ You can run the tests with `bun test`