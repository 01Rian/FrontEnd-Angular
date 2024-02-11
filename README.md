# Front-End

The front-end for this project is developed using Angular. It provides a user-friendly interface to interact with the User and Role Management API. The Angular application allows users to perform various actions related to user and role management seamlessly.

### Prerequisites
- Node.js and npm installed: [Node.js Installation Guide](https://nodejs.org/)

- Angular CLI installed: Install globally using the following command:
    ```bash
    npm install -g @angular/cli
    ```

### How to Run the Front-End

1. Clone the Front-End Angular project repository:
    ```bash
    git clone https://github.com/01Rian/FrontEnd-Angular.git
    ```

2. Navigate to the project directory:
    ```bash
    cd FrontEnd-Angular
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Run the Angular development server:
    ```bash
    ng serve
    ```

5. Access the front-end application at [http://localhost:4200/](http://localhost:4200/).

## Features
- **User Management:**
  - View the list of users.
  - Create a new user.
  - Update user information.
  - Delete a user.

- **Role Management:**
  - View the list of roles.
  - Create a new role.
  - Delete a role.

## Integration with API
### [Back-End API](https://github.com/01Rian/api-mongo-spring-boot) 

This application consumes a User and Roles API to manage information related to users and their respective roles. The integration with this API enables the front-end to display, create, update, and delete users, as well as assign or remove roles associated with these users.
