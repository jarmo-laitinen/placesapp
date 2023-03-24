import React, {useState, useEffect} from "react";
import Map from "./components/Map";
import SidePanel from "./components/SidePanel";
import StatusMessage from "./components/StatusMessage";
import TopBanner from "./components/TopBanner";

/*
Extra task 1: Pass a prop to the map to specify it's height.
Anything goes, as long as you control the layout from one place (The App component)
*/

const App = () => {
   const [message, setMessage] = useState("");
   const [places, setPlaces] = useState([]);
   const [listChange, setListChange] = useState([]);
   const [center, setCenter] = useState([62.6, 29.7]);
   const [addPlaceLatLon, setAddPlaceLatLon] = useState(center);

   const loggedInUser = {
      id: Number(localStorage.getItem("userId")),
      token: localStorage.getItem("token"),
      name: localStorage.getItem("loggedName")
   };

   const style={
      display:"flex",
      margin:"5px",
      marginTop: "0px"
   }

   document.body.style.margin=0;

   const getAllPlaces = () => {
      setMessage("Loading...");
      setTimeout(() => {
         fetch("http://localhost:3001/api/places")
            .then((response) => {
               if (!response.ok) {
                  throw Error(response.status);
               }
               return response.json();
            })
            .then((data) => {
               setPlaces(data);
               setMessage("");
            })
            .catch((err) => {
               setMessage("Some error has happened.");
               console.log(err);
            });
      }, 1000);
   };


   
   useEffect(() => {
      getAllPlaces()
   },[listChange,setListChange]);
   
   const onItemClick=(id)=>{
      const place=places.find(p=>p.ID===id);
      setCenter([place.Latitude,place.Longitude]);
   }

   const onMapPan=(newCenter)=>{
      setCenter(newCenter);
   }

   return (
   <>   
      <TopBanner></TopBanner>
      <div style={style}>
         {message && 
            <StatusMessage message={message} setMessage={setMessage} />
         }

         <br />
         
         <SidePanel addPlaceLatLon={addPlaceLatLon} onItemClick={onItemClick} places={places} loggedInUser={loggedInUser}
          setMessage={setMessage} setListChange={setListChange}></SidePanel>
         <Map onPan={onMapPan} onClick={setAddPlaceLatLon} center={center} places={places}></Map>
      </div>
   </>   
   );
};

export default App;
