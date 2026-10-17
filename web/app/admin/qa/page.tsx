'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, BookOpen, ShieldCheck, Edit3 } from 'lucide-react';
import AdminGate from '../AdminGate';

interface SpreadReview {
  id: string;
  spreadNumber: number;
  textEn: string;
  textAr: string;
  prompt: string;
  imgUrl: string;
  isTashkeelAccurate: boolean;
}

interface PendingBook {
  id: string;
  childName: string;
  theme: string;
  status: string;
  customerEmail: string;
  dateCreated: string;
  spreads: SpreadReview[];
}

const INITIAL_PENDING_BOOKS: PendingBook[] = [
  {
    id: 'sample-book-zayed',
    childName: 'Zayed',
    theme: 'Desert Explorer',
    status: 'in_qa',
    customerEmail: 'Demo QA data',
    dateCreated: 'Just now',
    spreads: [
      {
        id: 'sp-1',
        spreadNumber: 1,
        textEn: 'The golden desert whispers soft when evening shadows grow,\nA little explorer named Zayed watched the shifting sunset glow.\nIn their hand, an ancient compass pointed to the sky,\nWhere the first bright evening star was dancing way up high.',
        textAr: 'تَهْمِسُ الرِّمَالُ الذَّهَبِيَّةُ حِينَ يَمِيلُ المَسَاءُ،\nوَزَايِد البَطَلُ يَتَأَمَّلُ كَيْفَ تَغِيبُ الأَضْوَاءُ.\nفِي يَدِهِ بَوْصَلَةٌ قَدِيمَةٌ تُشِيرُ نَحْوَ الفَضَاءِ،\nحَيْثُ يُنِيرُ أَوَّلُ نَجْمٍ فِي كَبِدِ السَّمَاءِ.',
        prompt: 'Cinematic golden sand dune during glowing Arabian sunset, boy holding antique brass compass.',
        imgUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85',
        isTashkeelAccurate: true,
      },
      {
        id: 'sp-2',
        spreadNumber: 2,
        textEn: 'A gentle rustle in the breeze, a chirp from up above,\nA baby falcon with soft wings of courage, hope, and love.\nZayed held the lantern close and whispered, "Do not fear,\nWe\'ll find your mother in the stars, the desert path is clear!"',
        textAr: 'حَفِيفٌ نَاعِمٌ فِي النَّسِيمِ، وَصَوْتٌ يُنَادِي مِنَ الأَعَالِي،\nفَرْخُ صَقْرٍ ذَهَبِيٍّ يَخْفِقُ بِأَجْنِحَةِ الآمَالِ.\nقَرَّبَ زَايِد قِنْدِيلَهُ وَقَالَ: «لا تَخَفْ يَا صَغِيرِي،\nسَنَتْبَعُ نُجُومَ السَّمَاءِ لِتُضِيءَ دَرْبَ مَسِيرِي!»',
        prompt: 'Moonlit desert oasis with baby golden falcon perched on a stone.',
        imgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
        isTashkeelAccurate: true,
      },
    ],
  },
];

function EditorialQADashboard() {
  const [books, setBooks] = useState<PendingBook[]>(INITIAL_PENDING_BOOKS);
  const [selectedBookId, setSelectedBookId] = useState<string>('sample-book-zayed');
  const [approvedIds, setApprovedIds] = useState<string[]>([]);
  const [editingSpreadIndex, setEditingSpreadIndex] = useState<number | null>(null);
  const [editedArText, setEditedArText] = useState<string>('');

  const currentBook = books.find((b) => b.id === selectedBookId);

  const handleApprove = (bookId: string) => {
    setApprovedIds((prev) => [...prev, bookId]);
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, status: 'approved' } : b))
    );
  };

  const handleStartEdit = (index: number, currentText: string) => {
    setEditingSpreadIndex(index);
    setEditedArText(currentText);
  };

  const handleSaveEdit = (spreadIndex: number) => {
    if (!currentBook) return;
    const updatedSpreads = [...currentBook.spreads];
    const target = updatedSpreads[spreadIndex];
    if (!target) return;
    updatedSpreads[spreadIndex] = { ...target, textAr: editedArText };

    setBooks((prev) =>
      prev.map((b) => (b.id === currentBook.id ? { ...b, spreads: updatedSpreads } : b))
    );
    setEditingSpreadIndex(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 font-sans">
      {/* Top QA Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <h1 className="font-extrabold text-lg text-white tracking-tight flex items-center gap-2">
            PersonalizedTales <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">Editorial QA Workstation</span>
          </h1>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-400">Queue: <strong className="text-white">{books.filter(b => b.status === 'in_qa').length} pending</strong></span>
          <Link href="/" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition">
            Back to Storefront
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Pending Books Queue */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Review Queue</h2>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Track 2 Bespoke</span>
          </div>

          <div className="space-y-3">
            {books.map((b) => {
              const isApproved = approvedIds.includes(b.id);
              const isSelected = selectedBookId === b.id;

              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBookId(b.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500/60 shadow-lg'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-base">{b.childName}&apos;s Book</span>
                    {isApproved ? (
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    ) : (
                      <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                        Awaiting QA
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Theme: {b.theme}</span>
                    <span>{b.spreads.length} Spreads</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> QA Checklist Protocol
            </div>
            <p>1. <strong>Tashkeel Audit:</strong> Confirm vowel marks on key rhyming endings.</p>
            <p>2. <strong>Character Consistency:</strong> Check hair, eyes, and skin tone match across all spreads.</p>
            <p>3. <strong>Poetic Rhythm:</strong> Verify English & Arabic read naturally out loud.</p>
          </div>
        </div>

        {/* Right Area: Active Book Inspection Spread */}
        <div className="lg:col-span-8 space-y-6">
          {currentBook ? (
            <div>
              {/* Header Card */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                    Inspecting Book: #{currentBook.id}
                  </div>
                  <h2 className="text-2xl font-black text-white">
                    {currentBook.childName}&apos;s Signature Tale
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Customer: {currentBook.customerEmail} • Created: {currentBook.dateCreated}
                  </p>
                </div>

                <div>
                  {approvedIds.includes(currentBook.id) ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-3 rounded-xl flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" /> Approved (demo — no delivery pipeline)
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApprove(currentBook.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-900/30 transition flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-5 h-5" /> Approve & Deliver Book
                    </button>
                  )}
                </div>
              </div>

              {/* Spreads Inspection List */}
              <div className="mt-6 space-y-6">
                {currentBook.spreads.map((sp, idx) => {
                  const isEditingThis = editingSpreadIndex === idx;

                  return (
                    <div
                      key={sp.id}
                      className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="font-bold text-sm text-slate-200 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                          Spread {sp.spreadNumber} of {currentBook.spreads.length}
                        </span>

                        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" /> Tashkeel Verified
                        </span>
                      </div>

                      {/* Visual & Text Split View */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Illustration Preview */}
                        <div className="space-y-2">
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                            {/* Intentional native <img>: Dynamic AI image preview from dynamic CDN generation URLs without Next.js domain whitelist restriction */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={sp.imgUrl}
                              alt={`Spread ${sp.spreadNumber}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-slate-300">
                              Character Seed: 8492041
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500 font-mono truncate">
                            Prompt: {sp.prompt}
                          </p>
                        </div>

                        {/* Text Inspection & Vowel Editor */}
                        <div className="space-y-4">
                          {/* English Verse */}
                          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              English Poetic Verse
                            </span>
                            <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                              {sp.textEn}
                            </p>
                          </div>

                          {/* Arabic Verse with Tashkeel */}
                          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                                Arabic Verse (مع التشكيل الكامل)
                              </span>
                              {!isEditingThis && (
                                <button
                                  onClick={() => handleStartEdit(idx, sp.textAr)}
                                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition"
                                >
                                  <Edit3 className="w-3 h-3" /> Edit Vowels
                                </button>
                              )}
                            </div>

                            {isEditingThis ? (
                              <div className="space-y-2">
                                <textarea
                                  dir="rtl"
                                  rows={4}
                                  value={editedArText}
                                  onChange={(e) => setEditedArText(e.target.value)}
                                  className="w-full bg-slate-950 text-white font-amiri text-lg p-3 rounded-lg border border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setEditingSpreadIndex(null)}
                                    className="px-3 py-1 text-xs text-slate-400 hover:text-white"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveEdit(idx)}
                                    className="px-3 py-1 text-xs bg-amber-500 text-slate-950 font-bold rounded hover:bg-amber-400"
                                  >
                                    Save Vowels
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p
                                dir="rtl"
                                className="font-amiri text-lg text-amber-100 whitespace-pre-line leading-loose"
                              >
                                {sp.textAr}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              No book selected. Choose one from the queue.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function GatedEditorialQADashboard() {
  return (
    <AdminGate>
      <EditorialQADashboard />
    </AdminGate>
  );
}
