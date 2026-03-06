
# VacationBookingApp

## Overview

VacationBookingApp is a full-stack web application for managing and booking vacation packages. It consists of a Laravel back-end API and a React front-end, allowing users to browse, add, edit, and book vacation packages. The project is structured for easy development, testing, and deployment.

## Project Structure

- **back-end/laravelBackEnd/**: Laravel 12 API server
	- `app/Http/Controllers/`: Main controllers (e.g., VacationPackageController)
	- `app/Models/`: Eloquent models (e.g., VacationPackage, User)
	- `database/migrations/`: Database schema migrations
	- `database/factories/`: Model factories for testing
	- `database/seeders/`: Seed data
	- `routes/api.php`: API endpoints (RESTful)
	- `tests/Feature/`: Pest tests for API endpoints
	- `composer.json`: PHP dependencies
	- `.env.example`: Environment config template
- **front-end/react-front-end/**: React 19 SPA
	- `src/Components/`: Main UI components (VacationPackagesList, Add/Edit/Delete, SinglePage)
	- `src/style/`: CSS styles
	- `cypress/tests/`: Cypress component tests
	- `package.json`: JS dependencies
	- `vite.config.js`: Vite build config

## Features

- Browse vacation packages (list, details)
- Add, edit, delete vacation packages (admin)
- Book vacation packages (user)
- RESTful API (CRUD operations)
- Responsive UI with Bootstrap
- Authentication (Laravel Sanctum)
- Testing: Pest (PHP), Cypress (JS)

## Back-End (Laravel)

- **API Endpoints**: `/api/vacationpackages` (CRUD), `/api/user` (auth)
- **VacationPackageController**: Handles listing, creating, updating, deleting packages
- **Database**: Migration for `vacation_packages` table with fields: id, package_name, description, price, vacation_length, image_url
- **Testing**: Pest tests for all endpoints in `tests/Feature/VacationPackageTest.php`

### Setup
1. Install PHP 8.2+, Composer
2. `cd back-end/laravelBackEnd`
3. `composer install`
4. Copy `.env.example` to `.env` and configure DB
5. `php artisan migrate --seed`
6. `php artisan serve` (default: http://localhost:8000)

### Running Tests
`./vendor/bin/pest`

## Front-End (React)

- **Components**: VacationPackagesList, SinglePage, Add/Edit/DeleteVacationPackage, NavBar
- **API Integration**: Fetches from Laravel API (e.g., `http://localhost:8000/api/vacationpackages`)
- **Styling**: Bootstrap, custom CSS
- **Testing**: Cypress tests for UI components

### Setup
1. Install Node.js 18+
2. `cd front-end/react-front-end`
3. `npm install`
4. `npm run dev` (default: http://localhost:5173)

### Running Tests
`npx cypress open`

## Integration

- Ensure Laravel back-end is running on port 8000
- React front-end fetches API data from back-end
- CORS is configured in Laravel (`config/cors.php`)

## Example API Usage

- **GET** `/api/vacationpackages` — List all packages
- **POST** `/api/vacationpackages` — Create new package
- **PUT** `/api/vacationpackages/{id}` — Update package
- **DELETE** `/api/vacationpackages/{id}` — Delete package

## Testing

- **Back-End**: Pest tests for API endpoints
- **Front-End**: Cypress tests for UI components

## Dependencies

- **Back-End**: Laravel 12, Sanctum, Pest, Faker
- **Front-End**: React 19, Bootstrap, Cypress, Vite

## License

MIT
