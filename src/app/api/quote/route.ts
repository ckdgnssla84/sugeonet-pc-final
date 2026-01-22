import { NextResponse } from 'next/server';

// Slack MCP는 클라이언트 사이드에서 직접 호출하기 어렵고 보안상 서버 사이드 처리가 권장됩니다.
// 이 API는 클라이언트의 견적 신청을 받아 내부 로직(또는 에이전트 도구 트리거용)을 처리하는 역할을 합니다.

export async function POST(request: Request) {
    let slackResult = { success: false, message: '시도 안 함' };

    try {
        const data = await request.json();
        const { type, model, cpu, ram, gpu, phone, memo } = data;

        // 1. Slack Webhook 시도
        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

        if (!slackWebhookUrl) {
            slackResult = { success: false, message: 'SLACK_WEBHOOK_URL 환경변수가 설정되지 않았습니다.' };
        } else {
            try {
                const slackMessage = {
                    text: `* [수거넷 PC - 실시간 견적 신청 알림] *
안녕하세요, 사장님! 새로운 매입 견적 신청이 들어왔습니다. 🚀
(검색용 코드: SUGEONET_TEST_CHECK_${new Date().getTime()})

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

                const slackResponse = await fetch(slackWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(slackMessage),
                });

                if (slackResponse.ok) {
                    slackResult = { success: true, message: '슬랙 전송 성공' };
                } else {
                    const errorText = await slackResponse.text();
                    slackResult = { success: false, message: `슬랙 API 오류: ${slackResponse.status} ${errorText}` };
                    console.error('Slack API Error:', slackResult.message);
                }
            } catch (e: any) {
                slackResult = { success: false, message: `Slack 전송 중 예외 발생: ${e.message}` };
                console.error('Slack Exception:', e);
            }
        }

        // 2. 결과 반환 (디버깅 정보 포함)
        console.log('--- 🆕 견적 신청 처리 결과 ---');
        console.log('데이터:', { type, model, phone });
        console.log('슬랙 결과:', slackResult);
        console.log('------------------------------');

        return NextResponse.json({
            success: true,
            message: slackResult.success
                ? '견적 신청이 성공적으로 접수되었습니다!'
                : `접수는 되었으나 알림 전송에 실패했습니다. (${slackResult.message})`,
            debug: slackResult
        });
    } catch (error: any) {
        console.error('Quote API Global Error:', error);
        return NextResponse.json({
            success: false,
            message: '서버 내부 오류가 발생했습니다.',
            error: error.message
        }, { status: 500 });
    }
}
