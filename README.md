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
    ```
6. Be sure to change the admin details after first run. Above details are only for initialization.
7. Type the following command in the terminal to run the backend:
    ```
    npm start
    ```
