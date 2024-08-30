import { Header } from "../../ui_components/Header";
import { TasksPage } from "../../ui_components/tasks/TaskPage";

export default function Home() {
  return (
    <div className="mx-auto w-full  lg:w-[400px]">
      <header>
        <Header />
      </header>
      <main className="h-full">
        <TasksPage />
      </main>
    </div>
  );
}
