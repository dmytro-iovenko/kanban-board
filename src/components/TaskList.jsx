import React from "react";
import TaskItem from "./TaskItem";
import { Paper } from "@mui/material";

export default function TaskList({ tasks }) {
  return (
    <Paper style={{ margin: "0 10px", padding: "10px" }}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Paper>
  );
}
