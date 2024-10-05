import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

export default function TaskList({ id, category, tasks }) {
  const title = `${category} (${tasks.length})`;
  return (
    <Paper component="li" variant="outlined" sx={{ borderRadius: 2, p: 2, listStyle: "none" }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Typography variant="h6">{title}</Typography>
        <Divider component="div" sx={{ my: 2 }} />
        <Droppable droppableId={id}>
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ flex: 1 }}>
              {tasks.map((task, index) => (
                <TaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    </Paper>
  );
}
