import React from "react";
import TaskItem from "./TaskItem";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

// export default function TaskList({ tasks }) {
//   return (
//     <Paper style={{ margin: "0 10px", padding: "10px" }}>
//       {tasks.map((task) => (
//         <TaskItem key={task.id} task={task} />
//       ))}
//     </Paper>
//   );
// }

const Column = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 300,
  backgroundColor: "#f4f5f7",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  flex: 1,
  mx: 1,
}));

export default function TaskList({ status = "TBD", tasks }) {
  const title = `${status.charAt(0).toUpperCase() + status.slice(1)} (${tasks.length})`;
  return (
    <Column>
      <Typography variant="h6">{title}</Typography>
      <Box mt={2}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Box>
    </Column>
  );
}
