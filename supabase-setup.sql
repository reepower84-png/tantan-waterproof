-- 문의 테이블 생성
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT '대기중' CHECK (status IN ('대기중', '연락완료', '상담완료')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능하도록 정책 설정 (공개 API용)
CREATE POLICY "Allow all operations" ON inquiries
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON inquiries(status);
