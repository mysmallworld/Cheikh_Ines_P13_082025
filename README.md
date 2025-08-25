# PoC Your Car Your Way  

**Description**:  

Your Car Your Way is a car rental company. Customers currently use web applications that no longer meet their functional needs or technical constraints.
A new centralized application for all customers must be created.  
This project is a PoC (“Proof of Concept”) of Chat functionality between a client and agents.  
You can check the detailed functional specifications and the detailed technical specifications in this folder ressources/SFD-STD.pdf

## Architecture

The project follows a client-server architecture, structured into two distinct parts:

- A frontend developed with Angular to manage the user interface.

- A backend built with Spring Boot to handle REST APIs, ensure security, and interact with the database.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 22.8.0 or later  
  You can download it from [Node.js official website](https://nodejs.org/).

- **npm**: Version 9.7.2 or later  
  npm comes bundled with Node.js. You can check your version by running:
  ```bash
  npm -v
  ```

- **Angular CLI**: Version 19.2.1  
  Install it globally if you haven't already:
  ```bash
  npm install -g @angular/cli@19.2.1
  ```

- **Java**: Version 17 or later  
  [Download Java](https://www.oracle.com/java/technologies/javase-downloads.html).

- **MySQL**: Version 9.4.0 or later  
  [Download MySQL](https://www.jetbrains.com/idea/).

- **Git**: Version 2.38.1 or later  
  Download it from [Git official website](https://git-scm.com/).

- **Visual Studio Code**: Version 1.103 or later  
  Download it from [VSCode official website](https://code.visualstudio.com/).

## Project installation 

1. **Clone the repository**
   ```bash
   git clone https://github.com/mysmallworld/Cheikh_Ines_P13_082025.git
   ```

## Front installation

Follow these steps to install the frontend:

1. **Navigate to the project directory**
   ```bash
   cd Cheikh_Ines_P13_082025/poc-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

## Development server front

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Back installation

Follow these steps to install the backend:

1. **Navigate to the project directory**
   ```bash
   cd Cheikh_Ines_P13_082025/poc-backend
   ```

2. **Build the project using Maven**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

## **Configuration of Database and environement variables**
Before starting the application, you must create the poc database in MySQL.   
You can do this with the following command in your MySQL terminal:  

```bash
mysql -u root -p
```
Enter your password (here we use a root as username).

```bash
CREATE DATABASE IF NOT EXISTS poc_your_car_your_way;
    USE poc_your_car_your_way;
```

You need to add environement variables into estate/src/main/resources/application.proporties :

DBURL: url of your database.
DBUSERNAME: username of your database.
DBPASSWORD: password of your database.

You will found the SQL script file in this folder **ressources/script.sql**

## Development server poc-backend
The development server runs at: `http://localhost:3001/`.  
Reload the application if you make any changes to the source files.

## Environment  
 
The project uses the following key technologies:

**Angular**: Framework used for creating the application.  
**Bootstrap**: CSS framework for responsive design.  
**SpringBoot**: A framework for building microservices and REST APIs.  
**MySQL**: A relational database used to persist application data.   
**Lombok**: A Java library that auto-generates boilerplate code like getters and setters.   
**WebSocket (Socket.IO & Spring WebSocket)**: Real-time communication frameworks used on both frontend and backend.

## Versions  

- **Node.js**: 22.8.0
- **npm**: 9.7.2
- **Angular CLI**: 19.2.1
- **Angular**: 19.2.1
- **rxjs**: 7.8.2
- **Boostrap**: 5.3.7
- **Boostrap-icons**: 1.13.1
- **Java**: 17
- **SpringBoot**: 3.3.5
- **MySql**: 9.4.0
- **Lombok**: 1.18.34
- **Git**: 2.38.1
- **Visual Studio Code**: 1.103.0
- **IntelliJ**: 2024.2.6