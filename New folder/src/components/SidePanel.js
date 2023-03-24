import PlacesList from "./PlacesList";
import AddPlace from "./AddPlace";
import LoginForm from "./LoginForm";
import Logout from "./Logout";

const SidePanel = ({addPlaceLatLon,onItemClick,places,loggedInUser,setMessage,setListChange}) => {
   const style={
      width:"300px",
      backgroundColor: "grey",
      marginRight: "0px"
   }
   return (
      <div style={style}>
         {loggedInUser.token 
            ? <Logout setMessage={setMessage}></Logout>
            : <LoginForm setMessage={setMessage}></LoginForm>
         }
         <PlacesList places={places} 
            setMessage={setMessage}
            loggedInUser={loggedInUser}
            setListChange={setListChange}
            onItemClick={onItemClick}></PlacesList>
            
         {loggedInUser.token && 
            <AddPlace
               latLon={addPlaceLatLon}
               loggedInUser={loggedInUser}
               setMessage={setMessage}
               setListChange={setListChange}></AddPlace>
         }
      </div>
   )
}

export default SidePanel;