'use client';

import { useState } from 'react';

export default function ReviewPage() {
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');

    const handleReview = async () => {
        const res = await fetch('/api/review', {
            method: 'POST',
            body: JSON.stringify({ code }),
        });

        const data = await res.json();
        setResult(data.result);
    };

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-xl font-bold">코드 리뷰</h1>

            <textarea
                className="w-full h-60 border p-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <button
                onClick={handleReview}
                className="bg-black text-white px-4 py-2"
            >
                리뷰 요청
            </button>

            <pre className="border p-4 whitespace-pre-wrap">
                {result}
            </pre>
        </div>
    );
}