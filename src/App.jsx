import React, { useState } from "react";
import initialTasks from "./data/initialData";
import KanbanBoard from "./components/KanbanBoard";
import { Box } from "@mui/material";

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <Box p={3}>
      <KanbanBoard tasks={tasks} setTasks={setTasks} />
    </Box>
  );
};

export default App;
