"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// 네비게이션 메뉴 아이템
const navItems = [
  { id: "home", label: "홈" },
  { id: "services", label: "서비스" },
  { id: "why-us", label: "왜 탄탄방수타일?" },
  { id: "process", label: "시공 과정" },
  { id: "reviews", label: "고객 후기" },
  { id: "contact", label: "무료 상담" },
];

// 서비스 데이터
const services = [
  {
    icon: "🏠",
    title: "욕실 방수",
    description: "욕실 누수, 곰팡이 문제를 완벽하게 해결합니다. 타일 시공부터 방수까지 원스톱 서비스.",
  },
  {
    icon: "🌿",
    title: "베란다 방수",
    description: "베란다 누수로 인한 하자를 예방합니다. 외부 환경에도 강한 방수 시공.",
  },
  {
    icon: "🏢",
    title: "옥상 방수",
    description: "건물 옥상의 완벽한 방수 처리로 누수 걱정 없는 건물을 만들어 드립니다.",
  },
  {
    icon: "🔧",
    title: "타일 시공",
    description: "다양한 디자인의 타일로 공간을 새롭게 변화시켜 드립니다.",
  },
];

// 왜 선택해야 하는가 데이터
const whyUsItems = [
  {
    number: "01",
    title: "타일·방수 전문가",
    description: "오랜 경험으로 쌓아온 노하우로 정확한 진단과 시공을 약속합니다.",
  },
  {
    number: "02",
    title: "투명한 견적",
    description: "숨겨진 비용 없이 정직한 가격으로 견적을 드립니다.",
  },
  {
    number: "03",
    title: "철저한 A/S",
    description: "시공 후에도 책임지는 철저한 사후 관리 서비스를 제공합니다.",
  },
  {
    number: "04",
    title: "프리미엄 자재",
    description: "검증된 최고급 자재만을 사용하여 오래가는 시공을 보장합니다.",
  },
];

// 시공 과정 데이터
const processSteps = [
  { step: 1, title: "무료 상담", description: "전화 또는 온라인으로 상담 신청" },
  { step: 2, title: "현장 방문", description: "전문가가 직접 현장 확인 및 진단" },
  { step: 3, title: "견적 안내", description: "투명하고 합리적인 견적 제공" },
  { step: 4, title: "시공 진행", description: "꼼꼼한 방수 및 타일 시공" },
  { step: 5, title: "완료 및 A/S", description: "시공 완료 후 철저한 사후 관리" },
];

// 고객 후기 데이터
const reviews = [
  {
    name: "김*영",
    location: "인천 계양구",
    type: "욕실 방수",
    rating: 5,
    content: "오래된 아파트 욕실 누수로 아래층에 피해가 갈까 걱정이 많았는데, 탄탄방수타일에서 꼼꼼하게 시공해주셔서 이제 걱정 없이 살고 있습니다. 견적도 투명하고 설명도 자세히 해주셔서 믿음이 갔어요.",
    date: "2024.01",
  },
  {
    name: "박*수",
    location: "서울 강서구",
    type: "베란다 방수",
    rating: 5,
    content: "베란다 창틀 주변으로 비가 오면 물이 새서 곰팡이가 피었었는데, 시공 후 완전히 해결됐습니다. 사장님이 직접 오셔서 원인 파악부터 해주시고, A/S도 확실하게 해주신다고 하니 안심이 됩니다.",
    date: "2024.01",
  },
  {
    name: "이*희",
    location: "인천 부평구",
    type: "옥상 방수",
    rating: 5,
    content: "건물 옥상 방수가 낡아서 여러 업체 견적 받아봤는데, 탄탄방수타일이 가장 합리적이었고 시공도 깔끔했습니다. 장마철에도 누수 없이 잘 버티고 있어요. 강력 추천합니다!",
    date: "2023.12",
  },
  {
    name: "최*진",
    location: "서울 마포구",
    type: "욕실 타일 + 방수",
    rating: 5,
    content: "20년 된 욕실 리모델링했는데 결과물이 너무 만족스럽습니다. 타일 선택부터 방수 시공까지 하나하나 신경 써주시고, 시공 기간도 약속대로 딱 맞춰주셨어요. 지인들한테도 소개했습니다.",
    date: "2023.12",
  },
  {
    name: "정*미",
    location: "인천 연수구",
    type: "욕실 방수",
    rating: 5,
    content: "화장실 바닥 타일 사이로 물이 스며들어서 걱정했는데, 전문가 눈으로 바로 문제점 찾아주시고 해결해 주셨어요. 시공 후 한 달 지났는데 물 샘 전혀 없습니다. 가격 대비 만족도 최고!",
    date: "2023.11",
  },
  {
    name: "홍*표",
    location: "경기 부천시",
    type: "베란다 방수 + 타일",
    rating: 5,
    content: "확장한 베란다 방수가 부실해서 겨울마다 결로 때문에 고생했는데, 탄탄방수타일에서 제대로 다시 해주셨습니다. 이번 겨울은 결로 걱정 없이 따뜻하게 보낼 수 있을 것 같아요.",
    date: "2023.11",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // 스크롤 감지 및 활성 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 부드러운 스크롤 이동
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // 문의 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 / 네비게이션 */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* 로고 */}
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <Image
                src="/ChatGPT_Image_2026년_1월_25일_오후_08_05_43_2-removebg-preview.png"
                alt="탄탄방수타일"
                width={200}
                height={70}
                className="h-14 md:h-16 w-auto"
                priority
              />
            </div>

            {/* 데스크톱 메뉴 */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    isScrolled
                      ? activeSection === item.id
                        ? "text-[#1A4B8E]"
                        : "text-gray-600 hover:text-[#1A4B8E]"
                      : activeSection === item.id
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F58220] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA 버튼 (데스크톱) */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-[#F58220] hover:bg-[#e06c00] text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                무료 상담 신청
              </button>
            </div>

            {/* 햄버거 메뉴 (모바일) */}
            <button
              className={`md:hidden p-2 ${isMenuOpen ? "hamburger-open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`hamburger-line block w-full h-0.5 rounded-full transition-all ${
                    isScrolled ? "bg-gray-800" : "bg-white"
                  }`}
                />
                <span
                  className={`hamburger-line block w-full h-0.5 rounded-full transition-all ${
                    isScrolled ? "bg-gray-800" : "bg-white"
                  }`}
                />
                <span
                  className={`hamburger-line block w-full h-0.5 rounded-full transition-all ${
                    isScrolled ? "bg-gray-800" : "bg-white"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* 모바일 메뉴 */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <div className="bg-white rounded-lg shadow-lg p-4 mt-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeSection === item.id
                      ? "bg-[#1A4B8E]/10 text-[#1A4B8E]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full mt-4 bg-[#F58220] hover:bg-[#e06c00] text-white px-6 py-3 rounded-full font-semibold transition-all"
              >
                무료 상담 신청
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 히어로 섹션 */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
            alt="욕실 타일 배경"
            fill
            className="object-cover"
            priority
          />
          {/* 오버레이 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f3460]/90 via-[#1A4B8E]/85 to-[#2563a8]/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            타일은 깔고,
            <br />
            <span className="text-[#F58220]">방수는 설계</span>합니다.
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            타일·방수 전문가가 보이지 않는 곳까지 꼼꼼하게 시공합니다.
            <br />
            지금 무료 상담을 신청하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-secondary text-lg px-8 py-4"
            >
              무료 상담 신청하기
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold transition-all backdrop-blur-sm"
            >
              서비스 알아보기
            </button>
          </div>
        </div>

        {/* 스크롤 다운 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* 서비스 섹션 */}
      <section id="services" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              전문 시공 서비스
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              보이지 않는 곳까지 시공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card group cursor-pointer"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1A4B8E] transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-700 mb-6 font-medium">
              지금 막지 않으면 공사가 더 커집니다.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary text-lg"
            >
              지금 바로 상담받기
            </button>
          </div>
        </div>
      </section>

      {/* 왜 탄탄방수타일인가 섹션 */}
      <section id="why-us" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 탄탄방수타일인가요?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              고객님의 소중한 공간을 책임집니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyUsItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-6 rounded-2xl hover:bg-[#1A4B8E]/10 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#1A4B8E] to-[#2563a8] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{item.number}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 시공 과정 섹션 */}
      <section id="process" className="py-20 md:py-28 bg-gradient-to-br from-[#0f3460] to-[#1A4B8E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              시공 과정
            </h3>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              체계적인 프로세스로 완벽한 시공을 약속합니다
            </p>
          </div>

          <div className="relative">
            {/* 연결선 (데스크톱) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-[#2563a8] -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                    <span className="text-2xl font-bold text-[#1A4B8E]">{step.step}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-blue-200 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-secondary text-lg"
            >
              무료 상담으로 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* 고객 후기 섹션 */}
      <section id="reviews" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              고객 후기
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              탄탄방수타일을 선택해주신 고객님들의 생생한 후기입니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* 별점 */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#F58220]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* 시공 유형 태그 */}
                <span className="inline-block px-3 py-1 bg-[#1A4B8E]/10 text-[#1A4B8E] text-sm font-medium rounded-full mb-3">
                  {review.type}
                </span>

                {/* 후기 내용 */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  &ldquo;{review.content}&rdquo;
                </p>

                {/* 고객 정보 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <p className="text-sm text-gray-400">{review.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-700 mb-6 font-medium">
              다음 만족스러운 후기의 주인공이 되어보세요
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-primary text-lg"
            >
              무료 상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* 문의 폼 섹션 */}
      <section id="contact" className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              무료 상담 신청
            </h3>
            <p className="text-lg text-gray-600">
              빠른 시간 내에 연락드리겠습니다
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="이름을 입력해주세요"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  전화번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                  placeholder="010-0000-0000"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  상담 문의
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field resize-none"
                  placeholder="문의하실 내용을 자유롭게 입력해주세요 (시공 위치, 문제 상황 등)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#1A4B8E] to-[#2563a8] hover:from-[#0f3460] hover:to-[#1A4B8E] text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? "전송 중..." : "무료 상담 신청하기"}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                  <p className="text-green-800 font-medium">
                    상담 신청이 완료되었습니다! 빠른 시간 내에 연락드리겠습니다.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
                  <p className="text-red-800 font-medium">
                    전송에 실패했습니다. 다시 시도해주세요.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <Image
                src="/ChatGPT_Image_2026년_1월_25일_오후_08_05_43_2-removebg-preview.png"
                alt="탄탄방수타일"
                width={220}
                height={80}
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 mb-4">
                타일은 깔고, 방수는 설계합니다.
                <br />
                보이지 않는 곳까지 시공합니다.
              </p>
            </div>
            <div className="md:text-right">
              <h5 className="text-lg font-semibold mb-4">회사 정보</h5>
              <div className="text-gray-400 space-y-1">
                <p>상호: 제이코리아</p>
                <p>대표: 이주영</p>
                <p>사업자등록번호: 278-30-01540</p>
                <p>주소: 인천광역시 계양구 오조산로57번길 15, 7층 7106호</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} 탄탄방수타일. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* 카카오톡 플로팅 버튼 */}
      <a
        href="http://pf.kakao.com/_xlmxlhX/chat"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 overflow-hidden"
        aria-label="카카오톡 상담"
      >
        <Image
          src="/카톡_원형_로고.png"
          alt="카카오톡 상담"
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  );
}
