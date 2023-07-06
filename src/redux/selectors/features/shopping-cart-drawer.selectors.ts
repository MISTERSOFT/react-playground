import { RootState } from "../../store";

export const selectIsShoppingCartDrawerOpen = (state: RootState) => state.features.shoppingCartDrawer.isOpen;