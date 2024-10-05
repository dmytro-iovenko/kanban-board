import React from "react";
import { Chip, Typography, Avatar, Box, Tooltip } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import * as taskItemHelper from "../helpers/taskItemHelper";

const typeColors = {
  bug: "#ff4d4f",
  feature: "#52c41a",
  default: "#1890ff",
};

const priorityColors = {
  high: "error",
  medium: "info",
  low: "success",
  default: "secondary",
};

export default function TaskItem({ task, index }) {
  const priorityColor = priorityColors[task.priority] || priorityColors.default;
  const typeColor = typeColors[task.type] || typeColors.default;
  const description = taskItemHelper.parseJsonAndJoinParagraphs(task.fields.description);

  // console.log("task", task);
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 1,
            p: 2,
            mb: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
            "&:hover": {
              boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            },
            borderLeft: `5px solid ${typeColor}`,
          }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Chip variant="outlined" color={priorityColor} size="small" label={task.fields.priority.name} />
            <Typography variant="body2" color="textSecondary" align="right">
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }).format(new Date())}
            </Typography>
          </Box>
          <Typography variant="subtitle1">{task.fields.summary}</Typography>
          <Typography variant="body2" gutterBottom>
            {description}
          </Typography>
          <Box display="flex" alignItems="center">
            <Tooltip title={task.fields.assignee.displayName}>
              <Avatar
                alt={task.fields.assignee.displayName}
                src={task.fields.assignee.avatarUrls["32x32"]}
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1,
                }}>
              </Avatar>
            </Tooltip>
            <Typography variant="body2" color="textSecondary">
              {task.fields.issuetype.name} - {task.key}
            </Typography>
          </Box>
        </Box>
      )}
    </Draggable>
  );
}
