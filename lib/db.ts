import fs from "fs";
import path from "path";

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: "대기중" | "연락완료" | "상담완료";
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), "data", "inquiries.json");

// 데이터 디렉토리 및 파일 초기화
function ensureDataFile() {
  const dataDir = path.dirname(DB_PATH);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

// 모든 문의 조회
export function getInquiries(): Inquiry[] {
  ensureDataFile();
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

// 문의 추가
export function addInquiry(inquiry: Omit<Inquiry, "id" | "status" | "createdAt">): Inquiry {
  ensureDataFile();
  const inquiries = getInquiries();

  const newInquiry: Inquiry = {
    ...inquiry,
    id: generateId(),
    status: "대기중",
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  fs.writeFileSync(DB_PATH, JSON.stringify(inquiries, null, 2));

  return newInquiry;
}

// 문의 상태 업데이트
export function updateInquiryStatus(id: string, status: Inquiry["status"]): Inquiry | null {
  ensureDataFile();
  const inquiries = getInquiries();
  const index = inquiries.findIndex((inq) => inq.id === id);

  if (index === -1) return null;

  inquiries[index].status = status;
  fs.writeFileSync(DB_PATH, JSON.stringify(inquiries, null, 2));

  return inquiries[index];
}

// 문의 삭제
export function deleteInquiry(id: string): boolean {
  ensureDataFile();
  const inquiries = getInquiries();
  const filteredInquiries = inquiries.filter((inq) => inq.id !== id);

  if (filteredInquiries.length === inquiries.length) return false;

  fs.writeFileSync(DB_PATH, JSON.stringify(filteredInquiries, null, 2));
  return true;
}

// 고유 ID 생성
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
