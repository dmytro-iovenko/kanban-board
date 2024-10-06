import React, { useState } from "react";
import { Chip, Typography, Avatar, Box, Tooltip, Icon, Stack } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";
import * as taskItemHelper from "../helpers/taskItemHelper";
import { makeStyles } from "@mui/styles";
import TaskModal from "./TaskModal";

const typeColors = {
  10000: "#ff4d4f", // Epic
  feature: "#52c41a",
  default: "#1890ff",
};

const priorityColors = {
  highest: "##FF5A35",
  high: "#FF5A35",
  medium: "#FEAC12",
  low: "#2664FE",
  lowest: "#3683FE",
};

export default function TaskItem({ task, index }) {
  const priorityColor = priorityColors[task.fields.priority.name.toLowerCase()];
  const priorityIcon = task.fields.priority.iconUrl;
  const typeIcon = task.fields.issuetype.iconUrl;
  const typeColor = typeColors[task.type] || typeColors.default;
  const description = taskItemHelper.parseJsonAndJoinParagraphs(task.fields.description);
  const dueDate = task.fields.duedate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(task.fields.duedate))
    : "No Due Date";

  // Add state for modal visibility
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Draggable key={task.id} draggableId={task.id} index={index}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={handleOpenModal} // Open modal on click
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
            <Stack direction="row" spacing={1}>
              <Chip size="small" variant="outlined" color="primary" label={task.key} sx={{ borderRadius: 1 }} />
              <Chip
                size="small"
                variant="outlined"
                label={task.fields.priority.name}
                icon={
                  <Icon>
                    <img src={priorityIcon} />
                  </Icon>
                }
                sx={{
                  borderRadius: 1,
                  borderColor: priorityColor,
                  backgroundColor: "transparent",
                  color: priorityColor,
                }}
              />
              <Typography variant="body2" color="textSecondary" align="right" sx={{ flex: 1 }}>
                {dueDate}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ mt: 1 }}>
              <Icon>
                <img src={typeIcon} />
              </Icon>
              <Typography variant="subtitle1">{task.fields.summary}</Typography>
            </Stack>
            <Typography variant="body2" gutterBottom>
              {description}
            </Typography>
            <Stack direction="row" alignItems="center">
              <Avatar
                alt={task.fields.assignee.displayName}
                src={task.fields.assignee.avatarUrls["32x32"]}
                sx={{
                  width: 32,
                  height: 32,
                  mr: 1,
                }}></Avatar>
              <Typography variant="body2" color="textSecondary">
                {task.fields.assignee.displayName}
              </Typography>
            </Stack>
          </Box>
        )}
      </Draggable>
      <TaskModal open={openModal} onClose={handleCloseModal} task={task} priorityColors={priorityColors} />
    </>
  );
}
