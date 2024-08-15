import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Features/Product/ProductSlice";
import { productsApi } from "./services/ProductsApi";
import { setupListeners } from "@reduxjs/toolkit/query";




const store=configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [productsApi.reducerPath]: productsApi.reducer,
      },
      // Adding the api middleware enables caching, invalidation, polling,
      // and other useful features of `rtk-query`.
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
    })
    
    // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
    // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
    setupListeners(store.dispatch)
export default store