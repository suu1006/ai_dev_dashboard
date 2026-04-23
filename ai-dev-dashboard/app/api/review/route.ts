import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { code } = await req.json();

    if (!code?.trim()) {
        return NextResponse.json({ error: '코드를 입력해주세요.' }, { status: 400 });
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            input: `다음 코드를 리뷰해줘. 문제점과 개선점을 설명해줘:\n${code}`,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('[OpenAI API Error]', data);
        return NextResponse.json(
            { error: data.error?.message ?? 'OpenAI API 오류가 발생했습니다.' },
            { status: response.status }
        );
    }

    const text = data.output?.[0]?.content?.[0]?.text;

    if (!text) {
        console.error('[Unexpected response shape]', JSON.stringify(data));
        return NextResponse.json(
            { error: '응답 형식이 예상과 다릅니다.' },
            { status: 500 }
        );
    }

    return NextResponse.json({ result: text });
}