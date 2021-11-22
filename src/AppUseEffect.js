import { useState } from "react";
import { useEffect } from "react";

const App = () => {

  const [adviceSlip, setAdviceSlip] = useState("")
  const [error, setError] = useState(
    {
      error:false,
      message: ""
    }
  )

  const handler = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice")
      console.log(response)
      if(response.status !== 200){
        throw new Error("oops")
      }
      const data = await response.json()
      console.log(data)
      setAdviceSlip(data.slip)
    }
    catch(err) {
      setError({ error:true, message: error.message})
    }
}

useEffect (() => {
    handler();
},[]);

    if(error.error){
      return <h1>{error.message}</h1>
    }
  
  return (
    <div>
      <h1>advice</h1>
      <p>advice: {adviceSlip.advice}</p>
      <button onClick={handler}>get data</button>
    </div>
  );
};
export default App;
