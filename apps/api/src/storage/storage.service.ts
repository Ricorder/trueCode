import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mime from 'mime-types';

@Injectable()
export class StorageService {
	private readonly s3Client: S3Client;
	private readonly bucket: string;
	private readonly publicUrl: string;

	constructor(private readonly configService: ConfigService) {
		const region = this.configService.get<string>('S3_REGION');
		const endpoint = this.configService.get<string>('S3_URL');
		const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY');
		const secretAccessKey = this.configService.get<string>('S3_SECRET_KEY');
		this.bucket = this.configService.get<string>('S3_BUCKET');
		this.publicUrl = this.configService.get<string>('S3_PUBLIC_URL'); // ← должен быть полным URL
		if (!region || !endpoint || !accessKeyId || !secretAccessKey || !this.bucket || !this.publicUrl) {
			throw new Error('S3 configuration is incomplete');
		}
		this.s3Client = new S3Client({
			region,
			endpoint,
			credentials: { accessKeyId, secretAccessKey },
			forcePathStyle: true,
		});
	}
	async uploadFile(file: Buffer, originalName: string, folder: string): Promise<string> {
		if (!file?.length) {
			throw new BadRequestException('File is empty');
		}
		const sanitizedFileName = this.sanitizeFileName(originalName);
		const key = `${folder}/${Date.now()}-${sanitizedFileName}`;
		const contentType = mime.lookup(originalName) || 'application/octet-stream';
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: key,
			Body: file,
			ACL: 'public-read-write',
			ContentType: contentType,
		});
		try {
			await this.s3Client.send(command);
			return `${this.publicUrl}/${key}`;
		} catch (error) {
			console.error('S3 upload error:', error);
			throw new InternalServerErrorException('Failed to upload file to storage');
		}
	}
	async deleteFile(fileUrl: string): Promise<void> {
		if (!fileUrl) return;
		try {
			const key = this.extractKeyFromUrl(fileUrl);
			const command = new DeleteObjectCommand({
				Bucket: this.bucket,
				Key: key,
			});
			await this.s3Client.send(command);
		} catch (error) {
			console.error('S3 delete error:', error);
		}
	}
	private sanitizeFileName(fileName: string): string {
		return fileName
			.replace(/[^a-zA-Z0-9._-]/g, '_')
			.substring(0, 255);
	}
	private extractKeyFromUrl(url: string): string {
		try {
			const publicUrl = new URL(this.publicUrl);
			const fileUrlObj = new URL(url);
			if (fileUrlObj.origin !== publicUrl.origin) {
				console.log('File from remote storage');
			}
			return fileUrlObj.pathname.substring(1); // убираем начальный '/'
		} catch (error) {
			throw new BadRequestException('Invalid file URL format');
		}
	}
}
