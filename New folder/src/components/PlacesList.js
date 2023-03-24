import ListItem from "./ListItem";

const PlacesList = ({onItemClick, places, setMessage, loggedInUser, setListChange}) => {
   

   const deleteSelectedPlace = (ID) => {
      fetch("http://localhost:3001/api/places/" + ID, {
         method: "DELETE",
         headers: {
            Authorization: "Bearer " + loggedInUser.token, //localStorage.getItem("token")
         },
      })
         .then((response) => {
            if (!response.ok) {
               throw Error(response.status);
            }
            return response.json();
         })
         .then((data) => {
            setMessage(data.Name + " was deleted.");
            setListChange(data);
            
         })
         .catch((err) => {
            setMessage("Some error happened");
            console.log(err);
         });
   };

   // Final Assignment: Reimplement the new delete functionality
   return (
      <>
         {places.length !== 0 && (
            places.map(p => 
               <ListItem info={p} key={p.ID} loggedInUser={loggedInUser}
               deleteSelectedPlace={deleteSelectedPlace}
               onClick={onItemClick}></ListItem>
            )
         )}

         <br />
      </>
   );
};

export default PlacesList;
