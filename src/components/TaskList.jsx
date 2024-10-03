import React from "react";
import TaskItem from "./TaskItem";
import { Box, Divider, Sheet, Typography } from "@mui/joy";

// export default function TaskList({ tasks }) {
//   return (
//     <Paper style={{ margin: "0 10px", padding: "10px" }}>
//       {tasks.map((task) => (
//         <TaskItem key={task.id} task={task} />
//       ))}
//     </Paper>
//   );
// }

export default function TaskList({ status, tasks }) {
  const title = `${status.charAt(0).toUpperCase() + status.slice(1)} (${tasks.length})`;

  return (
    <Sheet component="li" variant="outlined" sx={{ borderRadius: "sm", p: 2, listStyle: "none" }}>
      <Typography variant="h6">{title}</Typography>
      <Divider component="div" sx={{ my: 2 }} />
      <Box sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Box>
    </Sheet>
  );
}
