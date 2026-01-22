import { NextResponse } from 'next/server';

// Slack MCP는 클라이언트 사이드에서 직접 호출하기 어렵고 보안상 서버 사이드 처리가 권장됩니다.
// 이 API는 클라이언트의 견적 신청을 받아 내부 로직(또는 에이전트 도구 트리거용)을 처리하는 역할을 합니다.

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { type, model, cpu, ram, gpu, phone, memo } = data;

        // Slack Webhook으로 실시간 알림 전송
        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

        if (slackWebhookUrl) {
            const slackMessage = {
                text: `* [수거넷 PC - 실시간 견적 신청 알림] *

안녕하세요, 사장님! 새로운 매입 견적 신청이 들어왔습니다. 🚀

---
📢 **견적 신청 내용**
• **제품:** ${type}
• **모델:** ${model}
• **사양:** ${cpu} / ${ram} / ${gpu}
• **연락처:** ${phone}
• **메모:** ${memo || '없음'}
---

웹사이트에서 확인된 실시간 신청 건입니다. 📞`,
            };

            await fetch(slackWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(slackMessage),
            });
        }

        console.log('--- 🆕 새로운 견적 신청 수신 (서버) ---');
        console.log('제품 종류:', type);
        console.log('모델/제조사:', model);
        console.log('사양:', `${cpu} / ${ram} / ${gpu}`);
        console.log('연락처:', phone);
        console.log('메모:', memo);
        console.log('------------------------------');

        return NextResponse.json({
            success: true,
            message: '견적 신청이 성공적으로 접수되었습니다. 곧 연락드리겠습니다!'
        });
    } catch (error) {
        console.error('Quote API Error:', error);
        return NextResponse.json({
            success: false,
            message: '견적 신청 중 오류가 발생했습니다. 다시 시도해 주세요.'
        }, { status: 500 });
    }
}
