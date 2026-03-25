import { create } from 'zustand';
import { Product } from '@/types/types';

interface ModalState {
  isOpen: boolean;
  product: Product | null;
}

type TopupValue = { id: number; value: string };
type TopupField = { id: number; label: string; value: string };

interface CatalogState {
  topupModal: ModalState;
  topupFields: TopupField[];         // fetched input definitions
  topupValue: TopupValue[];          // user-filled values (fixed: was wrong type)
  openTopupModal: (product: Product) => void;
  closeTopupModal: () => void;
  setTopupFields: (fields: TopupField[]) => void;
  setTopupValue: (data: TopupValue[]) => void;
}

export const useCatalogStore = create<CatalogState>((set) => ({
  topupModal: { isOpen: false, product: null },
  topupFields: [],
  topupValue: [],
  openTopupModal: (product: Product) =>
    set({ topupModal: { isOpen: true, product } }),
  closeTopupModal: () =>
    set({
      topupModal: { isOpen: false, product: null },
      topupFields: [],
      topupValue: [],
    }),
  setTopupFields: (fields) => set({ topupFields: fields }),
  setTopupValue: (data) => set({ topupValue: data }),
}));