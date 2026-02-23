import { NextRequest, NextResponse } from 'next/server';
import { RegisterFormData, AuthResponse } from '@/features/auth/auth.types';

/**
 * POST /api/auth/register/initiate
 * Kayıt işlemini başlatır ve email'e OTP gönderir (Mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body: RegisterFormData = await request.json();

    // Validasyon
    if (!body.email || !body.password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email ve şifre gereklidir' 
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

    // Şifre uzunluk kontrolü
    if (body.password.length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Şifre en az 10 karakter olmalıdır' 
        } as AuthResponse,
        { status: 400 }
      );
    }

    // Mock: Email'e OTP gönderildiğini simüle et
    console.log('[MOCK] Kayıt başlatıldı:', {
      email: body.email,
      otpCode: '123456', // Mock OTP kodu
      timestamp: new Date().toISOString(),
    });

    // Simüle edilmiş gecikme (gerçek API gibi)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Backend geldiğinde bu kısım kullanılacak:
    /*
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register/initiate`, {
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
      message: 'Doğrulama kodu email adresinize gönderildi',
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('[API Error] Register Initiate:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.' 
      } as AuthResponse,
      { status: 500 }
    );
  }
}
