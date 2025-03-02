

# PennyApp - Modern E-commerce Platform

## Overview
PennyApp is a full-stack e-commerce application built with Angular and NestJS, featuring a modern UI, robust authentication, and comprehensive product management capabilities. The project uses an Nx monorepo structure for better code organization and development efficiency.

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
MONGO_URI=mongodb+srv://omar:g99NCUjDgQjWX4Bw@cluster0.98ltc.mongodb.net/best_dB?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
JWT_SECRET=myscretkey
JWT_EXPIRE=8h
CLIENT_URL=http://localhost:4200
```

These environment variables are required for the application to connect to the database and configure authentication properly.

## Application Ports

- **Frontend (Angular)**: http://localhost:4200
- **Backend (NestJS)**: http://localhost:3000

## Technology Stack

### Backend (API)
- **Framework**: NestJS 10.0.2
- **Database**: MongoDB (Mongoose 8.11.0)
- **Authentication**: JWT
- **Port**: 3000

### Frontend (UI)
- **Framework**: Angular 19.1.0
- **State Management**: NgRx 19.0.1
- **Port**: 4200
- **Styling**: Tailwind CSS
- **Key Libraries**:
  - @angular/router for navigation
  - @ngrx/effects & @ngrx/store for state management
  - RxJS 7.4.0 for reactive programming

### Backend (API)
- **Framework**: NestJS 8.0.0
- **Database**: MongoDB with Mongoose 8.10.1
- **Authentication**: JWT (@nestjs/jwt)
- **Key Libraries**:
  - @nestjs/swagger for API documentation
  - bcrypt for password hashing
  - cloudinary for image management
  - class-validator for DTO validation

## Features

### Authentication & Authorization
- User registration and login
- Role-based access control (Admin/Customer)
- Password reset functionality
- JWT-based authentication
- Protected routes

### Admin Features
- User management dashboard
- Product management (CRUD operations)
- Image upload and management
- Analytics and reporting

### Customer Features
- Product browsing and search
- User profile management
- Password management
- Responsive design for mobile access

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/penny-app.git
cd penny-app
```

2. Install dependencies:
```bash
npm install
```

3. Environment Setup:
- Create `.env` file in the api project root
- Configure the following variables:
  ```env
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloudinary_name
  CLOUDINARY_API_KEY=your_cloudinary_key
  CLOUDINARY_API_SECRET=your_cloudinary_secret
  ```

### Running the Application

1. Start the API server (default port: 3000):
```bash
nx serve backend
```

2. Start the UI development server:
```bash
nx serve ui --port 4200
```

3. Access the application:
- Frontend: http://localhost:4200
- API: http://localhost:3000
- Swagger Documentation: http://localhost:3000/docs

## Development

### Project Structure
```
penny-app/
├── apps/
│   ├── backend/     # NestJS backend
│   └── ui/          # Angular frontend
├── shared/          # Shared libraries
└── tools/           # Build and configuration tools

## API Documentation
The API documentation is available through Swagger UI at `/api` when the server is running.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Default Admin Credentials
```
Email: omeradmin@email.com
Password: Test1234
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Built With ❤️ Using
- [Nx](https://nx.dev) - Smart, Fast and Extensible Build System
- [Angular](https://angular.io) - The modern web developer's platform
- [NestJS](https://nestjs.com) - A progressive Node.js framework
- [MongoDB](https://www.mongodb.com) - The application data platform
- [NgRx](https://ngrx.io) - Reactive State for Angular
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@penny-app/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.






## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.


