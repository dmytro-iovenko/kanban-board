import React, { useState } from "react";
import initialTasks from "./data/initialData";
import KanbanBoard from "./components/KanbanBoard";
import { Box } from "@mui/material";

const App = () => {
  const statuses = ["todo", "in-progress", "done"];
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = { status, tasks: initialTasks.filter((task) => task.status === status) };
    return acc;
  }, {});
  console.log(groupedTasks);
  const [tasks, setTasks] = useState(groupedTasks);

  return (
    <Box p={3}>
      <KanbanBoard groupedTasks={tasks} setTasks={setTasks} />
    </Box>
  );
};

export default App;
