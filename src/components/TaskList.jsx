import React from "react";
import TaskItem from "./TaskItem";
import { Box, Divider, Paper, Typography } from "@mui/material";

export default function TaskList({ status, tasks }) {
  const title = `${status.charAt(0).toUpperCase() + status.slice(1)} (${tasks.length})`;

  return (
    <Paper component="li" variant="outlined" sx={{ borderRadius: "sm", p: 2, listStyle: "none" }}>
      <Typography variant="h6">{title}</Typography>
      <Divider component="div" sx={{ my: 2 }} />
      <Box sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Box>
    </Paper>
  );
}
