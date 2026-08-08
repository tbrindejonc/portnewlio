# Portnewlio

This is the most recent portfolio I made. I wanted to make a more minimalistic interface and try display options for the projects page.

## Getting Started

### Run the dev server

First, run the development docker compose file:

```bash
docker compose up -f docker-compose-dev.yml -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

Open [http://localhost:8080](http://localhost:8080) with your browser to see the database view.

You'll see that database public schema has no tables, and that app has no data to display. You need to push database schema and populate it to see the data.

### Init and populate database

To do that, you first need to go into the app container to be able to enter commands.

```bash
docker exec -it portnewlio-app-dev /bin/sh
```

Then you'll be in the app container. You can now init the database schema with:

```bash
npx prisma migrate dev
```

This will create the tables in the database, based on the ```prisma/schema.prisma``` file.

To help prisma know the tables objects to interact with, you'll need to execute:

```bash
npx prisma generate
```

Then the prisma module will know your database schema and you'll not get any errors relative to your database interactions.

Last step is to populate the database. I personnaly prefer to do that in adminer, so I go to [http://localhost:8080](http://localhost:8080) and click ```import``` on the left and I select the migration file in
```database/portnewlio.sql``` and click on ```execute```. You'll then be able to see the data in adminer, and if you reload the navigator you'll see the data in the app pages.
