import { useState } from "react";
import { useEffect } from "react";

const App = () => {

  const [beerInfo, setBeerInfo] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    {
      error:false,
      message: ""
    }
  )

  const handler = async () => {
    try {
        setLoading(true);
        const response = await fetch("https://api.punkapi.com/v2/beers/random") 
        console.log("http response", response)
        if(response.status !== 200){
            throw new Error("oops");
        }
        const data = await response.json();
        console.log("API info", data[0]);
        setBeerInfo(data[0]);
        setLoading(false);
    } catch(err) {
        setError({ error:true, message: error.message})
    }
};

useEffect(() => {
    handler();
},[]);

if(error.error){
    return <h1>{error.message}</h1>
}
  
return (
    <div>
        <h1>Please pick me a random Brewdog beer</h1>
        {loading ? (
            <p>loading...</p>
        ) : (
            <>
            <p>Say my name, say my name: {beerInfo.name}</p>
            <p>In a nutshell: {beerInfo.tagline}</p>
            <p>If you really need more: {beerInfo.description}</p>
            <p><img src={beerInfo.image_url} alt={beerInfo.name}/></p>
            <p>ABV: {beerInfo.abv}</p>
            <p>Pair with: {beerInfo.food_pairing}</p>
            </>        
        )}
        <button onClick={handler}>ugh, get a new beer</button>
    </div>
);
};
export default App;





