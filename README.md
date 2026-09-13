# 💖 WEBSITE TỎ TÌNH LÃNG MẠN & CHÂN THÀNH

Chào bạn! Đây là website tỏ tình được thiết kế với phong cách hiện đại (**Romantic Glassmorphism**), tập trung 100% vào **sự chân thành và những cảm xúc thật nhất từ trái tim** để bạn thổ lộ cùng người bạn thương.

Đặc biệt: **Website hoàn toàn không cần chèn bất kỳ bức ảnh cá nhân nào** mà vẫn lung linh, trọn vẹn nhờ hệ thống minh họa nghệ thuật, hiệu ứng hạt hoa đào, ánh sao lấp lánh và âm thanh đàn piano êm ái.

---

## 🌟 Kịch Bản Trải Nghiệm 5 Màn

1. **Màn 1 - Chiếc Phong Bì Niêm Phong Sáp 3D:** Khơi gợi sự tò mò. Khi người ấy chạm mở thư -> giai điệu tình ca lãng mạn bắt đầu cất lên êm dịu.
2. **Màn 2 - Vũ Trụ Rung Động (Nhật Ký Cảm Xúc):** 4 chiếc hộp cảm xúc tương tác lưu giữ những lần tim bạn lỡ nhịp vì nàng (*Lần đầu chạm ánh mắt, những đêm trằn trọc nhớ em, những điều nhỏ bé đáng yêu, điều ước lớn nhất*).
3. **Màn 3 - Bức Tâm Thư Đánh Máy Tự Động:** Từng dòng tâm sự chân thành được gõ nắn nót như có người đang viết thư tay trước mắt nàng.
4. **Màn 4 - Lời Tỏ Tình & Nút Chạy Trốn Lém Lỉnh:** Câu hỏi *"Em có đồng ý làm người yêu anh không? ❤️"*. Nút "Từ chối" sẽ tự động chạy trốn khi nàng chạm vào, đồng thời nút "Đồng ý" sẽ to dần lên thôi thúc nàng!
5. **Màn 5 - Đại Tiệc Pháo Hoa & Bản Chứng Nhận Tình Yêu Trọn Đời:** Pháo hoa trái tim bùng nổ và trao tặng tấm **Bản Cam Kết Tình Yêu Trọn Đời (Certificate of Eternal Love)** với 3 lời hứa che chở và yêu thương nàng mãi mãi.

---

## 🚀 Cách Mở Xem Website Ngay Lập Tức

- **Cách 1 (Nhanh nhất):** Bạn chỉ cần vào thư mục `e:\duAnCaNhan\websiteToTinh` và **nhấp đúp vào file `start.bat`** (hoặc `index.html`) để mở ngay trên trình duyệt.
- **Cách 2 (Chạy local server):** Mở terminal tại thư mục này và gõ:
  ```bash
  python -m http.server 3000
  ```
  Sau đó mở trình duyệt truy cập: `http://localhost:3000`

---

## ✏️ Hướng Dẫn Tùy Biến (File `config.js`)

Mọi thông tin cá nhân hóa đều được gom gọn trong **duy nhất 1 file `config.js`**, bạn có thể mở bằng Notepad để chỉnh sửa cực kỳ dễ dàng:

### 1. Đổi tên hai bạn
```javascript
senderName: "Anh",              // Tên của bạn
crushName: "Em Bé Của Anh",     // Tên hoặc biệt danh bạn nữ
```

### 2. Đổi lời tâm sự
Bạn có thể tự do viết lại những câu từ đáy lòng mình tại mục `letter: [ ... ]` trong `config.js`.

### 3. Đổi bài hát bạn thích (nếu muốn)
Mặc định website đã có sẵn bài hát piano lãng mạn online và cả đàn hộp nhạc dự phòng khi mất mạng. Nếu bạn muốn dùng bài hát riêng:
- Copy bài hát mp3 bạn thích vào thư mục `assets/music/song.mp3`.
- Trong `config.js`, đổi `url: "assets/music/song.mp3"`.

---

## 🌐 Cách Đưa Website Lên Mạng (Để gửi link qua Zalo/Messenger)

Để bạn nữ mở được trên điện thoại từ bất cứ đâu, bạn có thể đưa web lên mạng hoàn toàn **miễn phí 100%** trong 1 phút:

### Sử dụng Vercel (Khuyên dùng - Nhanh nhất)
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng Google hoặc GitHub.
2. Kéo thả toàn bộ thư mục `websiteToTinh` vào trang chủ Vercel.
3. Nhấn **Deploy** -> Bạn sẽ nhận được ngay đường link dạng: `https://tang-em.vercel.app` để gửi cho nàng!

Chúc bạn nhận được cái gật đầu ngọt ngào nhất từ người ấy! ❤️
