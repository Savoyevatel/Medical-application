# Medical Chat Application
***
This repository contains the code for a comprehensive medical chat application developed using React for the frontend and Django for the backend. The application is designed to enhance patient-doctor interactions through a virtual assistant powered by LangChain.
***
## Project Description
**_NOTE:_** This project is a medical chat application that allows patients to ask medical questions, receive responses from a virtual assistant, and schedule appointments with doctors. The backend, built with Django, handles data processing, API integrations, and database management. Always seek for medical assistance, do not rely on the information provided here.

### Features

Virtual Medical Assistant: Powered by LangChain, integrating with PubMed and Arxiv APIs for accurate medical information.
Appointment Scheduling: Seamless booking system for patient-doctor appointments.
Secure Authentication: User authentication and role-based access control.
Chat History: Persistent storage of chat conversations.
Error Handling: Clear feedback mechanisms for user interactions.

#### Prerequisites

* Node.js
* Python 3.x
* Django
* PostgreSQL
* React
* Nextjs
* Tailwind
  
### Clone the repository
```
git clone (https://github.com/Savoyevatel/Medical-application)
```
#### Frontend Setup

Navigate to the frontend directory

```
cd backend/frontend/health_frontend
```

Install the required packages
```
npm install
```

Start the React development server
```
npm start
```
#### Backend Setup
Navigate to the backend directory

```
cd medical_chat
```

Create a virtual environment

```
python3 -m venv venv
source venv/bin/activate
```

Install the required packages
```
pip install -r requirements.txt
```

Apply migrations and start the Django development server
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
### API Integrations
The application integrates with various APIs to provide accurate medical information:

* PubMed API
* Arxiv API

### Database
PostgreSQL is used for persistent storage of:
* User data
* Chat history (TODO)
* Appointment information

### Running the Project
To run the project, ensure both the frontend and backend servers are running simultaneously. The React frontend will interact with the Django backend to process user requests and orders.
```
# In one terminal window, start the React frontend
cd frontend
npm start

# In another terminal window, start the Django backend
cd backend
source venv/bin/activate
python manage.py runserver
```

## References
[Django documentation](https://docs.djangoproject.com/en/5.0/)
[React documentation](https://react.dev/reference/react)
[LangChain documentation](https://python.langchain.com/v0.2/docs/introduction/)
[PubMed API documentation](https://www.ncbi.nlm.nih.gov/home/develop/api/)
[Arxiv API documentation](https://info.arxiv.org/help/api/user-manual.html)
