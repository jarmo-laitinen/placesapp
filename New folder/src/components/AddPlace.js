import React, {useState} from "react";
import Button from "./Button";
import TextInput from "./TextInput";

const AddPlace = ({latLon, setMessage, loggedInUser,setListChange}) => {
   const [placeName, setPlaceName] = useState("");
   const [placeLatitude, setPlaceLatitude] = useState("");
   const [placeLongitude, setPlaceLongitude] = useState("");
   
   const addPlace = () => {
      if (placeName === "") {
         setMessage("Please enter the place name");
         return;
      }

      const data = {
         name: placeName,
         userId: loggedInUser.id,
         latitude: latLon[0],
         longitude: latLon[1],
      };
      setMessage("Loading...");
      fetch("http://localhost:3001/api/places", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + loggedInUser.token,
         },
         body: JSON.stringify(data),
      })
         .then((response) => {
            if (!response.ok) {
               throw Error(response.status);
            }
            return response.json(data);
         })
         .then((data) => {
            setMessage("New place was added");
            setListChange(data);
            console.log(data);
         })
         .catch((err) => {
            setMessage("Some error has happened. Try again later.");
            console.log(err);
         });

      setPlaceName("");
      setPlaceLatitude("");
      setPlaceLongitude("");
   };

   return (
      <>
         <TextInput
            label="Place Name"
            value={placeName}
            setValue={setPlaceName}></TextInput>
         <br />
         <TextInput
            label="Place Latitude"
            value={placeLatitude}
            setValue={setPlaceLatitude}></TextInput>
         <br />
         <TextInput
            label="Place Longitude"
            value={placeLongitude}
            setValue={setPlaceLongitude}></TextInput>
         <br />

         <Button onClick={addPlace} label="Add Place"></Button>
      </>
   );
};

export default AddPlace;
