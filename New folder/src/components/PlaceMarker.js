import {divIcon} from "leaflet";
import {Marker,Popup} from "react-leaflet";

const PlaceMarker = ({info}) =>{

   return(
      <Marker 
         icon={divIcon({
            html:
               `<div style="
                  background-color:brown;
                  width:30px;
                  height:30px;
                  transform:translate(-10px,-10px);
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  color:white;
                  border-radius:50%;
                  ">
               ${info.ID}
               </div>
               `,
            iconAnchor: [6, -7]
         })}
         position={[info.Latitude, info.Longitude]}>
         <Popup>
            {info.UserName}'s {info.Name}
         </Popup>
      </Marker>
   )
}

export default PlaceMarker;