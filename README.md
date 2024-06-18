# Project Title: Xây dựng website tổng hợp, quản lý khách sạn

### Purpose of the project
This project involves developing a comprehensive website for hotel management, providing a platform for customers to easily access and book rooms while optimizing the hotel's management processes. The website aims to enhance customer experience, streamline hotel operations, and improve competitive capabilities.

## What to prepare
Install mySQL, python, nodejs, reactjs,...
### Technology used
- Programming software: Visual Code Studio

- Web server: XAMPP

- Source code management: Github

- Tool for designing object-oriented design and analysis diagrams: https://app.diagrams.net/
- Front-end construction:

- + Language: HTML, CSS, Javascript

- + Framework: Reactjs, SCSS

- Back-end construction:

- + Language: Javascript

- + Framework: Nodejs

- Database design software: MySQL

- Authentication and authorization: JWT
## How to run
After cloning the project and opening the solution file, you will see the project folder structure like this:
![alt text](imge/image-3.png)
model-controller
![alt text](imge/image-4.png)
View
![alt text](imge/image-5.png)
## Databases
![alt text](imge/image-8.png)
## Usecase diagram
![alt text](imge/image-7.png)

## ALGORITHM ANALYSIS
- Search and filtering algorithm
- Proposed algorithm
- Crawler algorithm
## Features
### Login function
- Admin/User enters login name and password, the system will check the database and then respond to admin/user.
- If there is no account with the corresponding login name and password, the system will report an error of incorrect login name or password.
### Search - booking function
- For clients:
   + Enter personal information, then the system will retrieve the data and display appropriate search results
   + Client can click on the desired result to see detailed information
   + Fill in personal information and press the "Book" button to reserve a room
### Management function
- For admins:
   + Add, delete, edit client/customer
- For clients:
   + Add, delete, edit personal information
   + Add, delete, edit accounts
   + Add, delete, edit booking orders
- For customers:
   + Add, delete, edit businesses
   + Add, delete, edit customers
   + Add, delete, edit booking orders
## Program interface
- Testing various scenarios such as system login, data entry/view, search and statistics functions, and query/report functions.
- Evaluation of the system's performance and user feedback.

### Scenario 1 – Login system
*Figure 1: Login Interface*
![alt text](imge/image-1.png)

### Scenario 2 – Main interface for users

1. Interface for Client
*Figure 2: Main Interface for Client*
![alt text](imge/image-2.png)

2. Interface for Admin
*Figure 3: Main Interface for Admin*
![alt text](imge/image-9.png)

3. Interface for Customer
*Figure 4: Main Interface for Customer*
![alt text](imge/image-10.png)


### Scenario 3 – Search and statistics functions

#### Interface for Client
*Figure 5: Search interface*
![alt text](imge/image-11.png)

*Figure 6: Export search results*
![alt text](imge/image-12.png)

*Figure 7: View hotel booking information*
![alt text](imge/image-13.png)
![alt text](imge/image-14.png)

*Figure 8: Fill in basic information to book a room*
![alt text](imge/image-15.png)

*Figure 9: Pay with momo*
![alt text](imge/image-16.png)

*Figure 10: Send booking results to email*
![alt text](imge/image-17.png)

#### Interface for Admin
*Figure 11:User managementn*
![alt text](imge/image-18.png)

*Figure 12:add users*
![alt text](imge/image-19.png)

*Figure 13:Manage roles*
![alt text](imge/image-20.png)

*Figure 14:Manage group*
![alt text](imge/image-21.png)

*Figure 15: Hotel and room management*
![alt text](imge/image-22.png)
![alt text](imge/image-23.png)
create room
![alt text](imge/image-24.png)
*Figure 16:Manage bookings*
![alt text](imge/image-25.png)

*Figure 17:Revenue statistics*
![alt text](imge/image-26.png)


### Interface for Customer
*Figure 18: Hotel and room management*
![alt text](imge/image-22.png)
![alt text](imge/image-23.png)
create room
![alt text](imge/image-24.png)
*Figure 19:Manage bookings*
![alt text](imge/image-25.png)

*Figure 20:Revenue statistics*
![alt text](imge/image-26.png)

