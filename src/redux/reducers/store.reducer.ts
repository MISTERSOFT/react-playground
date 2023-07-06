import { AnyAction } from "@reduxjs/toolkit"
import { µStoreClearCart, µStoreLoadCartFailed, µStoreLoadCartSuccessed, µStoreLoadCategoriesFailed, µStoreLoadCategoriesSuccessed, µStoreLoadProductsFailed, µStoreLoadProductsSuccessed, µStoreFilterProducts, µStoreCheckoutSuccessed, µStoreAddProductToCart, µStoreRemoveProductFromCart } from "../actions/store.actions";
import { formatCurrency } from "../../utils/format";

export type Category = string;
export type Product = {
    id: number,
    title: string,
    price: number,
    formattedPrice: string,
    category: Category,
    description: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}
export type ProductInCart = {
    productId: number,
    quantity: number
}
export type Cart = {
    id: number,
    userId: number,
    date: string,
    products: ProductInCart[]
}

export type StoreFilter = {
    categories: Category[],
    search: string
}

type StoreState = {
    categories: Category[],
    products: Product[],
    cart?: Cart,
    filter?: StoreFilter
}


const initialState: StoreState = {
    categories: [],
    products: []
}

export function storeReducer(state: StoreState = initialState, action: AnyAction): StoreState {
    if (µStoreLoadCategoriesSuccessed.match(action)) {
        return { ...state, categories: action.payload };
    }

    if (µStoreLoadCategoriesFailed.match(action)) {
        return { ...state, categories: [] };
    }

    if (µStoreLoadProductsSuccessed.match(action)) {
        return {
            ...state,
            products: action.payload.map(p => ({ ...p, formattedPrice: formatCurrency(p.price) }))
        };
    }

    if (µStoreLoadProductsFailed.match(action)) {
        return { ...state, products: [] };
    }

    if (µStoreLoadCartSuccessed.match(action)) {
        return { ...state, cart: action.payload };
    }

    if (µStoreLoadCartFailed.match(action)) {
        return { ...state, cart: (state.cart ?? undefined) };
    }

    if (µStoreAddProductToCart.match(action)) {
        if (state.cart) {
            const exist = state.cart.products.some(x => x.productId === action.payload.productId)

            let products: ProductInCart[];
            // Update quantity if product already in cart
            if (exist) {
                products = state.cart.products.map(productInCart => {
                    if (productInCart.productId === action.payload.productId) {
                        return {
                            ...productInCart,
                            quantity: productInCart.quantity + action.payload.quantity
                        }
                    }
                    return productInCart
                })
            } else {
                // Else, we add product in cart
                products = [...state.cart.products, action.payload]
            }

            return {
                ...state,
                cart: {
                    ...state.cart,
                    products
                }
            }
        }
        return state
    }

    if (µStoreRemoveProductFromCart.match(action)) {
        if (state.cart) {
            return {
                ...state,
                cart: {
                    ...state.cart,
                    products: state.cart.products.filter(x => x.productId !== action.payload)
                }
            }
        }

        return state
    }

    if (µStoreClearCart.match(action)) {
        return { ...state, cart: undefined }
    }

    if (µStoreFilterProducts.match(action)) {
        return {
            ...state,
            filter: action.payload
        }
    }

    if (µStoreCheckoutSuccessed.match(action)) {
        return {
            ...state,
            cart: undefined
        }
    }

    return state;
}
