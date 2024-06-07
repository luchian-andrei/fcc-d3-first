import { useEffect, useState } from "react";
import Axis2 from "./components/Axis2";

function App() {
  const [receivedData, setReceivedData] = useState([]);

  const getData = () => {
    try {
      fetch(
        "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => setReceivedData(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Axis2 data={receivedData} />
    </div>
  );
}

export default App;
