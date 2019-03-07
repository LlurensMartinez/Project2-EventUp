<!-- --------- Title ------- -->

EVENTO UP


<!-- --------- Description -------- -->

The user can create events in full detail and send the invitation tu friends (wich mas me app users). Users con confirm the atendance of the event.

<!-- -------------- User Stories ----------- -->

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Signup** - As a user I want to signup so as to use the app.
- **Login** - As a user I want to login so as to use the app.
- **Logout** - As a user I want to logout so nobody can use my account.
- **Homepage** - As a user I want to see the homepage so as tu navegate thruough the app options
- **Create Event** - As a user I want to be able to create an event with its specific information so other users can know of it.
- **Invite Friends** - As a user I want to be able to invite friends to my event so as to let them know about it.
- **Accept Event** - As a user I want to be able to acept the invitations of event so as to let the event creator know Im going or not.
- **Display Firends** - As a user I want to be able to see a list of my friends.
- **Cancel invitation** - As a user I want to be able to cancel the invitations of events Im not going
- **Add Friends** - As a user I want to be able to follow friends so as to invite them later to my events.
- **Upcoming Events** - As a user I want to see the events I am going.
- **View Profile** - As a user I want to be able to see my profile.
- **Edit Profile** - As a user I want to be able to edit the information display In my profile.

<!-- ------------ Backlog ----------- -->

Events:
  .Let other know what Im missing
  .Attending parties can confirm what they are taking to the event
  .Events can be public and no/friends user can apply to attend.
  .Event creator can confirm or reject the no/friends users attendance .
Friends:
  .Friends invitation must be confirmed.

<!-- ------------ Routes -------------- -->

GET /
Require Anon:
  .Displays Signup / Login <a>
Require User:
  Displays the homepage with:
  -Logout button
  -Profile <a>
  -Create event <a>
  -Friends <a>
  -My events <a>

GET /auth/signup
**Require Anon:**
 Route protection
  Display signup form with:
   
POST auth/signup
  .Sends the information and creates the new user
  Body
  -name
    -username
    -email
    -password
  Validation:
    -All fields must be filled.
    -Username should be unique

GET /auth/login
**Require Anon:**
  Display login form with:
  -username
  -password
  Validation:
  -Both fields must be completed
  -Fields must much the database
POST auth/login
  **Require Anon:**
  .Sends the information, chechks the validation, if OK render Homepage
  Body:
  -username
  -password
  Validation:
  -Both fields must be completed
  -Fields must much the database

POST /logout
**Require User:**
  .Sends the logout request and redirect to /index page

GET /user/:id
**Require User:**
  Displays the profile page with:
  -Name
  -Username
  -Email
  -Adress
  -Edit <a>

GET /user/:id/edit
**Require User:**
  Displays the from to edit profile with:
  -Name
  -Username
  -Email
  -Adress
  -Edit button

POST /user/:id/
**Require User:**
  Sends the form information, edits the profile and redirect to /user/:id/profile
  ADD BODY
  ADD VALIDATION
  ADD PROTECTION

GET /user/:id/friends
**Require User:**
  Displays my friends and search new friend form

POST /user/:id/friends
**Require User:**
 Sends the new friends request and add the user to my friends list
 body
  friend name
Validation
  Field reuired

GET /events/new
**Require User:**
  Displays the create event form with:
  -Title
  -Description
  -Adress
  -Date

POST /events
**Require User:**
  Sends the info, creates the events, and sends the invitation to the users
  Body:
  -Title
  -Description
  -Adress
  -Date
  Validation
  -All fields required
  
GET /events/:id/add
**Require User:**
  Displays add friends form

POST /events/:id/add
**Require User:**
  Sends the info and adds the participants and redirects to /events/:id/add
  Body:
  participant
  Validation
  -Field require

GET /events/:id/
**Require User:**
  Display the event with all of its information


GET /events/
**Require User:**
  Display the upcoming events and my events


  MiddleWares

requireAnon --> no user login
requireUser --> Specific user login


<!-- ---------- Models -------------- -->


User {
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  friends: {
    type: [ObjectId]
  }
}

Event {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
  adress: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  hour: {
    type: Number,
    required: true
  }
  creator: {
    type: ObjectId,
    required: true
  },
  participants: {
    type: [ObjectId]
  }
}

<!-- ---------- Git ------------ -->

link: https://github.com/tomasyaya/event-up

<!-- ---------- Slides ---------- -->

link: https://slides.com/tomasyaya/event-up/#/




