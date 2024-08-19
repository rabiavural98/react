// import React, {Suspense} from 'react';
// import {Navigate} from "react-router-dom";
// import {useSelector} from "react-redux";
//
// const ProtectRoute = ({route,children}) => {
//     const {role,userInfo}=useSelector(state=>state.auth)
//    
//     if(role) {
//         if(userInfo){
//             if(userInfo.role===route.role){
//                 return <Suspense fallback={null}>{children}</Suspense>
//             }else{
//                 return <Navigate to='/unauthorized' replace />
//             }
//         }
//            
//     }else{
//         return <Navigate to='/login' replace />
//     }
//   
// };
//
// export default ProtectRoute;