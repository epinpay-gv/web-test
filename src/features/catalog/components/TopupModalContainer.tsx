"use client";

import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { Modal } from "@/components/common/Modal/Modal";
import { TopupInfoForm } from "@/components/common/Cards/ProductCard/CardSections/TopupInfoForm";
import { useBasketActions } from "@/features/catalog/hooks/basket/useBasketActions";

export function TopupModalContainer() {
    const { topupModal, closeTopupModal, topupValue } = useCatalogStore();
    const { addToCart } = useBasketActions();

    const handleConfirm = () => {
        if (topupModal.product) {
            console.log(`[Topup Modal] Ürün sepete eklendi. Gelen veri: ${topupValue}`);

            addToCart({
                productId: topupModal.product.id,
                offerId: topupModal.product.cheapestOffer?.id || 0,
                quantity: 1,
                topupData: topupValue
            });
        }
        closeTopupModal();
    };

    return (
        <Modal
            open={topupModal.isOpen}
            onClose={closeTopupModal}
            title="Bilgilerini Gir"
            theme="info"
            size="md"
            confirmText="Gönder"
            onConfirm={handleConfirm}
        >
            <TopupInfoForm />
        </Modal>
    );
}
