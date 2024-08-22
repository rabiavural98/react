import {authReducer} from "./Reducers/authReducer";
import {categoryReducer} from "./Reducers/categoryReducer";


const rootReducer={
    auth:authReducer.reducer,
    category:categoryReducer.reducer

}
export default rootReducer;