import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const displayTasks = (data) => {
      const loadedTasks = [];

      for (const key in data) {
        loadedTasks.push({ id: key, text: data[key].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://react-http-d1fb6-default-rtdb.firebaseio.com/tasks.json",
      },
      displayTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
