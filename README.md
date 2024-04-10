# COP4710Project

COP4710 Final Project

## Setup Instructions

### Prerequisites

- Ensure you have `npm` on your system.
- A database created with the instructions as defined in `CreateInstr.sql` in the `sq;_instr` folder.

### Database Configuration

1. Edit the initalization of sequelize in `database.ts` to configure your own PostgreSQL `database_name`, `user`, and `database_password`.
2. Add mock data to your database (you may use some of the insert instructions provided in `InsInstr.sql`).
   </br>**Note**: For adding products, you will need to modify the `shopids`.

### Backend Setup

Navigate to the `express_server` directory (which is the backend part of the project) using your command line, then execute the following commands:

```bash
npm install
npm install nodemon
npm start
```

### Frontend Setup

Navigate to the `webstore_react_app` directory (which is the frontend part of your project) using your command line, then execute the following commands:

```bash
npm install
npm run dev
```

### Key Entry Files

- Start by reading index.ts for the backend.
- For the frontend, begin with App.tsx.
