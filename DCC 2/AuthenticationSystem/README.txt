Dynamic Website


DATABASE SETUP:
Azure Portal → SQL Database → Create
DB Name → authdb
Server → create new
         authentication method: use SQL authentication
	(remember the username and password)
Workload environment: Development
Region → Central India
Pricing → Basic
Next: Networking ->
	Connectivity method: Public endpoint
		Allow Azure services and resources to access this server
		Add current client IP address
Create and Review
Create

Go to database and in the left sidebar click on Query editor(preview)

	Click SQL authentication	
		enter the above rememnered username and password
	Click enter query and create the Users table:
CREATE TABLE Users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  email NVARCHAR(255) UNIQUE,
  password NVARCHAR(255)
);

run query 


BACKEND DEPLOYMENT
Azure → App Services → Create

Runtime → Node.js
OS → Linux

Upload Code

App Service → Environment Variables:
DB_USER=your_user
DB_PASSWORD=your_pass
DB_SERVER=yourserver.database.windows.net
DB_NAME=authdb
JWT_SECRET=mysecret
SCM_DO_BUILD_DURING_DEPLOYMENT=true

Restart App

FRONTEND SETUP

Create Frontend Folder
frontend/
 ├── index.html
 ├── login.html
 ├── register.html
 └── dashboard.html

Use Backend API

Inside HTML:

const API = "https://your-backend.azurewebsites.net";


Azure → Storage Account\

Enable Static Website
Index → index.html
Error → index.html

Upload Files

👉 Container $web

Upload all HTML files

Open Website
