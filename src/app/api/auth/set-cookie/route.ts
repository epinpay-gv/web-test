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
      user: any;
    } = await request.json();

    if (!body.accessToken) {
      return NextResponse.json(
        { success: false, message: 'Token gereklidir' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true });

    // Access Token - 1 saat (veya JWT exp'ine göre)
    // Örnek: expire süresini 1 saat yapalım
    response.cookies.set('accessToken', body.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60,
      path: '/',
    });

    if (body.refreshToken) {
      response.cookies.set('refreshToken', body.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        ...(body.rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
        path: '/',
      });
    }

    // Kullanıcı bilgilerini içeren cookie (client taraflı da okunabilir olması için httpOnly: false)
    if (body.user) {
      response.cookies.set('userInfo', JSON.stringify(body.user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        ...(body.rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : { maxAge: 60 * 60 }),
        path: '/',
      });
    }

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