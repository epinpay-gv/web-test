import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basit bir kural: Şifre en az 10 karakter olmalı (Zaten hook'ta kontrol ediyoruz)
    if (!password || password.length < 10) {
      return NextResponse.json({ message: "Şifre hatalı." }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      token: "fake-jwt-token-from-next-api",
      user: { email, name: "Burak" }
    });
  } catch (error) {
    return NextResponse.json({ message: "Giriş yapılamadı." }, { status: 500 });
  }
}