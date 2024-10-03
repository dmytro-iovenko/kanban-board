import { List } from "@mui/material";
import TaskList from "./TaskList";

export default function Board({ tasks }) {
  const statuses = ["todo", "in-progress", "done"];
  const groupedTasks = statuses.map((status) => ({
    status,
    tasks: tasks.filter((task) => task.status === status),
  }));

  return (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
      }}>
      {groupedTasks.map(({ status, tasks }) => (
        <TaskList key={status} status={status} tasks={tasks} />
      ))}
    </List>
  );
}
