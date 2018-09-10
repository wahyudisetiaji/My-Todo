# Todo-WS
To do list and Task manager - Organizer your life

## List API
----

**List of users routes :**

Route | HTTP | Description | Attributes
------|------|-------------|-----------
/users/signIn | POST | Sign In a User | email, password
/users/signUp | POST | Sign Up a User | name, email, password
/users/loginFacebook | POST | Log In using Facebook | email


**List of taks routes :**

Route | HTTP | Description | Attributes
------|------|-------------|-----------
/taks | GET | Find all Task | -
/taks | POST | Create Task | taskName, dueDate
/taks/:id | DELETE | Delete Task | Id Task
/task/:id | PUT | Update Task | Id Task
/task/task/:id | GET | Find one task | Id Task
/task/priority/ | GET | Find task priority | -
/task/done/ | GET | Find task done | -
/task/status/:id | PUT | Update task status done | Id Task

**List of qoutes routes :**

Route | HTTP | Description | Attributes
------|------|-------------|-----------
/qoutes | GET | Qoutes of the day | -


**API USE**
- Facebook Login
- Nodemailer 
- Qoutes 
