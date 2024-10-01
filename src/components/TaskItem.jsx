import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Tooltip } from "@mui/material";

const TaskCard = ({ task }) => {
  return (
    <Card style={{ margin: "5px" }}>
      <CardContent>
        <Typography variant="subtitle1">{task.title}</Typography>
        <Typography variant="body2" gutterBottom>
          {task.description}
        </Typography>
        <Box display="flex" alignItems="center">
          <Tooltip title={task.assignee}>
            <Avatar style={{ marginRight: "10px" }}>{task.assignee[0]}</Avatar>
          </Tooltip>
          <Typography variant="body2" color="textSecondary">
            {task.type} - {task.priority} priority - {task.status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
