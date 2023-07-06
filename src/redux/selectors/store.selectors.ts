import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../reducers/store.reducer";
import { formatCurrency } from "../../utils/format";

export const selectCategories = (state: RootState) => state.store.categories;

export const selectProducts = (state: RootState) => state.store.products;

export const selectCart = (state: RootState) => state.store.cart;

export const selectProductsFilter = (state: RootState) => state.store.filter;

export const selectProductsFiltered = createSelector(
    selectProducts,
    selectProductsFilter,
    (products, filter) => {
        if (!filter) return products

        let result = products

        if (filter.categories.length) {
            result = products.filter(p => filter.categories.includes(p.category))
        }

        if (filter.search) {
            result = result.filter(x => x.title.toLowerCase().includes(filter.search.toLowerCase()))
        }

        return result
    }
)

export const selectProductById = createSelector(
    [
        selectProducts,
        (state, productId: number) => productId,
    ],
    (products, productId) => {
        const p = products.filter(x => x.id === productId)
        return p.length ? p[0] : null
    }
)

export const selectCartCount = createSelector(
    selectCart,
    (cart) => cart?.products?.length || 0
)

export const selectProductsInCart = createSelector(
    selectCart,
    selectProducts,
    (cart, products) => {
        if (!cart) {
            return []
        }

        return cart.products.map(x => {
            const product = products.find(y => y.id === x.productId)
            return {
                item: {
                    ...product,
                    formattedPrice: formatCurrency((product?.price ?? 0) * x.quantity),
                },
                formattedTotalPrice: formatCurrency((product?.price ?? 0) * x.quantity),
                quantity: x.quantity,
            }
        }).filter(x => x.item) as { item: (Product & { formattedPrice: string }), quantity: number, formattedTotalPrice: string }[]
    }
)

export const selectCartSubtotal = createSelector(
    selectProductsInCart,
    (products) => {
        const total = products.map(x => x.item.price * x.quantity).reduce((p, acc) => acc + p, 0)
        return formatCurrency(total)
    }
)