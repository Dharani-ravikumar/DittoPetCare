
# DittoPetCare – Pet Care & E-Commerce Website

DittoPetCare is a responsive pet care and e-commerce website designed to provide pet owners with a convenient platform to explore pet products, discover pet care services, book appointments, and manage their shopping experience.

## Features

### 1. Home Page
- Attractive and responsive homepage.
- Navigation to all major website sections.
- Featured products and pet care services.
- Interactive animations and modern UI.

### 2. Product Management
- Browse different pet product categories.
- View individual products and available models.
- Product search and category filtering.
- Price and colour filters.
- Product details with images and pricing.
- Pagination for product listings.

### 3. Shopping Cart
- Add products to the shopping cart.
- Increase or decrease product quantities.
- Remove products from the cart.
- View subtotal and cart details.
- Cart data stored using Local Storage.

### 4. Wishlist
- Add and remove favourite products.
- View saved wishlist items.
- Wishlist data stored using Local Storage.

### 5. Pet Care Services
The website provides different pet care services:

- Grooming & Hygiene
- Veterinary Health
- Boarding & Training
- Nutrition & Pet Spa

### 6. Online Booking
- Book pet care services.
- Enter owner and pet details.
- Select preferred service, date, and time.
- Submit booking requests.
- Store booking information using Local Storage.

### 7. Checkout
- Review selected products.
- View order details and subtotal.
- Submit customer and delivery information.
- Store order details locally.
- Clear the cart after order submission.

### 8. Responsive Design
- Desktop, tablet, and mobile-friendly layouts.
- Responsive navigation menu.
- Interactive buttons and animations.
- Consistent design across website pages.

## Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React.js | UI development |
| JavaScript | Application functionality |
| Tailwind CSS | Styling and responsive design |
| Framer Motion | Animations and transitions |
| Lucide React | Icons |
| Local Storage | Store cart, wishlist, bookings, and orders |

## Project Structure

```text
DittoPetCare/
│
├── public/
│   └── images/
│       ├── about/
│       ├── homepages/
│       │   ├── products/
│       │   └── services/
│       ├── products/
│       │   ├── clean-care/
│       │   ├── comfot/
│       │   ├── feeding/
│       │   ├── toy/
│       │   └── walking-safety/
│       └── services/
│           ├── grooming/
│           ├── spa/
│           ├── traning/
│           └── veterinary/
│
├── src/
│   │
│   ├── AllServices/
│   │   ├── AllServices..jsx
│   │   ├── BoardingTraining.jsx
│   │   ├── GroomingHygiene.jsx
│   │   ├── NutritionPetSpa.jsx
│   │   └── VeterinaryHealth.jsx
│   │
│   ├── app/
│   │   ├── about/
│   │   ├── AllServices/
│   │   ├── booking/
│   │   ├── checkout/
│   │   ├── contact/
│   │   ├── product/
│   │   │   └── [slug]/
│   │   ├── products/
│   │   │   └── [category]/
│   │   │       └── [product]/
│   │   ├── service/
│   │   │   ├── all/
│   │   │   ├── BoardingTraining/
│   │   │   ├── grooming-hygiene/
│   │   │   ├── nutrition-pet-spa/
│   │   │   └── veterinary-health/
│   │   ├── service-details/
│   │   │   └── [slug]/
│   │   ├── why-pet-care-matters/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── BookingSection.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Proceed.jsx
│   │   ├── ServiceCategoryNavigation.jsx
│   │   └── WishlistDrawer.jsx
│   │
│   ├── data/
│   │   ├── allServices.js
│   │   ├── products.js
│   │   ├── serviceData.js
│   │   └── products/
│   │       ├── clean-care/
│   │       ├── comfort-sleep/
│   │       ├── feeding-hydration/
│   │       ├── toys/
│   │       └── walking-safety/
│   │
│   └── homepage/
│       ├── AboutSection.jsx
│       ├── ChooseUs.jsx
│       ├── HeroSection.jsx
│       ├── ProductSection.jsx
│       └── ServicesSection.jsx
│
├── package.json
├── package-lock.json
├── next.config.mjs
└── jsconfig.json
```

### 📌 Main Directories

- **public/images:** Stores website images for products, services, and homepage sections.
- **src/app:** Contains Next.js pages and application routes.
- **src/components:** Reusable UI components such as Navbar, Footer, Cart, and Wishlist.
- **src/AllServices:** Contains service category components.
- **src/data:** Stores product and service information.
- **src/homepage:** Contains homepage sections such as Hero, About, Products, and Services.
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### Step 2: Navigate to the Project Folder

```bash
cd dittopetcare
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Open in Browser

```text
http://localhost:3000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build the production application |
| `npm start` | Start production server |
| `npm run lint` | Run linting if configured |

## Data Storage

The current application uses browser Local Storage to maintain:

- Shopping cart items
- Wishlist products
- Pet booking details
- Customer order details

This allows selected information to remain available in the same browser across page refreshes.

## Future Enhancements

- Backend API integration.
- Database integration for products, customers, bookings, and orders.
- Admin dashboard for managing products and bookings.
- Online payment gateway integration.
- Booking confirmation and notification system.
- Customer authentication and profile management.
- Order tracking.

## Project Objective

The main objective of DittoPetCare is to create a user-friendly digital platform that brings pet products and pet care services together in one place, making it easier for pet owners to manage their pets' everyday needs.

---

**Project Name:** DittoPetCare  
**Project Type:** Pet Care & E-Commerce Website  
**Framework:** Next.js  
**Development:** React.js and Tailwind CSS
=======
# DittoPetCare
A responsive pet care website built with Next.js, React, and Tailwind CSS, offering pet products, services, health guidance, grooming, nutrition, and wellness information.

