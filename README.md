## 🗂️ Kanban Board Application

### 🌟 Overview

This Kanban Board Application is built using React and Material-UI. It allows users to manage tasks across different categories—To Do, In Progress, and Done—using a drag-and-drop interface.

### 🚀 Features

- **Responsive Layout**: The Kanban board adapts to various screen sizes.
- **Drag-and-Drop Functionality**: Tasks can be easily moved between columns.
- **Dynamic Task Display**: Each task card displays relevant information, including task title, description, priority, and assignee.
- **Filtering Options**: Tasks can be filtered by assigned user.
- **Color-Coding**: Task types and priority levels are visually distinct with color-coding.

## 🌐 Live Preview

You can view a live demo of the Kanban Board Application [here](https://dmytro-iovenko.github.io/kanban-board/).

### ⚙️ Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

### 🔑 Environment Variables

Create a .env file in the root directory with the following properties:

```makefile
VITE_JIRA_API_URL=<your-jira-api-url>
VITE_JIRA_BASIC_AUTH=<your-basic-authentication>
VITE_CORS_ANYWHERE_URL=<your-cors-anywhere-url>
```

### 🌍 CORS-Anywhere

This project uses the CORS-Anywhere script to proxy requests to the JIRA API. Users should have access to this proxy by using a public instance or by installing their own. For more information, visit the [official CORS-Anywhere GitHub repository](https://github.com/Rob--W/cors-anywhere/).

### 🖥️ Usage

Start the development server:

```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the Kanban board in action. 🌐

### 🛠️ Technology Stack
- **React**: Frontend library for building user interfaces.
- **Material-UI**: Component library for React.
- **React Beautiful DND**: Library for drag-and-drop functionality.

### 🤝 Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

### 📋 To Do
Here are some planned functionalities to enhance the application:
- **Task Creation**: Allow users to create new tasks directly within the Kanban board, streamlining the task management process. ➕
- **Task Editing**: Enable users to edit existing tasks, allowing for updates to titles, descriptions, and other details as needed. ✏️
- **Task Deletion**: Provide users with the option to delete tasks from the board, helping to keep the task list organized and relevant. ❌
- **Persisting State**: Implement state persistence so that tasks and their categories are saved, ensuring users don't lose their progress upon refresh. 💾
- **User Authentication**: Introduce user authentication for secure task management, allowing users to have personalized experiences and data. 🔐
- **Error Handling**: Enhance error handling during drag-and-drop operations and task fetching to improve user experience and reliability. ⚠️
