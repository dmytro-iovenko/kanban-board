import React from "react";
import { Chip, Typography, Avatar, Box, Tooltip } from "@mui/material";
import { styled } from "@mui/system";

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(4),
  height: theme.spacing(4),
  marginRight: theme.spacing(1),
}));

const TaskCard = styled(Box)(({ theme, type }) => ({
  backgroundColor: "#ffffff",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  "&:hover": {
    boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
  },
  borderLeft: `5px solid ${type === "bug" ? "#ff4d4f" : type === "feature" ? "#52c41a" : "#1890ff"}`,
}));

export default function TaskItem({ task }) {
  const priorityColor = task.priority === "high" ? "error" : task.priority === "low" ? "success" : "info";

  return (
    <TaskCard type={task.type}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Chip variant="outlined" color={priorityColor} size="small" label={task.priority} />
        <Typography variant="body2" color="textSecondary" align="right">
          {new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(new Date())}
        </Typography>
      </Box>
      <Typography variant="subtitle1">{task.title}</Typography>
      <Typography variant="body2" gutterBottom>
        {task.description}
      </Typography>
      <Box display="flex" alignItems="center">
        <Tooltip title={task.assignee}>
          <UserAvatar>{task.assignee[0]}</UserAvatar>
        </Tooltip>
        <Typography variant="body2" color="textSecondary">
          {task.type} - {task.status}
        </Typography>
      </Box>
    </TaskCard>
  );
}
