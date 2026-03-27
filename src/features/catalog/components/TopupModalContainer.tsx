"use client";

import { useCatalogStore } from "@/features/catalog/store/catalog.store";
import { Modal } from "@/components/common/Modal/Modal";
import { TopupInfoForm } from "@/components/common/Cards/ProductCard/CardSections/TopupInfoForm";
import { useBasketActions } from "@/features/catalog/hooks/basket/useBasketActions";
import Link from "next/link";

export function TopupModalContainer() {
  const { topupModal, closeTopupModal, topupValue } = useCatalogStore();
  const { addToCart } = useBasketActions();

  const handleConfirm = () => {
    if (topupModal.product) {
      console.log(
        `[Topup Modal] Ürün sepete eklendi. Gelen veri: ${topupValue}`,
      );

      addToCart({
        productId: topupModal.product.id,
        offerId: topupModal.product.cheapestOffer?.id || 0,
        quantity: 1,
        topupData: topupValue,
      });
    }
    closeTopupModal();
  };

  return (
    <Modal
      open={topupModal.isOpen}
      onClose={closeTopupModal}
      title="Oyun kimliğinizi girin"
      description={
        <p className="text-sm text-start mb-4 text-(--text-body)">
          Hesabınıza bakiye yüklemek için, oyun kimliğinizi girin.{" "}
          <Link className="text-(--text-fg-brand)" href="/">
            Oyun kimliğini nasıl bulurum?
          </Link>
        </p>
      }
      theme="info"
      size="sm"
      confirmText="Hemen Al"
      onConfirm={handleConfirm}
    >
      <TopupInfoForm />
    </Modal>
  );
}
