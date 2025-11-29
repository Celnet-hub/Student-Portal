# Student Portal

A web application that provides students with a dashboard to register courses, view results, and manage course registration status. The project uses a React frontend and a Django backend.

- Frontend: React (Create React App)
- Backend: Django (Python)

## Key Features

- Student dashboard with personalized information.
- Course registration:
  - Displays only the courses relevant to a student for the current semester (core courses, GST, electives, and outstanding courses).
  - Hides lower-level courses that the student has already passed.
  - Shows lower-level core courses that the student has not yet passed.
- View academic results.
- View approved and unapproved course registrations.
- Edit unapproved course registrations.

## Requirements

- Node.js and npm (for frontend)
- Python 3.8+ and pip (for backend)
- virtualenv or venv for creating an isolated Python environment

## Quick Start

1. Clone the repository
```bash
git clone https://github.com/Celnet-hub/Student-Portal.git
cd Student-Portal
```

2. Frontend (React)
```bash
# From the project root (where package.json is located)
npm install
npm start
```
Open http://localhost:3000 in your browser to view the frontend in development mode.

3. Backend (Django)
```bash
# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate   # Unix / macOS
# On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Apply migrations and create a superuser
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```
The backend will run at http://localhost:8000 by default.

## Configuration

- Use environment variables or a .env file for sensitive settings (e.g., DATABASE_URL, SECRET_KEY).
- Review `settings.py` (or your environment configuration) to confirm database settings, allowed hosts, and static files configuration for production.

## Project Structure (high level)

- frontend/ or root — React application (if present at project root)
- backend/ or project root — Django project files and apps
- requirements.txt — Python dependencies
- package.json — Node dependencies (frontend)

Adjust paths above if your project keeps frontend and backend in separate subdirectories.

## Development & Contribution

- Fork the repository and create a feature branch for your changes.
- Make small, well-scoped commits with descriptive messages.
- Open a pull request describing your change and any setup required to test it.

If you want, I can create a contributor guide, add templates for issues/PRs, or open a PR with this README update.

## Resources

- Create React App: https://create-react-app.dev/
- React: https://reactjs.org/
- Django: https://www.djangoproject.com/

## Contact

For questions or support, open an issue in this repository or contact the maintainers listed on the project.
