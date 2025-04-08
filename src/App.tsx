import { ThemeToggle } from "./ThemeToggle";

function App() {
  return (
    <div>
      <ThemeToggle />
      <div className="bg-light-blue text-dark-blue dark:bg-dark-blue dark:text-light-blue red:bg-dark-red red:text-light-red flex min-h-dvh flex-col items-center justify-center gap-8 p-4 text-xl">
        <Box title="User data" />
        <Box title="Admin data" />
        <Box title="Hello this is looooooong data" />
      </div>
    </div>
  );
}

function Box({ title }: { title: string }) {
  return (
    <div
      data-title={title}
      className="after:bg-light-blue dark:after:bg-dark-blue red:after:bg-dark-red relative max-w-120 rounded-sm border-2 p-4 after:absolute after:top-0 after:right-0 after:-translate-x-4 after:-translate-y-1/2 after:px-2 after:content-[attr(data-title)] even:text-pretty"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
      officiis eligendi ex minima delectus fuga quo voluptates ullam harum
      deleniti?
    </div>
  );
}

export default App;
