import "./App.css";
import Carousel from "./components/Carousel/Carousel";

function App() {
  return (
    <div className="App">
      <Carousel length={20} imageWidth={200} imageHeight={200} />
    </div>
  );
}

export default App;
