# TrackExpense

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53747bd0e6f0454abf7554b8b7f90639)](https://app.codacy.com/gh/suvrat29/track-expense?utm_source=github.com&utm_medium=referral&utm_content=suvrat29/track-expense&utm_campaign=Badge_Grade_Settings)

An easier way to manage your expenses.

This project was generated with [Angulr CLI](https://github.com/angular/angular-cli) version 12.1.1.

## How to setup

1) Clone this repository and it's backend [track-expense-api](https://github.com/suvrat29/track-expense.api).
2) Build the API project using `cd path-to-api` then `dotnet run`.
3) To run this project, angular-http-server is needed. Instructions: `npm install -g angular-http-server`
4) Navigate to the angular project, install dependencies: `npm install`
6) To view the project, use command: `npm run build` to build the project.
7) For contributors, you can watch the project using: `npm run watch:login` and `watch:content` in separate node cmds.
8) After the build/watch has generated output files, serve it through angular-http-server installed previously using `angular-http-server -p 9000 --open`
9) Visit [http://localhost:9000/login]() to view the project.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
