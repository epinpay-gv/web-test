import { NextRequest, NextResponse } from 'next/server';
import { AuthResponse } from '@/features/auth/auth.types';

/**
 * POST /api/auth/register/resend
 * OTP kodunu tekrar gönderir (Mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json();

    // Validasyon
    if (!body.email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email gereklidir' 
        } as AuthResponse,
        { status: 400 }
      );
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Geçersiz email formatı' 
        } as AuthResponse,
        { status: 400 }
      );
    }

    // Mock: Rate limiting simülasyonu (isteğe bağlı)
    // Gerçek uygulamada son OTP gönderiminden beri geçen süreyi kontrol ederiz
    
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 10));

    // Mock: OTP tekrar gönderimi
    console.log('[MOCK] OTP tekrar gönderildi:', {
      email: body.email,
      otpCode: '123456', // Mock OTP kodu
      timestamp: new Date().toISOString(),
      expiresIn: '5 dakika',
    });

    // Backend geldiğinde bu kısım kullanılacak:
    /*
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register/resend`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: 200 });
    */

    const response: AuthResponse = {
      success: true,
      message: 'Doğrulama kodu tekrar gönderildi',
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('[API Error] OTP Resend:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.' 
      } as AuthResponse,
      { status: 500 }
    );
  }
}
