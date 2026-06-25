# CRM Backend API

A RESTful CRM Backend API built using Node.js, Express.js, MongoDB, and Mongoose. This project helps manage Sales Agents and Leads with proper validation and structured API endpoints.

## Features

* Create and manage Sales Agents
* Prevent duplicate Sales Agent emails
* Create and manage Leads
* Validate Lead data before saving
* Associate Leads with Sales Agents
* MongoDB integration using Mongoose
* MVC architecture (Models, Controllers, Routes)
* Environment variable support using dotenv

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv
* CORS

## Project Structure

```text
Backend/
│
├── controllers/
│   ├── salesAgent.controller.js
│   └── lead.controller.js
│
├── models/
│   ├── salesAgent.models.js
│   └── leads.model.js
│
├── routes/
│   ├── salesAgent.routes.js
│   └── leads.routes.js
│
├── db/
│   └── db.connect.js
│
├── .env
├── index.js
└── package.json
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGODB=<your-mongodb-connection-string>
PORT=5000
```

Start the server:

```bash
node index.js
```

Server will run on:

```text
http://localhost:5000
```

## API Endpoints

### Sales Agents

#### Create Sales Agent

```http
POST /agent
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Success Response:

```json
{
  "id": "agentId",
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Get All Sales Agents

```http
GET /agent
```

---

### Leads

#### Create Lead

```http
POST /leads
```

Request Body:

```json
{
  "name": "Acme Corp",
  "source": "Referral",
  "salesAgent": "salesAgentId",
  "status": "New",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": "High"
}
```

Success Response:

```json
{
  "_id": "...",
  "name": "Acme Corp",
  "source": "Referral",
  "salesAgent": "...",
  "status": "New",
  "tags": ["High Value", "Follow-up"],
  "timeToClose": 30,
  "priority": "High"
}
```

## Valid Lead Values

### Source

* Website
* Referral
* Cold Call
* Advertisement
* Email
* Other

### Status

* New
* Contacted
* Qualified
* Proposal Sent
* Closed

### Priority

* High
* Medium
* Low

## Error Handling

The API returns appropriate HTTP status codes:

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Invalid Input         |
| 404         | Resource Not Found    |
| 409         | Duplicate Resource    |
| 500         | Internal Server Error |

## Future Enhancements

* Update Sales Agents
* Delete Sales Agents
* Update Leads
* Delete Leads
* Authentication & Authorization
* Dashboard Analytics
* Pagination & Filtering
* Lead Assignment Automation

## Author

Rishav Ghosh
