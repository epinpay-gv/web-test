import { NextRequest, NextResponse } from 'next/server';
import { FirebaseTokenResponse, LoginFormData } from '@/features/auth/auth.types';

/**
 * POST /api/auth/login/firebase-token
 * Email/Şifre ile Firebase token alır (Mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginFormData = await request.json();

    // Validasyon
    if (!body.email || !body.password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email ve şifre gereklidir' 
        },
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
        },
        { status: 400 }
      );
    }

    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock: Şifre kontrolü (gerçekte Firebase'den gelecek)
    const isValidCredentials = body.password.length >= 6;

    if (!isValidCredentials) {
      console.log('[MOCK] Firebase token - Başarısız giriş:', {
        email: body.email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'Email veya şifre hatalı' 
        },
        { status: 401 }
      );
    }

    // Mock: Firebase Token Oluştur
    const mockFirebaseToken = `firebase_token_${btoa(body.email)}_${Date.now()}`;

    console.log('[MOCK] Firebase token oluşturuldu:', {
      email: body.email,
      token: mockFirebaseToken.substring(0, 30) + '...',
      timestamp: new Date().toISOString(),
    });

    // Backend geldiğinde burası kullanılacak:
    /*
    const firebaseResponse = await fetch(`${process.env.FIREBASE_AUTH_URL}/verifyPassword`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        returnSecureToken: true,
      }),
    });

    if (!firebaseResponse.ok) {
      const errorData = await firebaseResponse.json();
      return NextResponse.json({
        success: false,
        message: errorData.error.message || 'Firebase authentication failed'
      }, { status: 401 });
    }

    const firebaseData = await firebaseResponse.json();
    
    return NextResponse.json({
      success: true,
      firebaseToken: firebaseData.idToken,
      expiresIn: firebaseData.expiresIn,
    }, { status: 200 });
    */

    const response: FirebaseTokenResponse = {
      success: true,
      firebaseToken: mockFirebaseToken,
      expiresIn: 3600, // 1 saat
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('[API Error] Firebase Token:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    );
  }
}