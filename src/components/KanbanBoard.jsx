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

    // Create a deep copy of groupedTasks to avoid direct state mutation
    const updatedTasks = groupedTasks.map(column => ({
      ...column,
      tasks: [...column.tasks]
    }));

    // Find the source and destination columns
    const sourceColumn = updatedTasks.find(col => col.id === source.droppableId);
    const destinationColumn = updatedTasks.find(col => col.id === destination.droppableId);

    // Remove the task from the source column
    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

    // Update the status of the moved task
    movedTask.fields.status.statusCategory.id = destination.droppableId;

    // Insert the task into the destination column
    destinationColumn.tasks.splice(destination.index, 0, movedTask);

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
        {groupedTasks.map(({ id, category, tasks }) => (
          <TaskList key={id} id={id} category={category} tasks={tasks} />
        ))}
      </List>
    </DragDropContext>
  );
}
