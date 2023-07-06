import { StateObservable, ofType } from "redux-observable";
import { Observable, of, combineLatest } from 'rxjs';
import { map, mergeMap, catchError, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { µStoreLoadCartRequest, µStoreLoadCartFailed, µStoreLoadCartSuccessed, µStoreLoadCategories, µStoreLoadCategoriesFailed, µStoreLoadCategoriesSuccessed, µStoreLoadProducts, µStoreLoadProductsFailed, µStoreLoadProductsSuccessed, µStoreInit, µStoreCheckoutRequest, µStoreCheckoutSuccessed, µStoreAddProductToCart, µStoreRemoveProductFromCart } from "../actions/store.actions";
import { StoreService } from "../../services/store.service";
import { Action } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { selectUser } from "../selectors/auth.selectors";
import { µPaymentSuccessfulModalOpen } from "../actions/features/payment-successful-modal.actions";
import { µShoppingCartDrawerClose } from "../actions/features/shopping-cart-drawer.actions";
import { µToastManagerCreate } from "../actions/features/toast-manager.actions";

export const initEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µStoreInit.type),
        // Map multiple Actions to trigger fetchProductsEpic & fetchCategoriesEpic
        mergeMap(() => of(
            µStoreLoadProducts(),
            µStoreLoadCategories()
        ))
    )
}

export const loadProductsEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µStoreLoadProducts.type),
        mergeMap(() =>
            StoreService.getProducts().pipe(
                map(payload => µStoreLoadProductsSuccessed(payload)),
                catchError(() => of(µStoreLoadProductsFailed()))
            )
        )
    )
}

export const loadCategoriesEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µStoreLoadCategories.type),
        mergeMap(() =>
            StoreService.getCategories().pipe(
                map(payload => µStoreLoadCategoriesSuccessed(payload)),
                catchError(() => of(µStoreLoadCategoriesFailed()))
            )
        )
    )
}

export const loadCartRequestEpic = (action$: Observable<Action>, state$: StateObservable<RootState>) => {
    return combineLatest({
        action: action$.pipe(ofType(µStoreLoadCartRequest.type)),
        user: state$.pipe(
            map(selectUser),
            distinctUntilChanged((x, y) => x?.id === y?.id),
            filter(Boolean)
        )
    }).pipe(
        mergeMap(({ user }) => {
            if (user) {
                return StoreService.getCart(user.id).pipe(
                    map(payload => µStoreLoadCartSuccessed(payload)),
                    catchError(() => of(µStoreLoadCartFailed()))
                );
            }
            return of(µStoreLoadCartFailed())
        })
    )
}

export const addProductToCart = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µStoreAddProductToCart),
        mergeMap(() => of(µToastManagerCreate({ icon: 'cart', text: 'Product has been added to your cart.', clearWithin: 3000 })))
    )
}

export const removeProductFromCart = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µStoreRemoveProductFromCart),
        mergeMap(() => of(µToastManagerCreate({ icon: 'cart', text: 'Product has been removed from your cart.', clearWithin: 3000 })))
    )
}

export const checkoutEpic = (action$: Observable<Action>) => {
    return action$.pipe(
        ofType(µStoreCheckoutRequest),
        tap(() => console.log('We do fake checkout')),
        mergeMap(() => of(
            µStoreCheckoutSuccessed(),
            µPaymentSuccessfulModalOpen(),
            µShoppingCartDrawerClose()
        ))
    )
}

export const STORE_EPICS = [
    initEpic,
    loadProductsEpic,
    loadCategoriesEpic,
    loadCartRequestEpic,
    addProductToCart,
    removeProductFromCart,
    checkoutEpic,
]