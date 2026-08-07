import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const cleanEnv = (val) => (val || '').replace(/^["']|["']$/g, '').trim();

const accountId = cleanEnv(process.env.R2_ACCOUNT_ID);
const accessKeyId = cleanEnv(process.env.R2_ACCESS_KEY_ID);
const secretAccessKey = cleanEnv(process.env.R2_SECRET_ACCESS_KEY);
const bucketName = cleanEnv(process.env.R2_BUCKET_NAME);

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export async function POST(request) {
  try {
    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
      return NextResponse.json(
        { error: 'Configuração do Cloudflare R2 incompleta no servidor (.env.local).' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split('.').pop() || 'webp';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: file.type || 'image/webp',
      })
    );

    const publicDomain = cleanEnv(process.env.NEXT_PUBLIC_R2_PUBLIC_URL).replace(/\/$/, '');
    const publicUrl = `${publicDomain}/${fileName}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('R2 Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Erro no envio para R2.' }, { status: 500 });
  }
}
