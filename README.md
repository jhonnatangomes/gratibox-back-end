# Gratibox back-end

This project is the back-end for Gratibox, a delivery application. You can find front-end for this application [here].

## How to run

First clone the repository into your computer:

    git clone https://github.com/jhonnatangomes/gratibox-back-end

Then, enter the project directory and install dependencies with npm:

    cd gratibox-front-end
    npm i

Then, log into postgres user:

    sudo su postgres

Create three databases, with:

    createdb -T template0 gratibox
    createdb -T template0 gratibox_development
    createdb -T template0 gratibox_test

Now, we're going to dump the two databases in the project: development database and test database. Run:

    psql gratibox > production.sql
    psql gratibox_development > development.sql
    psql gratibox_test > test.sql

Now, we need to create the .env files. Create .env, .env.development and .env.test in project root folder following the template in .env.example. Production database will run in .env, development will run in .env.development and test will run in .env.test.

You can then run the project on each one of three databases you created. In order to run in production, do:

    npm run start

For development:

    npm run start:development

For tests with watch enabled:

    npm run start:test

For tests with watch disabled:

    npm run test

Alternatively, you can also run

    npx ntl

and choose the corresponding script you want.

[here]: https://github.com/jhonnatangomes/gratibox-front-end
