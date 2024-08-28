import { Header } from "../../ui_components/Header";
import { TasksPage } from "../../ui_components/tasks/TaskPage";

export default function Home() {

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="mx-auto w-full max-w-[80%]">
        <TasksPage />
      </main>
    </>
  );
}
