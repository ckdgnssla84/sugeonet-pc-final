import { NextResponse } from 'next/server';

// Slack MCP는 클라이언트 사이드에서 직접 호출하기 어렵고 보안상 서버 사이드 처리가 권장됩니다.
// 이 API는 클라이언트의 견적 신청을 받아 내부 로직(또는 에이전트 도구 트리거용)을 처리하는 역할을 합니다.

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { type, model, cpu, ram, gpu, phone, memo } = data;

        // 1. Slack Webhook 시도 (설정되어 있을 경우)
        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

        if (slackWebhookUrl) {
            try {
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
확인 부탁드립니다! 📞`,
                };

                await fetch(slackWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(slackMessage),
                });
            } catch (e) {
                console.error('Slack 전송 실패 (무시하고 진행):', e);
            }
        }

        // 2. 서버 로그에 신청 내역 남기기 (Vercel 대시보드에서 실시간 확인 가능)
        console.log('--- 🆕 새로운 견적 신청 수신 ---');
        console.log('데이터:', { type, model, cpu, ram, gpu, phone, memo });
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
