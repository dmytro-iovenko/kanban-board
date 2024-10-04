import React, { useEffect, useState } from "react";
// import initialTasks from "./data/initialData";
import KanbanBoard from "./components/KanbanBoard";
import { Box } from "@mui/material";
import * as JiraAPI from "./data/JiraAPI";

const App = () => {
  // const statuses = ["todo", "in-progress", "done"];
  const [statuses, setStatuses] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!isMounted) return;

      const initialTasks = await JiraAPI.getTasks("SBA320H");
      console.log("initial tasks:", initialTasks);

      const statuses = await JiraAPI.getStatuses();
      console.log("statuses:", statuses);
      setStatuses(statuses);

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
