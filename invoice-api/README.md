# Invoice API

Lightweight backend for the Invoice tab. It serves invoice data from SQL Server
when `MSSQL_CONNECTION_STRING` is configured, and falls back to mock data when it
is not.

## Quick start

1. Copy `.env.example` to `.env` and fill in values.
2. Install dependencies: `npm install`
3. Start the server: `npm start`

Default port is `4000`.

## Endpoints

- `GET /api/health`
- `GET /api/invoices`
- `GET /api/invoices/:id`
- `PATCH /api/invoices/:id`
- `GET /api/invoices/:id/files`
- `GET /api/invoices/:id/events`
- `GET /api/invoices/:id/comments`
- `POST /api/invoices/:id/comments`
- `GET /api/invoices/:id/jobs`
- `GET /api/jobs/:jobId/details`
- `GET /api/invoices/columns`
