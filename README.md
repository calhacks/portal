# portal

This is the portal app for Cal Hacks 5.0.

## Install & run

Clone this repository:

`git clone https://github.com/calhacks/portal.git`

The app requires the following environment variables:

* `DB_USER`: a MySQL username
* `DB_PASSWD`: a MySQL password
* `DB_NAME`: the name of the database
* `DB_HOST`: the hostname of the database
* `SENDGRID_APIKEY`: a valid SendGrid API key

Run `yarn start` to start running the application; it will start running on `localhost:8000`.

## Application

### Routes

The routes and their handlers are described in `src/router/routes.js`.

* `/`: A link to a homepage, if necessary. It could also just redirect to `/login`.
* `/login`: A login page. User needs to input email and password.
* `/signup`: A signup page. User needs to give their first name, last name, email and password.
* `/logout`: Ends the user's login session.
* `/dashboard`: The user's dashboard. It links to the team page and application questions, and shows completion statuses.
* `/application`: Application questions. They auto-fill with information that the user has entered.
* `/team`: Join or create a team. A user enters a team name into the box; if the team name exists, the user will join that team. Otherwise, the user will have created a new team with that name.

### Email verification

FOr a user to sign up, they need to verify their email. When they sign up they'll get an email that takes them to `https://portal.calhacks.io/verify?code=XXXXXX`. Replacing the hostname with `localhost:8000` will run the email verification locally so your test user can login.

## Todos

There's still a lot to be done:

* Styling pages
* Sponsor portal/admin portal
* Deploying to `werewolves` properly
* Setting up automatic deployment from `master`
* Testing app
