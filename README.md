# HQ_PDC
1. Vào thư mục đang lưu folder HQ-PDC, mở folder HQ-PDC và xóa forder .idea trong folder HQ-PDC
2. Mở folder HQ-PDC bằng trình duyệt chạy code
3. tạo file .env trong folder coin-client với nội dung là:
  - GENERATE_SOURCEMAP=false
  - PORT=3000
  - NEXT_PUBLIC_ENVIRONMENT=development
  - NEXT_PUBLIC_REST_API_ENDPOINT=http://localhost:4003
5. chạy lệnh: cd coin-client
6. sử dụng version node 19.7.0
7. chạy lệnh: npm install --legacy-peer-deps
8. chạy lệnh: npm run dev
