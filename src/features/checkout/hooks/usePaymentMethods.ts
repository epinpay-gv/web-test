import { useState, useEffect } from 'react';
import { PaymentMethod } from '../types';
import { paymentService } from '../service';

export function usePaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        setIsLoading(true);
        const data = await paymentService.getPaymentMethods();
        setMethods(data);
      } catch (err) {
        setError('Ödeme yöntemleri yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMethods();
  }, []);

  return { methods, isLoading, error };
}