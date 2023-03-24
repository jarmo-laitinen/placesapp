import TrashButton from "./TrashButton";

const ListItem = ({onClick,info,loggedInUser,setSelectedPlace, deleteSelectedPlace}) => {
   const style={
      backgroundColor:"chocolate",
      color:"white",
      margin:"2px",
      borderRadius:"5px",
      paddingLeft:"5px",
      paddingRight:"5px",
      height:"30px",
      width:"100%"
   }
   const styleRow={
      width:"90%"
   }
   const deleter=()=>{
      deleteSelectedPlace(info.ID)

   }
   // Final Assignment: Complete the new delete functionality
   return (
      <table style={style}>
         <tbody>
            <tr>
               <td onClick={()=>onClick(info.ID)} style={styleRow}>{info.UserName}'s {info.Name}</td>
               <td>{
                  loggedInUser.id===info.UserID &&
                  <TrashButton onClick={deleter}></TrashButton>
               }
               </td>
            </tr>
         </tbody>
      </table>

   )
}

export default ListItem;

