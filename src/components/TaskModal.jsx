import React, { useState } from "react";
import {
  Modal,
  Typography,
  Grid2,
  Avatar,
  Card,
  CardContent,
  Icon,
  IconButton,
  CardHeader,
  Stack,
  Chip,
  Button,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditableText from "./EditableText";

export default function TaskEditModal({ open, onClose, task, priorityColors }) {
  if (!task) return null;

  const { fields } = task;
  const priorityColor = priorityColors[fields.priority.name.toLowerCase()];
  console.log(fields.issuetype.iconUrl);
  return (
    <Modal open={open} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid2 container size={{ xs: 12, md: 10, xl: 6 }} sx={{ overflow: "hidden", maxHeight: "100vh", mx: "auto" }}>
        <Card fullWidth>
          <CardHeader
            avatar={
              <Icon
                sx={{
                  backgroundImage: `url(${fields.issuetype.iconUrl})`,
                  backgroundSize: "cover",
                }}></Icon>
            }
            title={
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">{task.key}</Typography>
                <IconButton onClick={onClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            }
            sx={{
              borderBottom: "1px solid #eee",
            }}
          />
          <CardContent>
            <Grid2 container spacing={2} alignItems="center">
              {/* Status */}
              <Grid2 item size={12}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                  <EditableText initialText={task.fields.summary} variant="h5" sx={{ flex: 1 }} />
                  {/* <Typography variant="h5" sx={{ flex: 1 }}>
                    {task.fields.summary}
                  </Typography> */}
                  <Chip
                    variant="outlined"
                    label={fields.priority.name}
                    icon={
                      <Icon
                        sx={{
                          backgroundImage: `url(${fields.priority.iconUrl})`,
                          backgroundSize: "cover",
                        }}
                      />
                    }
                    sx={{
                      borderRadius: 1,
                      borderColor: priorityColor,
                      backgroundColor: "transparent",
                      color: priorityColor,
                    }}
                  />
                  <Typography variant="body1">{fields.status.name}</Typography>
                </Stack>
              </Grid2>
            </Grid2>
            <Grid2 container sx={{ mt: 2 }}>
              {/* Task Description */}
              <Grid2 item size={12}>
                <Typography fontWeight="bold">Description:</Typography>
                <EditableText
                  // initialText={fields.description?.content[0]?.content.map((item, index) => (
                  //   <span key={index}>{item.text}</span>
                  // ))}
                  initialText={fields.description?.content[0]?.content.map((item) => item.text).join("\n")}
                  // initialText={fields.description?.content[0]?.content.join("\n")}
                  sx={{ mt: 1 }}
                />
                {/* <Typography sx={{ mt: 1 }}>
                  {fields.description?.content[0]?.content.map((item, index) => (
                    <span key={index}>{item.text}</span>
                  ))}
                </Typography> */}
              </Grid2>
              <Grid2 container size={12} spacing={2} sx={{ mt: 5 }}>
                {/* Dates */}
                <Grid2 item size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Create Date:
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {new Date(fields.created).toLocaleString()}
                  </Typography>
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Due Date:
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {fields.duedate ? new Date(fields.duedate).toLocaleString() : "No Due Date"}
                  </Typography>
                </Grid2>
                {/* Assignee Avatar and Name */}
                <Grid2 item size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Assignee:
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={fields.assignee.avatarUrls["32x32"]} alt={fields.assignee.displayName} />
                    <Typography variant="body1">{fields.assignee.displayName}</Typography>
                  </Stack>
                </Grid2>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>
    </Modal>
  );
}
