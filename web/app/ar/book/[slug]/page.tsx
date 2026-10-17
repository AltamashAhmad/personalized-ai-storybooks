import { permanentRedirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArabicBookSlugRedirectPage({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/ar/books/${slug}`);
}
