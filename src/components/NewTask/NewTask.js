import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: postTask } = useHttp();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const enterTaskHandler = async (taskText) => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       "https://react-http-6b4a6.firebaseio.com/tasks.json",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Request failed!");
  //     }

  //     const data = await response.json();

  const enterTaskHandler = async (taskText) => {
    postTask(
      {
        url: "https://react-http-d1fb6-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      generateNewTask.bind(null, taskText)
    );
  };

  function generateNewTask(taskText, data) {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
