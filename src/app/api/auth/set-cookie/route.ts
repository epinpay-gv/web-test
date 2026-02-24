import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/set-cookie
 * Login sonrası token'ları httpOnly cookie'ye yazar
 */
export async function POST(request: NextRequest) {
  try {
    const body: {
      accessToken: string;
      refreshToken: string;
      rememberMe: boolean;
    } = await request.json();

    if (!body.accessToken || !body.refreshToken) {
      return NextResponse.json(
        { success: false, message: 'Token gereklidir' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });

    // Access Token - 15 dakika
    response.cookies.set('accessToken', body.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60,
      path: '/',
    });

    // Refresh Token
    // Remember Me → 30 gün (localStorage gibi kalıcı)
    // Remember Me yok → Session cookie (tarayıcı kapanınca silinir)
    response.cookies.set('refreshToken', body.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      ...(body.rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('[API] Set Cookie Error:', error);
    return NextResponse.json(
      { success: false, message: 'Cookie ayarlanamadı' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/set-cookie
 * Logout sonrası cookie'leri temizler
 */
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('accessToken');
  response.cookies.delete('refreshToken');
  return response;
}