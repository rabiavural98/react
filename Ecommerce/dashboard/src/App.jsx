import Router from "./router/Router";
import {useEffect, useState} from "react";
import publicRoutes from "./router/routes/publicRoutes";
import {getRoutes} from "./router/routes";


function App() {
    const [allRoutes,setAllRoutes]=useState([...publicRoutes])
   // console.log(allRoutes)
    
    useEffect(()=>{
        const routes=getRoutes()
        setAllRoutes([...allRoutes,routes])
    },[])
    // console.log(routes)
    return <Router allRoutes={allRoutes}/>
}

export default App;
