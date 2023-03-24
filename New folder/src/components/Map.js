import "leaflet/dist/leaflet.css";
import {MapContainer,TileLayer,useMap,useMapEvent} from "react-leaflet";
import PlaceMarker from "./PlaceMarker";

/*
Extra task 1: Pass a prop to the map to specify it's height
*/
const Map = ({places,center,onClick,onPan}) => {
   const style={
      height:'calc(100vh - 60px)',
      width:'calc(100vw - 300px)',
      marginLeft:'0px'
   }

   const MapMover=()=>{
      const map = useMap();
      map.flyTo(center);
   }

   function MyComponent() {
      const map = useMap();
      /*
      useMapEvent('click', (evt) => {
         //map.flyTo([evt.latlng.lat, evt.latlng.lng])
         onClick([evt.latlng.lat, evt.latlng.lng])
      })
      */
      useMapEvent('moveend', (evt) => {
         const center=map.getCenter()
         onClick([center.lat,center.lng])
         onPan([center.lat,center.lng]);
      })
      return null;
   }

   return (
      <MapContainer style={style}
         center={center} zoom={13}>
         <MapMover />
         <MyComponent />
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {
            places.map(p =>
               <PlaceMarker info={p} key={p.ID}></PlaceMarker>
            )
         }
      </MapContainer>
   )
}

export default Map;