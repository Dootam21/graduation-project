import { combineReducers } from 'redux';

// import getCurrentWeatherReducers from './getCurrentWeatherReducers';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import supplierReducer from './supplierReducer';
import colorReducer from './colorReducer';
import sizeReducer from './sizeReducer';
import hangReducer from './hangReducer';
import cartReducer from './cartReducer';
import customerReducer from './customerReducer';
import accountReducer from './accountReducer';
import kiemkhoReducer from './kiemkhoReducer';
import thuchiReducer from './thuchiReducer';


const appReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    supplier: supplierReducer,
    color: colorReducer,
    size: sizeReducer,
    hang: hangReducer,
    cart: cartReducer,
    customer: customerReducer,
    admin: accountReducer,
    kiemkho: kiemkhoReducer,
    thuchi: thuchiReducer,
});


export default appReducer;
