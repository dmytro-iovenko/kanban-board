import React, { useEffect, useState } from "react";
// import initialTasks from "./data/initialData";
import KanbanBoard from "./components/KanbanBoard";
import { Box } from "@mui/material";
import * as JiraAPI from "./data/JiraAPI";

// Define the order of columns
const STATUS_CATEGORY_ORDER = ["To Do", "In Progress", "Done"];

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

      // group tasks into array with unique statusCategory data
      const groupedTasks = Array.from(new Set(statuses.map((status) => status.statusCategory.id))).map((id) => {
        const status = statuses.find((status) => status.statusCategory.id === id);
        return {
          id: status.statusCategory.id.toString(),
          category: status.statusCategory.name,
          colorName: status.statusCategory.colorName,
          tasks: initialTasks.filter((task) => task.fields.status.statusCategory.id === status.statusCategory.id),
        };
      });

      // sort the status categories based on the defined order
      groupedTasks.sort((a, b) => {
        return STATUS_CATEGORY_ORDER.indexOf(a.category) - STATUS_CATEGORY_ORDER.indexOf(b.category);
      });

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
