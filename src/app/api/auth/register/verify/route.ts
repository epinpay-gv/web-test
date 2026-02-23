import { NextRequest, NextResponse } from 'next/server';
import { VerifyOtpRequest, AuthResponse } from '@/features/auth/auth.types';

/**
 * POST /api/auth/register/verify
 * OTP kodunu doğrular ve kayıt işlemini tamamlar (Mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body: VerifyOtpRequest = await request.json();

    // Validasyon
    if (!body.email || !body.otpCode) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email ve OTP kodu gereklidir' 
        } as AuthResponse,
        { status: 400 }
      );
    }

    // OTP kod format kontrolü
    if (body.otpCode.length !== 6 || !/^\d{6}$/.test(body.otpCode)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'OTP kodu 6 haneli olmalıdır' 
        } as AuthResponse,
        { status: 400 }
      );
    }

    // Mock: OTP doğrulaması
    // Test için '123456' kabul ediyoruz
    const isValidOtp = body.otpCode === '123456';

    if (!isValidOtp) {
      console.log('[MOCK] Geçersiz OTP:', {
        email: body.email,
        attemptedCode: body.otpCode,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'Geçersiz doğrulama kodu. Lütfen tekrar deneyin.' 
        } as AuthResponse,
        { status: 400 }
      );
    }

    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock: Kullanıcı ID ve token oluştur
    const userId = `user_${Date.now()}`;
    const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ 
      userId, 
      email: body.email,
      iat: Date.now() 
    }))}.mock_signature`;

    console.log('[MOCK] OTP doğrulandı, kullanıcı oluşturuldu:', {
      userId,
      email: body.email,
      timestamp: new Date().toISOString(),
    });

    // Backend geldiğinde bu kısım kullanılacak:
    /*
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register/verify`, {
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
      message: 'Kayıt başarıyla tamamlandı',
      token: mockToken,
      user: {
        id: userId,
        email: body.email,
        name: undefined,
        surname: undefined,
      },
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('[API Error] OTP Verify:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.' 
      } as AuthResponse,
      { status: 500 }
    );
  }
}
