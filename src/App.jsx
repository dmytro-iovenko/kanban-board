import React, { useState } from 'react';
import initialTasks from './data/initialData';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div style={{ padding: '20px' }}>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
