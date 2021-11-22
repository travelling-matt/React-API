// import { useState } from "react";

// const App = () => {

//   const [joke, setJoke] = useState("")

//   const handler = async () => {
//     try {
//       const response = await fetch("https://geek-jokes.sameerkumar.website/api?format=json")
//       const data = await response.json()
//       console.log(data)
//       setJoke(data.joke)
//     }
//     catch(err) {
//       console.log(err)
//     }
//   }
//   return (
//     <div>
//       <h1>Geek-Jokes. From an API so please don't cancel me.</h1>
//       <p>Is this funny? {joke}</p>
//       <button onClick={handler}>get 'joke'</button>
//     </div>
//   );
// };
// export default App;

//NOTES: throw Error passes the error with a value of "oops". message is the default value for error, so further down error is referenced it is Error("value"). catch sets error state to error true and message to "oops"
// import { useState } from "react";

// const App = () => {

//   const [joke, setJoke] = useState("")
//   const [error, setError] = useState(
//     {
//       error:false,
//       message: ""
//     }  
// )

//   const handler = async () => {
//     try {
//       const response = await fetch("https://api.artic.edu/api/v1/arworks/129884")
//       console.log(response)
//       if(response.status !== 200){
//           throw new Error("oops")
//       }
//       const data = await response.json()
//       console.log(data)
//       setJoke(data.joke)
//     }
//     catch(err) {
//       setError({ error:true, message: error.message})
//     }
//     if(error.error){
//         return <h1>{error.message}</h1>
//     }
// } 

//   return (
//     <div>
//       <h1>Geek-Jokes. From an API so please don't cancel me.</h1>
//       <p>Is this funny? {joke}</p>
//       <button onClick={handler}>get 'joke'</button>
//     </div>
//   );
// };
// export default App;

import { useEffect, useState } from "react";
import Advice from './components/Advice'

const App = () => {
  const [adviceSlip, setAdviceSlip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      console.log(response);
      if (response.status !== 200) {
        throw new Error("the error is...its messed up");
      }
      const data = await response.json();
      setAdviceSlip(data.slip);
      setLoading(false);
    } catch (e) {
      setError({ error: true, message: e.message });
    }
  };

  useEffect(() => {
    handler();
  }, []);

  if (error.error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <h1>advice</h1>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Advice advice={adviceSlip.advice} />
          <button onClick={handler}>get data</button>
        </>
      )}
    </div>
  );
};
export default App;