
export default function Loading({title}) {

    return ( <>
    
            <div className="overlay" style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                            <div class="spinner-rotating-gear">
              
            </div>
            {title}
 
            </div>
   </> )

}