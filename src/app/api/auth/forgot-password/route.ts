// app/api/auth/forgot-password/route.ts
//
// Bu route gerçek backend yerine mock olarak çalışır.
// Gerçek projenizde bu endpoint:
//   - Kullanıcının sistemde kayıtlı olup olmadığını kontrol eder
//   - Hesap aktif mi, ban'lı mı gibi durumları validate eder
//   - Rate limiting uygular
//   - Audit log yazar
//
// Firebase sendPasswordResetEmail zaten direkt e-posta gönderir,
// bu yüzden bu endpoint yalnızca ön-doğrulama katmanıdır.

import { NextRequest, NextResponse } from 'next/server';

// Simüle edilmiş kullanıcı veritabanı
const MOCK_USERS: Record<string, { active: boolean }> = {
  'test@epinpay.com': { active: true },
  'user@example.com': { active: true },
  'banned@example.com': { active: false },
};

// Basit in-memory rate limiter (gerçek projede Redis/Upstash kullanın)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;          // 3 istek
const RATE_WINDOW_MS = 60_000; // 60 saniye

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) return false;

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate Limit ──
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Çok fazla istek. Lütfen 1 dakika bekleyin.' },
        { status: 429 }
      );
    }

    // ── Body Parse ──
    const body = await req.json().catch(() => null);
    if (!body || typeof body.email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz istek formatı.' },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();

    // ── Email Format Validation ──
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz e-posta formatı.' },
        { status: 400 }
      );
    }

    // ── Mock: Kullanıcı Kontrolü ──
    // GÜVENLIK NOTU: Gerçek projede, e-postanın kayıtlı olup olmadığını
    // açıkça belirtme — her zaman başarılı response dön (user enumeration'ı önler).
    // Bu mock'ta biz sadece banned kontrolü yapıyoruz.
    const user = MOCK_USERS[email];

    if (user && !user.active) {
      return NextResponse.json(
        { success: false, message: 'Bu hesap askıya alınmıştır. Destek ekibiyle iletişime geçin.' },
        { status: 403 }
      );
    }

    // ── Başarılı: Firebase e-postayı gönderecek ──
    // Bu noktada backend doğrulaması tamam; Firebase tarafı devralır.
    return NextResponse.json(
      { success: true, message: 'İstek alındı.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('[forgot-password] Unexpected error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}