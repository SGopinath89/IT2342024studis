# Studius

Task Management App for Students

## Statement of the Problem or Need

### Project Requestor (Assumption)

*Client Name: ABC Higher Education Institute*

ABC Higher Education Institute is a forward-thinking institution dedicated to empowering its students. They recognize students' challenges in managing their academic workload and are committed to providing innovative solutions. This project aligns perfectly with their vision of fostering student success and creating a more organized and efficient learning environment.

ABC Higher Education Institute students juggle numerous tasks, including coursework, exams, projects, and extracurricular activities. Existing task management tools often lack features specific to academic needs, making it challenging for students to organize their schedules effectively. This can lead to missed deadlines, forgotten assignments, and academic stress.

## Project Deliverables and Beneficiaries

### Objective

To develop a user-friendly web application that empowers students at ABC Higher Education Institute to manage their academic workload efficiently.

### Deliverables

The project will deliver the following key features and functionalities:

- **Task Management Functionality:** Create, edit, and prioritize tasks with due dates and reminders, categorized by course or project.
- **Integrated Timetable:** Allowing for manual input and organization of classes, events, and deadlines within the applications.
- **Academic Tools:** Create and share notes for each course, organize and upload course materials, integrate with online libraries and databases for academic resource search, and facilitate collaborative task management with shared task lists and assignments within study groups.
- **Progress Tracking and Analytics:** Implement a progress tracking system for tasks and assignments, generate reports to visualize progress and identify areas for improvement, and allow students to set personal study goals and track achievements.

### Beneficiaries

Direct beneficiaries of the project include:

- **Students:** Students at ABC Higher Education Institute will benefit from improved organization, time management, and academic performance.
- **Organization:** ABC Higher Education Institute can potentially see improved student retention, academic success rates, and overall student satisfaction.
- **Team Members:** The development team will gain valuable experience in web application development using the MERN stack.
- **Clients and Stakeholders:** Faculty and administrators may benefit from improved student-faculty communication and streamlined access to student progress data.

By providing a comprehensive platform for task and schedule management, the project aims to benefit all stakeholders involved in task execution and project delivery within the organization.

## Related Projects

While Studius is unique to ABC Institute's specific requirements, it draws inspiration from existing task management solutions and industry best practices.

- **System Integration Projects:**
  - Integration with existing ABC Higher Education Institute systems for automatic course information population.
  - Exploration of integration with plagiarism checking services.

- **Process Improvement Initiatives:**
  - Streamlining student task management and study habits.
  - Enhancing communication and collaboration among students.

## Project Assumptions and Constraints

### Assumptions

- ABC Higher Education Institute has an existing system for managing course information.
- Students have access to reliable internet connections and devices to access the web application.
- Users have basic familiarity with web applications and can adapt to the new task management system with minimal training.

### Constraints

- Development timeline and budget will be determined based on further project planning and client requirements.
- Feasibility of certain features may require further investigation and potential adjustments.

## Technologies Used

- **Client:** React.js, Vite.js, TailwindCSS, HeadlessUI, HTML, CSS
- **Backend:** Node.js, Express, MongoDB

## Setting Up

### Frontend

1. Open the folder in the integrated terminal.
2. Type the following command in the terminal and press enter:

    ```
    npm install
    ```
4. Create an env file inside the root directory (`.env`).
5. Open the `.env` file, declare the following environmental variables inside the file, and save it:
    ```
    VITE_APP_FIREBASE_API_KEY={your firebase api key}
    VITE_APP_BASE_URL=http://localhost:{your backend port number}
    ```
6. Type the following command in the terminal to run the frontend:
    ```
    npm run dev
    ```
### Setting up Firebase storage
- **Important**: Since firebase storage is used as the default storage setting up this is a must!!.
- **Important**: firebase.js file already contain the most of the data, as I used it to  test the app. Using the file as it is will not provide functionality to this app through my firebase account. It is adviced to set up your own firebase acount. 

1. Log into the https://console.firebase.google.com using the google account.
2. Create a project named Studius(or any prefered name).
3. Select web app from the get started and follow the steps shown in their.
4. Under the installation command there is the firebase SDK.
5. Copy it and paste it in the 'firebase.js' file in following directory : /Client/src/utils/firebase.js .
6. From the file, copy the apikey and pass it's value as 'VITE_APP_FIREBASE_API_KEY' in .env file.
7. Then replace the apikey value of the firebase.js file with 'import.meta.env.VITE_APP_FIREBASE_API_KRY' .
8. Next from sidebar click on Build > storage. Then click get started and follow its steps.
9. After the Process is done, New entry called "Storage" will appear on  sidebar. Click on it.
10. Under the Storage, head to Rules tab and make following changes : 

    ```
    allow read, write: if true;
    ```

### Backend

1. Open the folder in the integrated terminal.
2. Type the following command in the terminal and press enter:

   ```
    npm install
    ```
4. Create an env file inside the root directory (`.env`).
5. Open the `.env` file, declare the following environmental variables inside the file, and save it:
    ```
    NODE_ENV=development
    MONGODB_URI=your MongoDB database connection URL
    JWT_SECRET=define your secret key for the jwt
    PORT=port number to run the backend
    ADMIN_USERNAME = user name for admin
    ADMIN_PASSWORD = password for admin
    ADMIN_EMAIL = email for admin account (Used for logging).
    ADMIN_REGNUMBER = registration number for admin
    SUPPORTMAIL = email used to provide support for users (For sending password reset requests. keep-in mind that this email will be used by users, so it's better to make a new mail for just this.)
    SUPPORTAPPPASSWORD = google app password (Note: This is not the acount password. How to obtain this password will be list in the below.)
    MAILSERVICE = mail service you will be using (ex: 'gmail', 'yahoo.mail')
    SYSADMINMAIL = system admin mail (This will receive password reset requests from the support mail).
    ```
6. For obtainig app password, first access the manage acount of your selected mail. Then search the term App Passwords. Follow the Link and it will ask for a app name. Provide the appropriate app name and it will automatically generate a app password.
7. Be sure to change the admin details after first run. Above details are only for initialization.
8. Type the following command in the terminal to run the backend:
    ```
    npm start
    ```
- **Important!!** : "PORT" and the port number of the "VITE_APP_BASE_URL" must be the same!
