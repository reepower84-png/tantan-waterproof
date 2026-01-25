"use client";

import { useState, useEffect } from "react";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: "대기중" | "연락완료" | "상담완료";
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | Inquiry["status"]>("all");

  // 로그인 처리
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("adminAuth", "true");
        fetchInquiries();
      } else {
        setAuthError("비밀번호가 올바르지 않습니다.");
      }
    } catch {
      setAuthError("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 문의 목록 조회
  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/inquiries");
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 상태 업데이트
  const handleStatusChange = async (id: string, status: Inquiry["status"]) => {
    try {
      const response = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  // 문의 삭제
  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    }
  };

  // 로그아웃
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
    setPassword("");
  };

  // 세션 확인
  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchInquiries();
    }
  }, []);

  // 필터링된 문의 목록
  const filteredInquiries = inquiries.filter(
    (inq) => filter === "all" || inq.status === filter
  );

  // 상태별 색상
  const getStatusColor = (status: Inquiry["status"]) => {
    switch (status) {
      case "대기중":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "연락완료":
        return "bg-[#1A4B8E]/10 text-[#1A4B8E] border-[#1A4B8E]/30";
      case "상담완료":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // 날짜 포맷
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="text-gray-600 mt-2">탄탄방수타일 어드민</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1A4B8E] transition-colors"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm text-center">{authError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#1A4B8E] hover:bg-[#0f3460] text-white font-semibold rounded-xl transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 어드민 대시보드
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">
              탄탄방수타일 관리자
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm">전체 문의</p>
            <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-yellow-600 text-sm">대기중</p>
            <p className="text-3xl font-bold text-yellow-600">
              {inquiries.filter((i) => i.status === "대기중").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-[#1A4B8E] text-sm">연락완료</p>
            <p className="text-3xl font-bold text-[#1A4B8E]">
              {inquiries.filter((i) => i.status === "연락완료").length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-green-600 text-sm">상담완료</p>
            <p className="text-3xl font-bold text-green-600">
              {inquiries.filter((i) => i.status === "상담완료").length}
            </p>
          </div>
        </div>

        {/* 필터 및 새로고침 */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {["all", "대기중", "연락완료", "상담완료"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as typeof filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? "bg-[#1A4B8E] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {status === "all" ? "전체" : status}
              </button>
            ))}
          </div>
          <button
            onClick={fetchInquiries}
            disabled={isLoading}
            className="px-4 py-2 bg-white text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            새로고침
          </button>
        </div>

        {/* 문의 목록 */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-[#1A4B8E] border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-500 mt-4">로딩 중...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">문의 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* 데스크톱 테이블 */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      이름
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      전화번호
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      문의내용
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      접수일시
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      상태
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      관리
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-[#1A4B8E] hover:underline"
                        >
                          {inquiry.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {inquiry.message || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={inquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              inquiry.id,
                              e.target.value as Inquiry["status"]
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer ${getStatusColor(
                            inquiry.status
                          )}`}
                        >
                          <option value="대기중">대기중</option>
                          <option value="연락완료">연락완료</option>
                          <option value="상담완료">상담완료</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 모바일 카드 */}
            <div className="md:hidden divide-y divide-gray-100">
              {filteredInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{inquiry.name}</p>
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="text-[#1A4B8E] text-sm"
                      >
                        {inquiry.phone}
                      </a>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>

                  {inquiry.message && (
                    <p className="text-gray-600 text-sm mb-3">{inquiry.message}</p>
                  )}

                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-xs">
                      {formatDate(inquiry.created_at)}
                    </p>
                    <div className="flex gap-2">
                      <select
                        value={inquiry.status}
                        onChange={(e) =>
                          handleStatusChange(
                            inquiry.id,
                            e.target.value as Inquiry["status"]
                          )
                        }
                        className="px-2 py-1 rounded-lg border text-xs font-medium bg-white"
                      >
                        <option value="대기중">대기중</option>
                        <option value="연락완료">연락완료</option>
                        <option value="상담완료">상담완료</option>
                      </select>
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="text-red-600 text-xs font-medium px-2 py-1"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
