Medical Chat Application

This repository contains the code for a comprehensive medical chat application developed using React for the frontend and Django for the backend. The application is designed to enhance patient-doctor interactions through a virtual assistant powered by LangChain.

Project Description
NOTE: This project is a medical chat application that allows patients to ask medical questions, receive responses from a virtual assistant, and schedule appointments with doctors. The backend, built with Django, handles data processing, API integrations, and database management.
Features

Virtual Medical Assistant: Powered by LangChain, integrating with PubMed and Arxiv APIs for accurate medical information.
Appointment Scheduling: Seamless booking system for patient-doctor appointments.
Secure Authentication: User authentication and role-based access control.
Chat History: Persistent storage of chat conversations.
Error Handling: Clear feedback mechanisms for user interactions.

Prerequisites

Node.js
Python 3.x
Django
PostgreSQL
React

Clone the repository
Copygit clone [Your Repository URL]
Frontend Setup
Navigate to the frontend directory
Copycd frontend
Install the required packages
Copynpm install
Start the React development server
Copynpm start
Backend Setup
Navigate to the backend directory
Copycd backend
Create a virtual environment
Copypython3 -m venv venv
source venv/bin/activate
Install the required packages
Copypip install -r requirements.txt
Apply migrations and start the Django development server
Copypython manage.py migrate
python manage.py runserver
API Integrations
The application integrates with various APIs to provide accurate medical information:

PubMed API
Arxiv API

Database
PostgreSQL is used for persistent storage of:

User data
Chat history
Appointment information

Running the Project
To run the project, ensure both the frontend and backend servers are running simultaneously.
Copy# In one terminal window, start the React frontend
cd frontend
npm start

# In another terminal window, start the Django backend
cd backend
source venv/bin/activate
python manage.py runserver
References
Django documentation
React documentation
LangChain documentation
PubMed API documentation
Arxiv API documentation
