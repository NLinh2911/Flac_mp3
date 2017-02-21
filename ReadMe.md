# Ứng dụng convert flac to mp3

Demo kỹ thuật child-process, BlueBird promise

## Ứng dụng nhận input là đường dẫn của folder gồm nhiều files flac. Output là 1 folder có cấu trúc tương tự gồm các files nhạc được chuyển sang định dạng mp3

## Yêu cầu:
1. Nhận đường dẫn của source folder chứa file flac
2. Scan folder để tìm kiếm file flac -> lọc input cho hàm convert -> chỉ chạy những file flac
3. Tạo một folder tại destination foler để chứa files mp3 có cùng cấu trúc với source folder
4. Converter sử dụng ffmpeg để convert flac sang mp3. Trong quá trình chạy nếu gặp file flac giả, sẽ báo lỗi, và log thông tin file flac giả vào log.txt
5. Trong quá trình chạy, ứng dụng lưu những file đã convert vào 1 file json để lần sau cập nhật file flac mới, ứng dụng convert thẳng file mới mà không convert lại file cũ

#### Note: thay vì sử dụng JSON, có thể

## Chạy thử ứng dụng

```
    git clone https://github.com/NLinh2911/Flac_mp3
    cd Flac_mp3
    // Nhập đường dẫn đầy đủ của source folder chứa files flac cần convert và destination folder muốn chứa mp3
    node --harmony-async-await convert_runner.js
```


## Ứng dụng sử dụng converter.js, scanfile.js and convert_runner.js


### Scan files:
1. Đọc source folder
2. Liệt kê tất cả các files
3. Kiểm tra xem có phải là đuôi file flac
4. Ra 1 array của path file của tất cả file flac
5. Kiểm tra xem file đã được convert trước đây không bằng cách đối chiếu với danh sách flac đã converted được lưu trong doneFiles.json
6. Cuối cùng có 1 array gồm path file chưa convert

### Scan files: 
1. Đọc source folder
2. Liệt kê tất cả các files 
3. Kiểm tra xem có phải là đuôi file flac
4. Ra 1 array của path file của tất cả file flac 
5. Kiểm tra xem file đã được convert trước đây không bằng cách đối chiếu với danh sách flac đã converted được lưu trong doneFiles.json 
6. Cuối cùng có 1 array gồm path file chưa convert 

### Tạo destination folder:
1. Hàm mp3Path nhận array chứa path file của flac và 1 instance của class Converter trong converter.js
2. Instance chứa thông tin source folder và destination folder (constructor của class Converter)
3. Hàm mp3Path chạy qua array chứa path file của flac, với mỗi đường dẫn, thay source folder với destination folder và '.flac' với '.mp3
4. Cuối cùng trả lại 1 array mới chứa path file của mp3 (cấu trúc y hệt của source folder)

### Convert files bằng hàm renderFile:

1. Nhận array chứa path file của flac, array của mp3, hàm converter
2. Giới hạn xử lý 2 files 1 lúc
3. Nếu file convert xong,đổi status sang done và cập nhật json file
4. Nếu bắt lỗi, log tên file lỗi sang log.txt (những file có đuôi .flac nhưng không phải là file flac)

### Hàm tổng hợp chạy các bước là runner   

1. Nhận array chứa path file của flac, array của mp3, hàm converter 
2. Giới hạn xử lý 2 files 1 lúc
3. Nếu file convert xong,đổi status sang done và cập nhật json file
4. Nếu bắt lỗi, log tên file lỗi sang log.txt (những file có đuôi .flac nhưng không phải là file flac) 

### Hàm tổng hợp chạy các bước là runner    

