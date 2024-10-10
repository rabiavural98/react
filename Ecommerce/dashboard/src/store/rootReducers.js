import {authReducer} from "./Reducers/authReducer";
import {categoryReducer} from "./Reducers/categoryReducer";
import {productReducer} from "./Reducers/productReducer";
import {sellerReducer} from "./Reducers/sellerReducer";


const rootReducer={
    auth:authReducer.reducer,
    category:categoryReducer.reducer,
    product:productReducer.reducer,
    seller:sellerReducer.reducer


}
export default rootReducer;