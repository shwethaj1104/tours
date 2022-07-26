import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
import data from './data'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setLoading] = useState(false);
  const [tours,setTours] = useState([]);

  const removeTour = (id) =>{
    const newTours = tours.filter((tour)=>{
      return tour.id !== id;
    })
    setTours(newTours)
  }

  const fetchTours = async() =>{
    try {
      setLoading(true)
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(true)
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchTours();
  },[])

  if(tours.length !==0){
    return (
      <main>
        {(loading  && tours.length !== 0) ? <Loading /> : <Tours tours={tours} removeTour={removeTour}/>}
      </main>
    )
  }
    
if(tours.length ===0){
  return(
    <main>
      <div className='title'>
        <h2>No Tours Left</h2>
        <button className='btn' onClick={fetchTours}>Refresh</button>
      </div>
    </main>
  )
}
}

export default App
