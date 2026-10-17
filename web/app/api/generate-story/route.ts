import { NextRequest, NextResponse } from 'next/server';
import { StoryEngineFactory } from '@/lib/story-engine/factory';
import { StoryRequest } from '@/types/engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const request: StoryRequest = {
      child: {
        name: body.child?.name || 'Zayed',
        gender: body.child?.gender || 'boy',
        age: body.child?.age || 5,
        appearance: body.child?.appearance,
      },
      theme: body.theme || 'desert',
      language: body.language || 'bilingual',
      dedicationText: body.dedicationText,
      // Bound the requested spread count (min 1, max 14, default 12) so a
      // tampered request cannot force an unbounded generation job.
      spreadCount: Math.min(14, Math.max(1, Math.floor(Number(body.spreadCount) || 12))),
    };

    const engine = StoryEngineFactory.getEngine();

    // Verify name safety
    const moderation = await engine.moderateChildName(request.child.name);
    if (!moderation.isSafe) {
      return NextResponse.json(
        { success: false, error: moderation.flaggedReason || 'Name moderation failed' },
        { status: 400 }
      );
    }

    const story = await engine.generateStory(request);

    return NextResponse.json({
      success: true,
      story,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate storybook';
    console.error('[API GenerateStory] Error generating storybook:', error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
