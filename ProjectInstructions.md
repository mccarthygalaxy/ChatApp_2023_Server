# Chat - Server

## Project Rubric
[Chat Server Rubric](https://docs.google.com/spreadsheets/d/1uoM1RMYPRfJN2VbY81ctmsM_iSUXFbOl8zckN-yv328/edit?usp=sharing)

## Concept
Each teammate will take on a aspect of each ticket to complete. As a team, you will both utilize individual branches to build out your versions of each ticket. Once a ticket is built, as a team, you will then need to merge your code into a `main` branch.

> example: 
> 
> Bob and Sue are partners
>
> The project will have it's own repo and be represented by the `main` or `master` branch.
>
> Bob will create his own branch `git checkout -b bob` while Sue creates her own branch `git checkout -b sue`. 
>
> When either one completes a ticket, they will push to their branch: `git push origin bob`. 
>
> Whomever is the `git master`, established at the beginning of the project, they will do a `pull request`, merging their code to the `main/master` branch. 
>
> Sue will then do a `git pull origin main` to her branch to obtain the updated code.

Your teams project should start here as the root file.

---
# Stories
These user stories will be a basis as to how the application should work for individuals. These are meant to be broad strokes to the overall build of the application. Consider these regarding both the server and client side aspects.

## Send And Receive

- **Given** an empty chat room
- **When** a user types their name into the `username` field
- **And** types a message into the `message` field
- **And** clicks the "Send" button
- **Then** the message appears in the chat room with their username
- **And** is written to your Mongo DataBase

## Poll for new messages every 10 seconds

- **Given** a new message is sent
- **Then** the client will see it in less than 10 seconds (without clicking Refresh)

### Hint:

* Use [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) or [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout).

## Rooms

In addition to the main room, create at least three different rooms (look to our Discord if you need inspiration)

- **Given** a specific room 
- **When** a user is in that specific room
- **And** submits a post
- **Then** the message will appear in that specific room
- **And** not in any other room
- **And** The client should show a list of all available rooms, either in a popup menu or a scrolling list.
- **Given** a user clicks on a link to another room
- **Then** they should see all messages associated with that room in the database.

---
# Tickets
**Quick Note:** Each ticket will represent up to three parts. A general ticket id will indicate an general requirement. This means that both team members should work together to build it. This can be done via pair programming (where one screen is shared). 

If a ticket denotes an **"a"** or **"b"** along with its id value, this is meant for an individual student to build.

> Example:
>
> **U6_01**: Both Bob and Sue
> 
> **U6_01a**: Bob
> 
> **U6_01b**: Sue

It is important that commit messages indicate which portion of the ticket you are working through. This will help track your contributions to the overall project.

It should also be noted that the purpose is to assist one another throughout the build as well. This means that if Bob is struggling with the structure of `U6_01a`, Sue can help resolve the issue through assistance.

---

# Server

## Ticket 
**Spin Up**: `#U5_01`
- Application should have all depenedencies associated:
- `dotenv`, `express`, `jsonwebtoken`, `bcrypt`, `mongoose`, and `cors`.
  - `nodemon` should be a `devDependency`
- `package.json` should detail within the `description` the team members names.
- `database` connection should be in a separate file `db.js`.
- There should be an `example.env` to detail what environmental variables are associated within the `.env`.
- `node_modules` and the `.env` should not be a part of the GitHub repo.

---

**Models**: 

Each collection requires a schema associated with this application. There will be:
1. Users
2. Message Rooms
3. Messages

You will need to consider what data types should be associated with a key in each model.

`#U5_02`
**User**

| username | email | password | 
| --- | --- | --- |
| required / unique | required / unique | required | 


`#U5_02a`
**Room**

Rooms will need to be referenced in the front end for users to navigate to see various messages. Each room will be created by a user, making that user the "admin" who can only update and delete said room. 

Users will not be able to update or delete any messages within the room.

The messages key will eventually hold an object of each message so that it can be displayed within the rooms message board.

| title | description | messages | ownerId |
| --- | --- | --- | ---|
| required / unique | not required | array | id |


`#U5_02b`
**Message**

Users should be able to create a messages that are associated with a room. 

These messages will be 

| date | text | owner | room |
| ---  | ---  |  ---  |  --- |
| required | required | id | id |

---

## Middleware:

`#U5_03`

- There are various routes that will require validation in order to access.

---

## Controllers:

These are the routes that will be required per schema created.

`#U5_04` **User**

- Create an account
- Login to an account

`#U5_04a` **Room**

- Create a room
- Get one room
- Get all rooms
- Update a room
- Delete a room

Rooms should only be updated and deleted by the owner. All users should be able to view each room. All users should be able to view a selection of all rooms.

`#U5_04b` **Message**

- Create a message per room
- Get all messages per room
- Update message
- Delete message

Messages should only be updated and deleted by the owner. All users should be able to see all messages associated within each room.

**Ticket Requirements:**
- Create an assets folder that hold both the `collection.json` and the `environment.json` files from **Postman**.
  - [How to Export/Import from Postman](https://www.loom.com/share/33346866903b4ca6afb536e7309884d9)

---

## Stretch Goals:
### Note:
Stretch goals should not be attempted until previous tickets have been completed and tested.

`#U5_05`

- Include a `README.md` to the **root** directory.
  - Detail the concept of this project in psuedo code within the document.
  -  **[Pseudo Code Article](https://www.geeksforgeeks.org/how-to-write-a-pseudo-code/)**
  -  Each team member should highlight the portions that they worked through.
  -  [What is a README file?](https://www.mygreatlearning.com/blog/readme-file/)
- Create an `index.js` files to route all models.
- Create an `index.js` files to route all controllers.
- Create `middleware` functions to handle responses for all routes.
- Create an `index.js` file to route all middleware functions.
- Regarding the `user controller`:
  - Create an Update route.
  - Create a Delete route.
- Regarding the `room controller`:
  - Get all rooms per owner.
- Regarding the `message controller`:
  - Get all messages per owner.
- Provide a JSON file from Postman representing both the **Collection** and **Environment** for this project.
  - This needs to be stored within an **assets** folder. 