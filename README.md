# Contacts

This is a contacts webapp written using Vue, Vuex, NestJS, and Prisma.


# Installation (dev)
Prerequisites: You must have Node 14, Postgres 12, and Redis installed.

1. Create the database: `CREATE DATABASE contacts`
2. Create a `.env` file in the **nestct directory** with the following connection string: `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/contacts?schema=public"`

4. In the **nestct directory** run the command `npm run migrate:up`
5. In the **nestct directory** run the `nest start` command.
6. In the **vuect directory** run `npm run serve`

## Credits
The session functionality was written by [Insidexa](https://github.com/Insidexa) at [https://github.com/Insidexa/nestjs-session-example](https://github.com/Insidexa/nestjs-session-example)
