import React, { useEffect, useState } from "react";
import initialTasks from "./data/initialData";
import KanbanBoard from "./components/KanbanBoard";
import { Box } from "@mui/material";

const JIRA_API_URL = import.meta.env.VITE_JIRA_API_URL;
const JIRA_BASIC_AUTH = import.meta.env.VITE_JIRA_BASIC_AUTH;
const CORS_ANYWHERE_URL = import.meta.env.VITE_CORS_ANYWHERE_URL;

const App = () => {
  const statuses = ["todo", "in-progress", "done"];
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = { status, tasks: initialTasks.filter((task) => task.status === status) };
    return acc;
  }, {});
  console.log(groupedTasks);
  const [tasks, setTasks] = useState(groupedTasks);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const url = `${CORS_ANYWHERE_URL}/${JIRA_API_URL}/search?jql=project=S3&maxResults=1000`;
      console.log(url);
      const response =
        isMounted &&
        (await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Basic ${JIRA_BASIC_AUTH}`,
            "Content-Type": "application/json",
            Origin: "http://localhost:5174",
            "X-Requested-With": "XMLHttpRequest",
          },
        }));
      const data = isMounted && (await response.json());
      isMounted && console.log(data);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box p={3}>
      <KanbanBoard groupedTasks={tasks} setTasks={setTasks} />
    </Box>
  );
};

export default App;
