"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Laptop, Cpu, ShieldCheck, Zap, ArrowRight, Truck, CheckCircle2, Loader2 } from "lucide-react";

export default function Home() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            type: formData.get('type'),
            model: formData.get('model'),
            cpu: formData.get('cpu'),
            ram: formData.get('ram'),
            gpu: formData.get('gpu'),
            phone: formData.get('phone'),
            memo: formData.get('memo'),
        };

        try {
            const response = await fetch('/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
                // 3초 후 폼 초기화
                setTimeout(() => {
                    setIsSubmitted(false);
                    if (e.target instanceof HTMLFormElement) e.target.reset();
                }, 3000);
            } else {
                alert('신청 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Submit Error:', error);
            alert('네트워크 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-slate-950 py-20">
                {/* Background Decorative Circles */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
                                Premium Tech Buyback Service
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black leading-[1.05] mb-8 tracking-tighter text-slate-900 dark:text-white">
                                중고 PC의<br />
                                <span className="bg-gradient-to-r from-primary via-blue-600 to-secondary bg-clip-text text-transparent">
                                    새로운 가치
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-10 max-w-xl leading-relaxed font-medium">
                                복잡한 과정은 생략하세요. <br />
                                정직한 견적으로 오늘 바로 현금화해 드립니다.
                            </p>
                            <div className="flex flex-wrap gap-5">
                                <a
                                    href="#form"
                                    className="flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-[0.97]"
                                >
                                    무료 견적 신청 <ArrowRight className="w-6 h-6" />
                                </a>
                                <a
                                    href="#process"
                                    className="px-10 py-5 rounded-2xl text-xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-slate-600 dark:text-slate-300"
                                >
                                    매입 절차 보기
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 p-2">
                                <img
                                    src="/images/hero-3d.png"
                                    alt="Modern Tech Illustration"
                                    className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] animate-float"
                                />
                            </div>
                            {/* Soft Glow Underneath */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats/Features Section */}
            <section className="py-24 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Zap className="w-10 h-10 text-primary" />,
                                title: "10분 내 견적 완료",
                                desc: "신청 즉시 전문 상담원이 실시간 시세를 반영한 최고가를 제시합니다."
                            },
                            {
                                icon: <Truck className="w-10 h-10 text-secondary" />,
                                title: "당일 무료 수거",
                                desc: "전국 어디든 고객님이 계신 곳으로 당일 달려가 직접 수거합니다."
                            },
                            {
                                icon: <ShieldCheck className="w-10 h-10 text-accent" />,
                                title: "완벽 데이터 파기",
                                desc: "국제 규격 데이터 삭제 솔루션으로 개인정보를 안전하게 영구 파기합니다."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="group p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                            >
                                <div className="mb-8 p-5 bg-slate-50 dark:bg-slate-800 w-fit rounded-3xl group-hover:bg-primary/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" className="py-32 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">서비스 이용 안내</h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">어렵고 복잡한 매입 절차는 이제 그만. <br /> 누구나 4단계로 쉽고 빠르게 매각하세요.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {[
                            { step: "01", title: "견적 신청", desc: "기기의 기본 사양과 사진을 업로드해 주세요." },
                            { step: "02", title: "최종 보상가 안내", desc: "검수 후 해피콜을 통해 매입가를 확정합니다." },
                            { step: "03", title: "방문 및 기기 수거", desc: "전문 기사가 직접 방문하여 제품을 픽업합니다." },
                            { step: "04", title: "당일 입금", desc: "제품 수거 즉시 고객님의 계좌로 입금해 드립니다." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
                            >
                                <div className="text-5 font-black text-primary/10 absolute top-4 right-6">{step.step}</div>
                                <h4 className="text-2xl font-bold mb-3 relative z-10">{step.title}</h4>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-normal">{step.desc}</p>
                                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20"><ArrowRight className="w-6 h-6 text-slate-300" /></div>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form Section */}
            <section id="form" className="py-32 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 dark:bg-slate-950 p-10 md:p-16 rounded-[50px] border border-slate-200 dark:border-slate-800 shadow-3xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden"
                    >
                        {isSubmitted && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 z-20 bg-primary/95 flex flex-col items-center justify-center text-white text-center p-8 backdrop-blur-sm"
                            >
                                <CheckCircle2 className="w-20 h-20 mb-6 animate-bounce" />
                                <h3 className="text-3xl font-bold mb-4">신청 완료!</h3>
                                <p className="text-xl opacity-90">견적 신청이 성공적으로 접수되었습니다.<br />전화를 조금만 기다려 주세요!</p>
                            </motion.div>
                        )}

                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-black mb-5">무료 견적 신청</h2>
                            <p className="text-lg text-slate-500 font-medium">정확한 매입가 산정을 위해 정보를 입력해 주세요.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-base font-bold text-slate-700 dark:text-slate-300 ml-1">제품 종류</label>
                                    <select name="type" required className="w-full px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg appearance-none">
                                        <option value="">종류를 선택하세요</option>
                                        <option>데스크탑</option>
                                        <option>노트북</option>
                                        <option>모니터</option>
                                        <option>애플 (맥북/아이맥)</option>
                                        <option>기타 부품</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-base font-bold text-slate-700 dark:text-slate-300 ml-1">모델명 또는 제조사</label>
                                    <input
                                        name="model"
                                        required
                                        type="text"
                                        placeholder="예: 삼성 갤럭시북, LG 그램 등"
                                        className="w-full px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">CPU</label>
                                    <input name="cpu" required type="text" placeholder="예: i7-13세대" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/5 outline-none" />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">RAM</label>
                                    <input name="ram" required type="text" placeholder="예: 16GB" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/5 outline-none" />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 ml-1">GPU</label>
                                    <input name="gpu" required type="text" placeholder="예: RTX 3060" className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/5 outline-none" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-base font-bold text-slate-700 dark:text-slate-300 ml-1">연락처</label>
                                <input
                                    name="phone"
                                    required
                                    type="tel"
                                    placeholder="010-0000-0000"
                                    className="w-full px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-base font-bold text-slate-700 dark:text-slate-300 ml-1">추가 상담 내용 (선택)</label>
                                <textarea
                                    name="memo"
                                    rows={4}
                                    placeholder="외관 파손 여부나 기타 특이사항을 입력해 주세요."
                                    className="w-full px-6 py-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary-dark text-white py-6 rounded-2xl text-2xl font-black transition-all shadow-2xl shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-4 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>신청 중... <Loader2 className="w-8 h-8 animate-spin" /></>
                                ) : (
                                    <>무료 견적 받기 <CheckCircle2 className="w-8 h-8" /></>
                                )}
                            </button>

                            <p className="text-center text-sm text-slate-400 mt-6 font-medium">
                                * 입력하신 정보는 안전하게 보호되며 상담 목적으로만 사용됩니다.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-32 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">자주 묻는 질문</h2>
                        <p className="text-xl text-slate-500 font-medium">이용 고객님들이 가장 많이 궁금해하시는 내용을 모았습니다.</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { q: "매입 가격은 어떻게 결정되나요?", a: "현재 시장 중고 시세를 바탕으로 기기의 사양, 외관 상태, 작동 여부 등을 종합적으로 판단하여 최적의 가격을 제시해 드립니다." },
                            { q: "전국 어디든 방문이 가능한가요?", a: "서울 및 수도권은 당일 방문이 가능하며, 기타 지역은 협의 후 방문 또는 안전한 택배 매입으로 진행됩니다." },
                            { q: "데이터 삭제는 믿을 수 있나요?", a: "국제 표준 데이터 삭제 솔루션을 사용하여 복구가 불가능하도록 영구 삭제하며, 완료 후 요청 시 삭제 보고서를 제공합니다." },
                            { q: "고장 난 컴퓨터도 매입하시나요?", a: "네, 고장 나거나 파손된 기기도 부품 가치를 산정하여 매입이 가능합니다. 상세 사양을 알려주시면 상세 견적을 드릴 수 있습니다." }
                        ].map((item, i) => (
                            <details key={i} className="group bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 open:ring-4 open:ring-primary/5 transition-all">
                                <summary className="flex items-center justify-between cursor-pointer font-bold text-xl list-none">
                                    <span>{item.q}</span>
                                    <span className="transition-transform group-open:rotate-180 text-primary">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </span>
                                </summary>
                                <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg border-t border-slate-100 dark:border-slate-800 pt-6 font-normal">
                                    {item.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
