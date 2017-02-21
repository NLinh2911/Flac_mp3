//TODO: File này là file phối hợp giữa scanfile.js và converter.js
const Converter = require("./converter").Converter;
const scanFile = require("./scanfile");
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const writer = fs.createWriteStream(__dirname + '/log.txt',{'flags': 'a'});

/*** 
    Func chuyển .flac files thành .mp3 files
    Giới hạn 1 files 1 lần convert
    * @param arrFiles : mảng chứa đường dẫn tới các files .flac  
*/

//Nguyen code
let count = 0;
let done = 0;
const jsonArray = scanFile.jsonArray;
  renderFile = (arrFlac,arrMp3,convert)=>{
    arrFlac.forEach((file,index)=>{
        if(count < 2 && file.status === 'not convert'){
            count++;
            file.status ='done';
            convert.flacToMp3(file.name,arrMp3[index]).then(()=>{
                count--;
                done++;
                jsonArray.push(file.name);
                fs.writeFileSync('doneFiles.json',JSON.stringify(jsonArray, null, 2), 'utf-8');
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
 let mp3Path = (pathFlac,convert) => {
    let arrMp3 = [];
    pathFlac.forEach(file => {
        let filename = file.name;
        let desname = filename.replace(convert.sourceFolder,convert.destFolder);
            let temp = desname.replace('.flac', '.mp3');
            arrMp3.push(temp);
    });
    return arrMp3;
};

//cach 1
//  async function runner(srcFolder,desFolder){
//     var myConvert = new Converter(srcFolder,desFolder);
//     var myScanner = new ScanFile(srcFolder);
//     //Get array .flac files
//     var fileArr = await myScanner.listAllFlac(myScanner.srcFolder);
//     // Convert .flac to .mp3
//     renderFile(fileArr,myConvert);
//  }

// Sau khi Merge
async function runner(srcFolder,desFolder){
    const myConvert = new Converter(srcFolder,desFolder);
    const myScanner = new scanFile.ScanFile(srcFolder);
    //Get array .flac files make By Tung
    const fileArrFlac = await myScanner.listAllFlac(myScanner.srcFolder);
    // Nam
    const fileArrMp3 = mp3Path(fileArrFlac,myConvert);

    // Convert .flac to .mp3
    renderFile(fileArrFlac,fileArrMp3,myConvert);
 }

console.time("convert");
runner('/home/linh/Desktop/convert', '/home/linh/Desktop/convert_2');








