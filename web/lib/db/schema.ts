/**
 * Type-Safe Database Schema & Domain Entities
 * Compatible with Drizzle ORM, Prisma, Supabase, or PostgreSQL.
 */

export type Role = 'customer' | 'admin' | 'qa_editor';
export type BookStatus = 'draft' | 'preview_generated' | 'purchased' | 'in_qa' | 'approved' | 'delivered';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentProvider = 'lemonsqueezy' | 'stripe';
export type QAStatus = 'pending_review' | 'approved' | 'changes_requested';

export interface DBUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface DBBook {
  id: string;
  titleEn: string;
  titleAr?: string;
  titleDe?: string;
  titleFr?: string;
  childName: string;
  childGender: 'boy' | 'girl';
  childAge: number;
  theme: string;
  language: string;
  dedicationText: string;
  dedicationDate: string;
  status: BookStatus;
  customerEmail?: string;
  totalSpreads: number;
  characterSeed: number;
  createdAt: string;
  updatedAt: string;
}

export interface DBSpread {
  id: string;
  bookId: string;
  spreadNumber: number;
  leftPageTextEn: string;
  leftPageTextAr?: string;
  leftPageTextDe?: string;
  leftPageTextFr?: string;
  illustrationPrompt: string;
  illustrationUrl?: string;
  characterSeed: number;
  mood?: string;
  createdAt: string;
}

export interface DBOrder {
  id: string;
  bookId: string;
  customerEmail: string;
  customerName: string;
  amount: number;
  currency: 'AED' | 'USD' | 'EUR' | 'GBP';
  packageType: 'digital_keepsake' | 'hardcover_pod' | 'bundle';
  status: OrderStatus;
  paymentProvider: PaymentProvider;
  paymentReferenceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBQAReview {
  id: string;
  bookId: string;
  reviewerId?: string;
  status: QAStatus;
  tashkeelVerified: boolean;
  visualConsistencyScore: number; // 1-10
  editorialNotes?: string;
  reviewedAt?: string;
  createdAt: string;
}
