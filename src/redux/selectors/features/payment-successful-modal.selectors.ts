import { RootState } from "../../store";

export const selectIsPaymentSuccessfulModalOpen = (state: RootState) => state.features.paymentSuccessfulModal.isOpen;