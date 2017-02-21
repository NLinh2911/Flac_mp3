
//TODO: Hãy viết lệnh để liệt kê tất cả các file phù hợp với một pattern đề ra trả về danh sách các file quét được
//
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

//read and call the json file of converted flac files
// Export the json file
const readDoneFiles = fs.readFileSync("doneFiles.json");
exports.readDoneFiles = readDoneFiles;
const jsonArray = JSON.parse(readDoneFiles);
exports.jsonArray = jsonArray;


exports.ScanFile = class {

    /*** Constructor
     * @param sourceFolder đường dẫn tới thư mục file flac
     */ 
    constructor(sourceFolder){
        this.srcFolder = sourceFolder;
    }

    /***
     * Hàm liệt kê danh sách file
     * @param dir
     * @param files_
     * @returns {*|Array}
     */
    getFiles(dir, files_) {
        files_ = files_ || [];
        let files = fs.readdirSync(dir);
        for (let i in files) {
            let name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()) {
                this.getFiles(name, files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }

    /***
     * Hàm kiểm tra file .flac
     * @param file
     * @returns {*}
     */
    checkFlac(file, extname) {
        return path.extname(file) === extname;
    }

    /***
     * Hàm liệt kê danh sách .flac file
     * @param dir
     * @returns {Array}
     */
    addFlac(dir,check) {
        return new Promise((resolve, reject) => {
            let allFiles = this.getFiles(dir);
            let flacFiles = [];
            allFiles.forEach(file => {
                if(check(file,'.flac')){
                    flacFiles.push({name: file, status: 'not convert'});
                }
            });
            resolve(flacFiles);
        });
    }
    //TODO: Hàm kiểm tra array của tất cả flac với json file đã converted
     /***
      * Hàm kiểm tra array của tất cả flac với json file đã converted
      * @{param} invalidArr = array parsed từ JSON file
      * @{param} arrFlac = array gồm tất cả flac files
      * @{return} new arrFlac gồm những files chưa convert
      */
     checkJson (invalidArr, arrFlac){
         for (let i = arrFlac.length; i--;) {
             let exist = invalidArr.some(function(element) {
                 return element == arrFlac[i].name;
             });
             if (exist)
                 arrFlac.splice(i, 1);
         }
         return arrFlac;
     };

    /***
     * Hàm hứng kết quả trả về từ hàm addFlac
     * @param dir
     * @returns {Promise.<Array>}
     */


    async listAllFlac(dir) {
        let arrFlac = await this.addFlac(dir,this.checkFlac);
        //compare it to arrFlac -> remove duplicates
        const newArrFlac = this.checkJson(jsonArray, arrFlac);
        //console.timeEnd("scanSync");
        return newArrFlac;
    }
};

//
// console.time("scanSync");
//const scanner = new ScanFile('/home/linh/Desktop/Adele');



