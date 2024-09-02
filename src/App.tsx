import Calculator from "./components/Calculator";

const App = () => {
  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        background: `linear-gradient(to right bottom, #1F316F, #808D7C)`,
      }}
    >
      <Calculator />
    </div>
  );
};

export default App;
