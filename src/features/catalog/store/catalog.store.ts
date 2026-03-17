import { create } from 'zustand';
import { Product } from '@/types/types';

interface ModalState {
    isOpen: boolean;
    product: Product | null;
}

interface CatalogState {
    topupModal: ModalState;
    topupValue: string;
    openTopupModal: (product: Product) => void;
    closeTopupModal: () => void;
    setTopupValue: (value: string) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
    topupModal: {
        isOpen: false,
        product: null,
    },
    topupValue: "",
    openTopupModal: (product: Product) =>
        set({
            topupModal: {
                isOpen: true,
                product,
            },
        }),
    closeTopupModal: () =>
        set({
            topupModal: {
                isOpen: false,
                product: null,
            },
            topupValue: "",
        }),
    setTopupValue: (value: string) => set({ topupValue: value }),
}));
