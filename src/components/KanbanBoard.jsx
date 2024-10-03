import { DragDropContext } from "@hello-pangea/dnd";
import { List } from "@mui/material";
import TaskList from "./TaskList";

export default function Board({ tasks, setTasks }) {
  const statuses = ["todo", "in-progress", "done"];
  const groupedTasks = statuses.map((status) => ({
    status,
    tasks: tasks
      .map((task, index) => {
        task.index = index;
        return task;
      })
      .filter((task) => task.status === status),
  }));

  const onDragEnd = (result) => {
    console.log("Drag End:", result, tasks);

    const { destination, source } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }
    // If the task is dropped in the same location
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    console.log("updatedTasks:", updatedTasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    console.log("movedTask:", movedTask, updatedTasks);

    // Change status if dropped in a different column
    movedTask.status = destination.droppableId;

    // Insert the task into the new position
    updatedTasks.splice(destination.index, 0, movedTask);

    // Update the tasks in state
    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  );
}
