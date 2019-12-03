# Mantle Challenge
This repository is a solution for the Mantle Corp's challenge.
It is structured in two folders:
  * e2e - contains a nodejs project configured with Cucumber and Selenium to
          tests the big picture of the requested feature.
  * front - contains an Vuejs app created with "@vue/cli" where lives the
    component wanted for the challenge.
In order to run the environment you should have installed Docker and Docker
Compose with below steps, after clone this repo:
```sh
docker-compose down -v && docker-compose up -d && docker-compose logs -f
```
When the log shows that  `mantle-front` is up and running (you can realize this
when correspondent lines print some like
`mantle-front      |   - Local:   http://localhost:3003/ `).

