import { DBBook, DBSpread, DBOrder, DBQAReview } from './schema';

/**
 * Clean Repository Interface
 * Allows seamless switching between In-Memory store (development/tests)
 * and PostgreSQL / Supabase / Prisma / Drizzle in production.
 */
export class BookRepository {
  private static books: Map<string, DBBook> = new Map();
  private static spreads: Map<string, DBSpread[]> = new Map();
  private static orders: Map<string, DBOrder> = new Map();
  private static reviews: Map<string, DBQAReview> = new Map();

  // Pre-populate with a sample book for QA and instant testing
  static {
    const sampleId = 'sample-book-zayed';
    this.books.set(sampleId, {
      id: sampleId,
      titleEn: 'Zayed and the Secret of the Starlit Dunes',
      titleAr: 'زايد وسر الكثبان المضيئة بالنجوم',
      childName: 'Zayed',
      childGender: 'boy',
      childAge: 5,
      theme: 'desert',
      language: 'bilingual',
      dedicationText: 'For our little prince Zayed. May you always reach for the stars. With all our love, Mama & Baba.',
      dedicationDate: 'September 2026',
      status: 'in_qa',
      customerEmail: 'parent@example.ae',
      totalSpreads: 2,
      characterSeed: 8492041,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    this.spreads.set(sampleId, [
      {
        id: 'spread-1',
        bookId: sampleId,
        spreadNumber: 1,
        leftPageTextEn: 'The golden desert whispers soft when evening shadows grow,\nA little explorer named Zayed watched the shifting sunset glow.\nIn their hand, an ancient compass pointed to the sky,\nWhere the first bright evening star was dancing way up high.',
        leftPageTextAr: 'تَهْمِسُ الرِّمَالُ الذَّهَبِيَّةُ حِينَ يَمِيلُ المَسَاءُ،\nوَزَايِد البَطَلُ يَتَأَمَّلُ كَيْفَ تَغِيبُ الأَضْوَاءُ.\nفِي يَدِهِ بَوْصَلَةٌ قَدِيمَةٌ تُشِيرُ نَحْوَ الفَضَاءِ،\nحَيْثُ يُنِيرُ أَوَّلُ نَجْمٍ فِي كَبِدِ السَّمَاءِ.',
        illustrationPrompt: 'Cinematic golden sand dune during glowing Arabian sunset, boy holding antique brass compass.',
        illustrationUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85',
        characterSeed: 8492041,
        mood: 'wonder',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'spread-2',
        bookId: sampleId,
        spreadNumber: 2,
        leftPageTextEn: 'A gentle rustle in the breeze, a chirp from up above,\nA baby falcon with soft wings of courage, hope, and love.\nZayed held the lantern close and whispered, "Do not fear,\nWe\'ll find your mother in the stars, the desert path is clear!"',
        leftPageTextAr: 'حَفِيفٌ نَاعِمٌ فِي النَّسِيمِ، وَصَوْتٌ يُنَادِي مِنَ الأَعَالِي،\nفَرْخُ صَقْرٍ ذَهَبِيٍّ يَخْفِقُ بِأَجْنِحَةِ الآمَالِ.\nقَرَّبَ زَايِد قِنْدِيلَهُ وَقَالَ: «لا تَخَفْ يَا صَغِيرِي،\nسَنَتْبَعُ نُجُومَ السَّمَاءِ لِتُضِيءَ دَرْبَ مَسِيرِي!»',
        illustrationPrompt: 'Moonlit desert oasis with baby golden falcon perched on a stone.',
        illustrationUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
        characterSeed: 8492041,
        mood: 'friendship',
        createdAt: new Date().toISOString(),
      },
    ]);

    this.reviews.set(sampleId, {
      id: 'rev-1',
      bookId: sampleId,
      status: 'pending_review',
      tashkeelVerified: true,
      visualConsistencyScore: 9,
      editorialNotes: 'Tashkeel verified, poetic meter flows naturally. Ready for final approval.',
      createdAt: new Date().toISOString(),
    });
  }

  static async getBookById(id: string): Promise<DBBook | null> {
    return this.books.get(id) || null;
  }

  static async getSpreadsByBookId(bookId: string): Promise<DBSpread[]> {
    return this.spreads.get(bookId) || [];
  }

  static async saveBook(book: DBBook, spreads: DBSpread[]): Promise<void> {
    this.books.set(book.id, book);
    this.spreads.set(book.id, spreads);
  }

  static async updateBookStatus(id: string, status: DBBook['status']): Promise<void> {
    const book = this.books.get(id);
    if (book) {
      book.status = status;
      book.updatedAt = new Date().toISOString();
      this.books.set(id, book);
    }
  }

  static async getPendingQABooks(): Promise<{ book: DBBook; review?: DBQAReview; spreads: DBSpread[] }[]> {
    const pending: { book: DBBook; review?: DBQAReview; spreads: DBSpread[] }[] = [];
    for (const [id, book] of this.books.entries()) {
      if (book.status === 'in_qa' || book.status === 'preview_generated') {
        pending.push({
          book,
          review: this.reviews.get(id),
          spreads: this.spreads.get(id) || [],
        });
      }
    }
    return pending;
  }

  static async approveQABook(bookId: string, reviewerNotes?: string): Promise<void> {
    const book = this.books.get(bookId);
    if (book) {
      book.status = 'approved';
      book.updatedAt = new Date().toISOString();
      this.books.set(bookId, book);
    }

    const review = this.reviews.get(bookId) || {
      id: `rev_${Date.now()}`,
      bookId,
      status: 'approved',
      tashkeelVerified: true,
      visualConsistencyScore: 10,
      createdAt: new Date().toISOString(),
    };

    review.status = 'approved';
    review.editorialNotes = reviewerNotes || 'Approved via Editorial QA Dashboard';
    review.reviewedAt = new Date().toISOString();
    this.reviews.set(bookId, review);
  }

  static async createOrder(order: DBOrder): Promise<void> {
    this.orders.set(order.id, order);
  }

  static async getOrder(id: string): Promise<DBOrder | null> {
    return this.orders.get(id) || null;
  }
}
