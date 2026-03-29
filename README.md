# Product Hub MERN App 🚀

A full-stack MERN-style product management application with authentication, role-based access control, and product catalog management.

Users can register, log in, browse products with search/filter/sort/pagination, and manage their profile. Admin users can create, update, and delete products.

## ✨ Features

- JWT-based authentication (register/login)
- Protected routes for authenticated users
- Admin-only product management (create, edit, delete)
- Product listing with keyword search
- Product listing with category filtering
- Product listing with price range filtering
- Product listing with sorting
- Product listing with pagination
- User profile view/update
- Request validation on backend using `express-validator`
- Reusable frontend API/request/error handling utilities
- Jest + Supertest backend API tests
- Jest + React Testing Library frontend test setup
- Optional data seeding scripts for products and admin account

## 🧰 Tech Stack

### Frontend

- React 19
- React Router DOM 7
- Vite 8
- Tailwind CSS 4
- Axios
- React Hook Form + Yup
- Jest + React Testing Library

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcryptjs`
- `express-validator`
- CORS
- Jest + Supertest

### Monorepo Tooling

- npm workspaces-style orchestration via root scripts
- `concurrently` for running frontend and backend together

## 📁 Folder Structure

```bash
full-stack/
├── backend/
│   ├── config/              # DB connection config
│   ├── controllers/         # Route controller logic
│   ├── data/                # Seed data (products)
│   ├── middleware/          # Auth, admin, validation, error handlers
│   ├── models/              # Mongoose schemas (User, Product)
│   ├── routes/              # API route definitions
│   ├── seed/                # Seed scripts (admin/products)
│   ├── utils/               # Helpers (async handler, API features)
│   ├── validators/          # express-validator rules
│   ├── __test__/            # Backend API tests
│   ├── server.js            # Express app entrypoint
│   └── .env                 # Backend environment variables
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # UI/layout/product/common components
│   │   ├── context/         # Auth context/provider
│   │   ├── hooks/           # Custom hooks (auth/user/product/debounce)
│   │   ├── pages/           # App pages
│   │   ├── routes/          # Route guards (public/protected/admin)
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Request + error helpers
│   │   └── __tests__/       # Frontend test(s)
│   ├── vite.config.js
│   └── package.json
├── package.json             # Root scripts for running full stack
└── README.md
```

## ⚙️ Installation & Setup

### 1. Prerequisites

- Node.js 18+ (recommended)
- npm 9+
- MongoDB database (local or Atlas)

### 2. Clone and install dependencies

```bash
git clone <your-repo-url>
cd full-stack

npm install
npm install --prefix backend
npm install --prefix frontend
```

### 3. Configure environment variables

Create/update `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Important: If your current `.env` contains real credentials, rotate them and use new secrets.

### 4. Run the project

From project root:

```bash
npm run start:all
```

This starts:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173` (default Vite dev port)

You can also run them separately:

```bash
npm run dev:backend
npm run start:frontend
```

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Backend server port (default: `5000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret used to sign/verify JWT tokens |
| `NODE_ENV` | No | Runtime mode (`development`, `production`, `test`) |

### Frontend

No frontend `.env` variable is required currently. API base URL is hardcoded in `frontend/src/services/api.js` as `http://localhost:5000/api`.

## ▶️ Usage Instructions

1. Start both apps with `npm run start:all`.
2. Open the frontend in your browser.
3. Register a user account or log in.
4. Browse products and use search/filter/sort/pagination controls.
5. Update your profile from the Profile page.
6. For admin actions (create/edit/delete products), log in with a user whose role is `admin`.

### Optional seed scripts

From `backend/`:

```bash
# Seed sample products
node seed/seedProducts.js

# Create default admin user
node seed/seedAdmin.js
```

Default admin created by script:

- Email: `admin@gmail.com`
- Password: `admin123`

Change these credentials before production use.

## 🧪 Running Tests

From root:

```bash
npm run test:all
```

Or individually:

```bash
npm run test:backend
npm run test:frontend
```

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Auth & User

- `POST /user/register` - Register a new user
- `POST /user/login` - Login user
- `GET /user/profile` - Get logged-in user profile (protected)
- `PUT /user/profile` - Update logged-in user profile (protected)

### Products

- `GET /products` - Get all products (supports query filters)
- `GET /products/categories` - Get distinct product categories
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (protected + admin)
- `PUT /products/:id` - Update product (protected + admin)
- `DELETE /products/:id` - Delete product (protected + admin)

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
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📄 License

No root license file is currently present.

Backend `package.json` declares `ISC`, but you should add a root `LICENSE` file to clearly define project-wide licensing.
