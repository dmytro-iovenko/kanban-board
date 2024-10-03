import React, { useState } from "react";
import initialTasks from "./data/initialData";
import KanbanBoard from "./components/KanbanBoard";
import { Box } from "@mui/joy";

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <Box p={3}>
      <KanbanBoard tasks={tasks} />
    </Box>
  );
};

export default App;
