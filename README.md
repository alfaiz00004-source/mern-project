# Product Hub MERN App 🚀

A full-stack MERN application for product management with authentication, role-based access control, search, filtering, sorting, and pagination.

Users can register, log in, browse products, update their profile, and admins can create, edit, and delete products.

## ✨ Features

- JWT-based authentication (register/login)
- Protected routes for authenticated users
- Admin-only product management (create, edit, delete)
- Product listing with keyword search
- Category filtering
- Price range filtering
- Sorting and pagination
- User profile view/update
- Backend validation and route guards
- Frontend service-based API calls
- Jest + Supertest backend tests
- Jest + React Testing Library frontend tests
- Seed scripts for products and admin user

## 🧰 Tech Stack

### Frontend

- React 19
- React Router DOM 7
- Vite 8
- Tailwind CSS 4
- Axios
- Jest + React Testing Library

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- CORS
- Jest + Supertest

### Root Tooling

- `concurrently` for running frontend and backend together
- Root scripts for full-stack startup and tests

## 📁 Folder Structure

```bash
full-stack/
├── backend/
│   ├── config/              # DB connection config
│   ├── controllers/         # Route controller logic
│   ├── data/                # Seed data (products)
│   ├── middleware/          # Auth and admin route guards
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── seed/                # Seed scripts (admin/products)
│   ├── __test__/            # Backend API tests
│   ├── server.js            # Express app entrypoint
│   └── .env                 # Backend environment variables
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── context/         # Auth context/provider
│   │   ├── pages/           # App pages
│   │   ├── routes/          # Route guards
│   │   ├── services/        # API service layer
│   │   └── __tests__/       # Frontend tests
│   ├── vite.config.js
│   └── package.json
├── package.json             # Root scripts for running full stack
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- MongoDB (local or Atlas)

### Install dependencies

```bash
git clone <your-repo-url>
cd full-stack
npm install
npm install --prefix backend
npm install --prefix frontend
```

### Configure environment variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### Run the project

From the root directory:

```bash
npm run start:all
```

This starts:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

Run backend or frontend separately:

```bash
npm run dev:backend
npm run start:frontend
```

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |

| `PORT` | No | Backend server port (default: `5000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | JWT signing secret |
| `NODE_ENV` | No | Runtime mode (`development`, `production`, `test`) |

Frontend

No frontend `.env` variables are required currently. The API base URL is configured in `frontend/src/services/api.js`.

## ▶️ Usage

1. Run `npm run start:all`.
2. Open the frontend in your browser.
3. Register or log in.
4. Browse products using search, filters, sort, and pagination.
5. Update your profile on the Profile page.
6. Use an admin account to manage products.

### Seed scripts

From `backend/`:

```bash
node seed/seedProducts.js
node seed/seedAdmin.js
```

Default admin credentials created by the seed script:

- Email: `admin@gmail.com`
- Password: `admin123`

Change these before using in production.

## 🧪 Tests

From the root:

```bash
npm run test:all
```

Or separately:

```bash
npm run test:backend
npm run test:frontend
```

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Auth & User

- `POST /user/register` - Register a new user
- `POST /user/login` - Log in a user
- `GET /user/profile` - Get the logged-in user profile (protected)
- `PUT /user/profile` - Update the logged-in user profile (protected)

### Products

- `GET /products` - Get all products (supports query filters)
- `GET /products/categories` - Get distinct product categories
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (admin only)
- `PUT /products/:id` - Update product (admin only)
- `DELETE /products/:id` - Delete product (admin only)

### Product query params (`GET /products`)

- `page` (number)
- `keyword` (search by product name)
- `category` (exact category)
- `sort` (e.g. `-createdAt`, `price`, `-price`)
- `price_gte` (minimum price)
- `price_lte` (maximum price)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push to your branch
5. Open a Pull Request

## 📄 License

A root `LICENSE` file is not present.

The backend package uses `ISC`, but add a root `LICENSE` file to make the project license explicit.
