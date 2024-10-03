import { DragDropContext } from "@hello-pangea/dnd";
import { List } from "@mui/material";
import TaskList from "./TaskList";

export default function Board({ groupedTasks, setTasks }) {
  // const statuses = ["todo", "in-progress", "done"];
  // const groupedTasks = statuses.map((status) => ({
  //   status,
  //   tasks: tasks
  //     .map((task, index) => {
  //       task.index = index;
  //       return task;
  //     })
  //     .filter((task) => task.status === status),
  // }));

  const onDragEnd = (result) => {
    console.log("Drag End:", result, groupedTasks);

    const { destination, source } = result;

    // If dropped outside a droppable area
    if (!destination) {
      return;
    }
    // If the task is dropped in the same location
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const updatedTasks = { ...groupedTasks };
    const [movedTask] = updatedTasks[source.droppableId].tasks.splice(source.index, 1);

    // Change status if dropped in a different column
    movedTask.status = destination.droppableId;

    // Insert the task into the new position
    updatedTasks[destination.droppableId].tasks.splice(destination.index, 0, movedTask);

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
        {Object.values(groupedTasks).map(({ status, tasks }) => (
          <TaskList key={status} status={status} tasks={tasks} />
        ))}
      </List>
    </DragDropContext>
  );
}
