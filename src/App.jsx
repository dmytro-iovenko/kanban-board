import React, { useEffect, useState } from "react";
// import initialTasks from "./data/initialData";
import KanbanBoard from "./components/KanbanBoard";
import { Box } from "@mui/material";
import * as JiraAPI from "./data/JiraAPI";

const App = () => {
  // const statuses = ["todo", "in-progress", "done"];
  const [statuses, setStatuses] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Function to create a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    let isMounted = true;
    (async () => {
      // Micro-delay before fetch to prevent StrictMode to fetch twice
      await delay(0);
      if (!isMounted) return;

      const initialTasks = await JiraAPI.getTasks("SBA320H");
      console.log("initial tasks:", initialTasks);

      const statuses = await JiraAPI.getStatuses();
      console.log("statuses:", statuses);
      setStatuses(statuses);

      const groupedTasks = statuses.reduce((acc, status) => {
        acc[status.id] = { status: status.name, tasks: initialTasks.filter((task) => task.fields.status.id === status.id) };
        return acc;
      }, {});
      console.log("groupedTasks:", groupedTasks);
      setTasks(groupedTasks);
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
