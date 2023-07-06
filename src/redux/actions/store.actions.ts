import { createAction } from "@reduxjs/toolkit";
import { Cart, Category, Product, ProductInCart, StoreFilter } from "../reducers/store.reducer";

export const µStoreInit = createAction('STORE/µStoreInit')
export const µStoreLoadCategories = createAction('STORE/µStoreLoadCategories');
export const µStoreLoadCategoriesSuccessed = createAction<Category[]>('STORE/µStoreLoadCategoriesSuccessed');
export const µStoreLoadCategoriesFailed = createAction('STORE/µStoreLoadCategoriesFailed');
export const µStoreLoadProducts = createAction('STORE/µStoreLoadProducts');
export const µStoreLoadProductsSuccessed = createAction<Product[]>('STORE/µStoreLoadProductsSuccessed');
export const µStoreLoadProductsFailed = createAction('STORE/µStoreLoadProductsFailed');
export const µStoreLoadCartRequest = createAction('STORE/µStoreLoadCartRequest');
export const µStoreLoadCartSuccessed = createAction<Cart | undefined>('STORE/µStoreLoadCartSuccessed');
export const µStoreLoadCartFailed = createAction('STORE/µStoreLoadCartFailed');
export const µStoreAddProductToCart = createAction<ProductInCart>('STORE/µStoreAddProductToCart');
export const µStoreRemoveProductFromCart = createAction<Product['id']>('STORE/µStoreRemoveProductFromCart');
export const µStoreClearCart = createAction('STORE/µStoreClearCart');
export const µStoreFilterProducts = createAction<StoreFilter>('STORE/µStoreFilterProducts');
export const µStoreCheckoutRequest = createAction('STORE/µStoreCheckoutRequest');
export const µStoreCheckoutSuccessed = createAction('STORE/µStoreCheckoutSuccessed');
