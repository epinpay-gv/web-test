import { NextRequest, NextResponse } from 'next/server';
import { AuthResponse } from '@/features/auth/auth.types';

/**
 * POST /api/auth/login
 * Firebase token ile backend login (Mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validasyon
    if (!body.firebaseToken) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Firebase token gereklidir' 
        } as AuthResponse,
        { status: 400 }
      );
    }

    console.log('🔐 [Backend Login] Firebase token alındı:', body.firebaseToken.substring(0, 30) + '...');

    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 700));

    // Mock: Token doğrulaması - test_token veya firebase_token ile başlıyorsa geçerli
    const isValidToken = body.firebaseToken.startsWith('test_token_') || 
                        body.firebaseToken.startsWith('firebase_token_');

    if (!isValidToken) {
      console.log('❌ [Backend Login] Geçersiz token:', {
        token: body.firebaseToken.substring(0, 30) + '...',
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'Geçersiz Firebase token' 
        } as AuthResponse,
        { status: 401 }
      );
    }

    // Mock: User bilgileri oluştur
    const userId = `user_${Date.now()}`;
    const mockBackendToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ 
      userId, 
      email: 'test@test.com',
      iat: Date.now() 
    }))}.mock_backend_signature`;

    console.log('✅ [Backend Login] Login başarılı:', {
      userId,
      email: 'test@test.com',
      timestamp: new Date().toISOString(),
    });

    // Backend geldiğinde burası kullanılacak:
    /*
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${body.firebaseToken}`
      },
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
      message: 'Giriş başarılı',
      token: mockBackendToken,
      user: {
        id: userId,
        email: 'test@test.com',
        name: 'Test',
        surname: 'User',
        balance: 35,
        epPoints: 35,
      },
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('❌ [Backend Login] Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.' 
      } as AuthResponse,
      { status: 500 }
    );
  }
}