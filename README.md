# TranslateHub - Professional Translation Services

TranslateHub is a web application for professional translation services, offering document translation and in-person appointment booking.

## Features

- Document translation service with multiple document upload support
- Dynamic pricing based on document type, urgency, and delivery method
- In-person translation appointment booking
- Multilingual support (English, French, Georgian)
- User authentication and dashboard
- Admin panel for managing orders and appointments

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/translatehub.git
cd translatehub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Available Scripts

- `npm run dev` or `npm start`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run serve`: Serve the production build on port 3000
- `npm run setup`: Install dependencies and start the development server
- `npm run clean`: Clean the Vite cache

## Testing the Application

### Regular User

1. Browse the homepage to learn about services
2. Try the document translation service:
   - Select document type, urgency, and delivery method
   - Upload multiple documents
   - See dynamic pricing updates
3. Book an appointment:
   - Select date and time
   - Choose location (office or custom address)
   - Add special instructions
4. Create an account or log in to complete orders

### Admin Access

To access admin features:
- Email: admin@example.com
- Password: any password (e.g., "password123")

Admin features include:
- Managing translation orders
- Managing appointments
- Configuring payment methods

## Technologies Used

- React with TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for styling
- shadcn/ui for UI components
- Zustand for state management

## License

This project is licensed under the MIT License - see the LICENSE file for details.