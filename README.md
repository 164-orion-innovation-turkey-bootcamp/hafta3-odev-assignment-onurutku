# Application Explanation
Application has 3 main (dashboard,header,home) and 2(login,register) child component and it has one service(app.service.ts) to handle data.
## Styles
NPM(Bootstrap,FontAwesome),SCSS
## Validations
I used reactive forms for login and register forms because i want to use custom validation for email and password inputs.

Login page custom email validation; listens email inputs' value and checks database if there is match or not.
if there is not it sends an error message to user.

Register page is also listens email address value to check database to block register same email twice,and register page is also listens for repassword input to compare password values.

First password input has also validation with RegExp
at least one lowercase char
at least one uppercase char
at least one number
6-30 char
## Local API
i used json server for local API,"https://github.com/typicode/json-server" after run the project with ng-serve you need to call "npx json-server --watch db.json" to run local API in another terminal.

## LocalStorage
if a user logged in. only user id stored on localstorage,with that if page refreshed user still can be logged in. Otherwise user must login again for each page refresh situation.
## Route Guard
Here, i used canActivate route guard to manage routes.So, users cannot reach their or others dashboards if they aren't logged in.
And also if they use write the url manually, again route guard navigate them to home page.

## Example User
<img
src='src/assets/Example User.jpg'
raw=true
alt='Subject Pronouns'
style='margin-right: 10px;'
/>

# Hafta3Onurutku

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
