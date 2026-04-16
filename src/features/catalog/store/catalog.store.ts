import { create } from 'zustand';
import { Product, TopupFormField } from '@/types/types';

interface ModalState {
  isOpen: boolean;
  product: Product | null;
}

interface CatalogState {
  topupModal: ModalState;
  topupFields: TopupFormField[];
  topupValue: Record<string, string>;
  openTopupModal: (product: Product) => void;
  closeTopupModal: () => void;
  setTopupFields: (fields: TopupFormField[]) => void;
  setTopupValue: (data: Record<string, string>) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  topupModal: { isOpen: false, product: null },
  topupFields: [],
  topupValue: {},
  openTopupModal: (product: Product) =>
    set({ topupModal: { isOpen: true, product } }),
  closeTopupModal: () =>
    set({
      topupModal: { isOpen: false, product: null },
      topupFields: [],
      topupValue: {},
    }),
  setTopupFields: (fields) => set({ topupFields: fields }),
  setTopupValue: (data) => set({ topupValue: data }),
}));