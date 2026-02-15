import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, otpCode } = body;

    // Gerçekçi bir network gecikmesi simüle edelim
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ADIM 1: KAYIT BAŞLATMA
    if (action === 'initiate') {
      if (email === 'error@epinpay.com') {
        return NextResponse.json(
          { message: "Bu e-posta adresi zaten kullanımda." }, 
          { status: 400 }
        );
      }
      return NextResponse.json({ success: true, message: "OTP gönderildi." });
    }

    // ADIM 2: OTP DOĞRULAMA
    if (action === 'verify') {
      if (otpCode !== '111111') {
        return NextResponse.json(
          { message: "Girdiğiniz doğrulama kodu geçersiz." }, 
          { status: 400 }
        );
      }
      return NextResponse.json({ 
        success: true, 
        message: "Kayıt başarıyla tamamlandı.",
        user: { email, name: "Burak", surname: "Test" }
      });
    }

    return NextResponse.json({ message: "Geçersiz işlem." }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ message: "Sunucu hatası." }, { status: 500 });
  }
}