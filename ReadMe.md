# Ứng dụng convert flac to mp3

Demo kỹ thuật child-process, BlueBird promise

# Ứng dụng nhận input là đường dẫn của folder gồm nhiều files flac. Output là 1 folder có cấu trúc tương tự gồm các files nhạc được chuyển sang định dạng mp3

## Yêu cầu:
1. Nhận đường dẫn của source folder chứa file flac
2. Scan folder để tìm kiếm file flac -> lọc input cho hàm convert -> chỉ chạy những file flac
3. Tạo một folder tại destination foler để chứa files mp3 có cùng cấu trúc với source folder
4. Converter sử dụng ffmpeg để convert flac sang mp3. Trong quá trình chạy nếu gặp file flac giả, sẽ báo lỗi, và log thông tin file flac giả vào log.txt
5. Trong quá trình chạy, ứng dụng lưu những file đã convert vào 1 file json để lần sau cập nhật file flac mới, ứng dụng convert thẳng file mới mà không convert lại file cũ


## Chạy thử ứng dụng

```
    git clone
    cd Flac_mp3
    // Nhập đường dẫn đầy đủ của source folder chứa files flac cần convert và destination folder muốn chứa mp3
    node --harmony-async-await convert_runner.js
```

##