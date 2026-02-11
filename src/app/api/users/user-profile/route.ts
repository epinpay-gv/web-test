import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const firebaseToken = request.headers.get('x-firebase-token');
  if (!firebaseToken) {
    return NextResponse.json(
      { success: false, message: 'Yetkilendirme anahtarı bulunamadı.' },
      { status: 401 }
    );
  }
  try {
    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me/users`;
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${firebaseToken}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Backend profil bilgisi alınamadı' },
        { status: response.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { success: false, message: 'Sunucu bağlantı hatası' },
      { status: 500 }
    );
  }
}