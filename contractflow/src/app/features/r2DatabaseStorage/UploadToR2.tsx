"use server";

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from "cloudflare:workers"

export async function POST(request: Request, env: any) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const r2ObjectKey = `uploads/${fileName}`;

    await env.R2ContractFlow.put(r2ObjectKey, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    return Response.json({
      success: true,
      fileName,
      url: r2ObjectKey,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('R2 upload error:', error);
    return Response.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}