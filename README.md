# FinTrack — Personal Finance Tracker

FinTrack is a full-stack personal-finance dashboard for recording income and expenses, understanding spending patterns, and exporting transaction data.

## Features

- Secure account registration and login with JSON Web Tokens
- Add and delete income and expense transactions
- Custom transaction categories
- Paginated transaction history
- At-a-glance income, expense, balance, and highest-spend category summaries
- Category breakdown and monthly-trend charts
- CSV transaction export
- Light and dark themes
- Account deletion with associated data cleanup

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Axios, Recharts |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB |
| Authentication | JWT and bcrypt |

## Project structure

```text
.
├── backend/                 # Express API and MongoDB models
│   ├── routes/              # Authentication, transactions, categories, analytics
│   ├── middleware/          # Authentication, validation, error handling
│   └── server.js            # API entry point
└── frontend/                # React application
    └── src/
        ├── components/      # Forms, charts, lists, category UI
        └── pages/           # Login, registration, dashboard
```

## Run locally

### Prerequisites

- Node.js 16 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Configure the API

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Set `backend/.env` with your local values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/finance-tracker
JWT_SECRET=replace_with_a_long_random_secret
PORT=5000
```

Start the API:

```powershell
npm start
```

The API is served at `http://localhost:5000`.

### 2. Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser.

## API overview

All transaction, category, and analytics endpoints require an `Authorization: Bearer <token>` header.

| Area | Endpoints |
| --- | --- |
| Authentication | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/verify`, `DELETE /api/auth/delete` |
| Transactions | `GET/POST /api/transactions`, `DELETE /api/transactions/:id`, `GET /api/transactions/export` |
| Categories | `GET/POST /api/categories` |
| Analytics | `GET /api/analytics/summary` |

## Environment and security

Never commit `backend/.env`: it contains the database connection string and JWT secret. Use `.env.example` as the safe template for collaborators.

## Deploy to Vercel

Deploy the frontend and backend as separate Vercel projects from this repository:

1. Create a MongoDB Atlas cluster and database user, then copy its Node.js connection string.
2. Import this repository in Vercel for the API with `backend` as the **Root Directory**. Add `MONGO_URI`, `JWT_SECRET`, and `CLIENT_ORIGIN` as environment variables.
3. Import the repository a second time for the web app with `frontend` as the **Root Directory**. Add `REACT_APP_API_URL` with the value `https://your-api.vercel.app/api`.
4. Set the backend's `CLIENT_ORIGIN` to the deployed frontend address, then redeploy the backend.

Use the production values for all environment variables. `REACT_APP_API_URL` is compiled into the React build, while `MONGO_URI` and `JWT_SECRET` must remain private backend variables.

## License

This project is available under the [MIT License](LICENSE).
