# Neema DAO Backend

Backend API for the Neema DAO food waste reduction platform.

## Setup

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env` file based on `.env.example`
4. Run migrations:
   \`\`\`
   npm run migrate
   \`\`\`
5. Seed the database:
   \`\`\`
   npm run seed
   \`\`\`
6. Start the server:
   \`\`\`
   npm run dev
   \`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/badges` - Get user badges
- `GET /api/users/:id/projects` - Get user projects
- `GET /api/users/:id/inventory` - Get user inventory
- `GET /api/users/:id/waste-logs` - Get user waste logs

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/vote` - Vote for a project
- `POST /api/projects/:id/fund` - Fund a project

### Inventory
- `GET /api/inventory` - Get all inventory items
- `GET /api/inventory/:id` - Get inventory item by ID
- `POST /api/inventory` - Create inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item
- `GET /api/inventory/suggestions` - Get inventory suggestions

### Waste Logs
- `GET /api/waste-logs` - Get all waste logs
- `GET /api/waste-logs/:id` - Get waste log by ID
- `POST /api/waste-logs` - Create waste log
- `PUT /api/waste-logs/:id` - Update waste log
- `DELETE /api/waste-logs/:id` - Delete waste log
- `GET /api/waste-logs/analytics` - Get waste analytics

### Badges
- `GET /api/badges` - Get all badges
- `GET /api/badges/:id` - Get badge by ID
- `POST /api/badges` - Create badge
- `PUT /api/badges/:id` - Update badge
- `DELETE /api/badges/:id` - Delete badge
- `POST /api/badges/:id/award/:userId` - Award badge to user
