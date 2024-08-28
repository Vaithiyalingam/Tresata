import { AddTasks } from "./AddTasks";
import TaskList from "./TaskLists";

export const TasksPage = () => {
  return (
    <div className="my-10">
      <AddTasks />
      <div className="mt-10 h-screen">
        <TaskList />
      </div>
    </div>
  );
};
