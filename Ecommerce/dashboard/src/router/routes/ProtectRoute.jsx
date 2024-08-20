import React, {Suspense} from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectRoute = ({route,children}) => {
    const {role,userInfo}=useSelector(state=>state.auth)

    if(role) {
        if(userInfo){
            if(userInfo.role===route.role){

      if(route.status==='userInfo.status') {
                return <Suspense fallback={null}>{children}</Suspense>

            }else{
    if(userInfo.status==='pending'){
        return <Navigate to='/seller/account-pending' replace/>
    }else{
        return <Navigate to='/seller/account-deactive' replace/>

    }
}


               // return <Suspense fallback={null}>{children}</Suspense>
            }else{
                if(route.visibility){
                if(route.visibility.some(r=>r===userInfo.status)){
                    return <Suspense fallback={null}>{children}</Suspense>
                }else{
                    return <Navigate to='/seller/account-pending' replace/>

                }
              if(route.visibility.some(r=>r===userInfo.status)){
//                 return <Suspense fallback={null}>{children}</Suspense>
} else{
            return <Navigate to='/seller/account-pending' replace/>

}
              }else{
                return <Suspense fallback={null}>{children}</Suspense>
              }
            }
        }else{
      return <Navigate to='/unauthorized' replace />
         }

    }else{
        return <Navigate to='/login' replace />
    }

};

export default ProtectRoute;