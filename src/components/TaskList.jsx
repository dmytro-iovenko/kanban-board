import React from "react";
import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";
import * as Colors from '@mui/material/colors';

export default function TaskList({ id, category, tasks, categoryColor }) {
  const color = categoryColor.split("-")[0];
  const bgColor = Colors[color][100]
  const bdColor = Colors[color][900]

  return (
    <Paper
      component="li"
      sx={{
        border: `2px solid ${bdColor}`,
        borderRadius: 2,
        p: 2,
        listStyle: "none",
        backgroundColor: bgColor,
      }}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Stack direction="row" spacing={1}>
          <Typography variant="h6" sx={{ color: bdColor }}>
            {category}
          </Typography>
          <Chip label={tasks.length} sx={{ backgroundColor: bdColor, color: bgColor }} />
        </Stack>
        <Divider component="div" sx={{ my: 2, borderColor: bdColor }} />
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
