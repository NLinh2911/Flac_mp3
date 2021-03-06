//TODO: File này là file phối hợp giữa scanfile.js và converter.js
const Converter = require("./converter").Converter;
const scanFile = require("./scanfile");
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const writer = fs.createWriteStream(__dirname + '/log.txt',{'flags': 'a'});
//const jsonArray = scanFile.jsonArray; // import jsonArray đã đc parsed từ scanfile.js

/*** 
    Func chuyển .flac files thành .mp3 files
    Giới hạn 1 files 1 lần convert
    * @param arrFiles : mảng chứa đường dẫn tới các files .flac  
*/

//Nguyen code
let count = 0;
let done = 0;

  renderFile = (arrFlac,arrMp3,convert)=>{
    arrFlac.forEach((file,index)=>{
        if(count < 4 && file.status === 'not convert'){
            count++;
            file.status ='done';
            convert.flacToMp3(file.name,arrMp3[index]).then(()=>{
                count--;
                done++;
                //jsonArray.push(file.name); // cập nhật converted files vào json
                //fs.writeFileSync('doneFiles.json',JSON.stringify(jsonArray, null, 2), 'utf-8');
                renderFile(arrFlac,arrMp3,convert);
                if(done == arrFlac.length){
                    console.timeEnd("convert");
                }
            }).catch((err) => {
                count--;
                writer.write(err + '\n');
                renderFile(arrFlac,arrMp3,convert);
            });
        }   
    });
 };

// Module make by Nam
 const mp3Path = (pathFlac,convert) => {
    let arrMp3 = [];
    pathFlac.forEach(file => {
        let filename = file.name;
        let desname = filename.replace(convert.sourceFolder,convert.destFolder);
        let temp = desname.replace('.flac', '.mp3');
        arrMp3.push(temp);
    });
    return arrMp3;
};

// Sau khi Merge
// async function runner(srcFolder,desFolder){
//     const myConvert = new Converter(srcFolder,desFolder);
//     const myScanner = new scanFile.ScanFile(srcFolder);
//     //Get array .flac files make by Tung
//     const fileArrFlac = await myScanner.listAllFlac(myScanner.srcFolder);
//     // Tạo array mp3 by Nam
//     const fileArrMp3 = mp3Path(fileArrFlac,myConvert);
//
//     // Convert .flac to .mp3
//     renderFile(fileArrFlac,fileArrMp3,myConvert);
//  }

// Dùng hàm callback
/**
 * @param srcFolder
 * @returns {array} trả lại mảng chứa tất cả file flac
 */
const getArrFlac = (srcFolder) => {
    const myScanner = new scanFile.ScanFile(srcFolder);
    return myScanner.listAllFlac(myScanner.srcFolder);

};
/**
 * Hàm runner2 là hàm cuối cùng tổng hợp các bước
 * @param srcFolder
 * @param desFolder
 * @param getArrFlac
 */
const runner2 = (srcFolder, desFolder, getArrFlac) =>{
    const myConvert = new Converter(srcFolder,desFolder);
    fileArrFlac= getArrFlac(srcFolder);
    const fileArrMp3 = mp3Path(fileArrFlac,myConvert);
    renderFile(fileArrFlac,fileArrMp3,myConvert);
};

console.time("convert");
// Run the app
runner2('/home/linh/Desktop/Adele', '/home/linh/Desktop/new_2', getArrFlac);








