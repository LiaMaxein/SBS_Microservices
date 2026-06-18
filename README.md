# Blog Query Service V2

This repository contains version 2 of a microservice-based blog application.
The project is used for learning and demonstrating basic concepts of distributed systems, service communication, and event-based architecture.

## Project Overview

The application consists of multiple independent services:

```text
blogQueryServiceV2/
├── client/       # React frontend
├── comments/     # Comments service
├── event-bus/    # Simple event bus for communication between services
└── posts/        # Posts service
```

The goal of this version is to separate the application into smaller services and show how these services communicate with each other.

## Technologies Used

* React
* Node.js
* Express.js
* Axios
* JavaScript
* npm

## Architecture Idea

The application follows a simple microservice-style architecture.

The frontend communicates with backend services through HTTP requests.
The backend services can also communicate indirectly through the event bus.

Basic flow:

```text
Client → Posts Service
Client → Comments Service
Posts Service → Event Bus
Comments Service → Event Bus
Event Bus → Other Services
```

This structure is useful for understanding:

* service separation
* API communication
* event-based communication
* basic distributed system design
* frontend/backend interaction

## Installation

Clone the repository:

```bash
git clone https://github.com/dresanovic/blogQueryServiceV2.git
```

Navigate into the project folder:

```bash
cd blogQueryServiceV2
```

Each service has its own dependencies. Install them separately.

### Client

```bash
cd client
npm install
```

### Posts Service

```bash
cd ../posts
npm install
```

### Comments Service

```bash
cd ../comments
npm install
```

### Event Bus

```bash
cd ../event-bus
npm install
```

## Running the Application

Start each service in a separate terminal window.

### Start the Client

```bash
cd client
npm start
```

### Start the Posts Service

```bash
cd posts
npm start
```

### Start the Comments Service

```bash
cd comments
npm start
```

### Start the Event Bus

```bash
cd event-bus
npm start
```

After starting all services, open the frontend in the browser.

Usually the React client runs at:

```text
http://localhost:3000
```

## Repository Structure

```text
client/
```

Contains the React frontend application.

```text
posts/
```

Contains the service responsible for creating and managing blog posts.

```text
comments/
```

Contains the service responsible for creating and managing comments.

```text
event-bus/
```

Contains a simple event bus used to forward events between services.

## Important Notes

This project is intended for educational purposes.
It is not a production-ready application.

The focus is on understanding the structure and communication of a distributed application, not on security, persistence, authentication, or deployment.

## Recommended Student Workflow

1. Clone the repository.
2. Open the project in IntelliJ IDEA or another IDE.
3. Install dependencies in each service folder.
4. Start each service in a separate terminal.
5. Open the React frontend in the browser.
6. Analyze how the services communicate with each other.

## Author

Daniel Resanovic
