const fs = require('fs');
const path = require('path');

/***
 *
 * @param dir
 * @param done: done là hàm call back có 2 tham số truyền vào là err và result.
 */

const checkFile = (file,extname) => {
    return (path.extname(file) === extname);
};


const walk = (dir, done) => {
    let results = [];

    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);

        list.forEach( (file) => {
            //console.log(file); //here list has all files in dir folder, each instance has its name without the path to it.
            file = path.resolve(dir, file); // add sequences of paths or paths segments into an absolute paths
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) { //check firstly if stat is actually an object
                    walk(file, (err, res) => { //if directory, run walk() again to read files inside it
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    //TODO: kiểm tra file có thỏa mãn yêu cầu tìm kiếm hay không thì mới add vào results.
                    if(checkFile(file,'.flac')){
                        results.push({name: file, status: 'not convert'});
                    }
                    //results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

console.time("dirasync");
walk('/home/linh/Desktop/Adele', (error, list) => {
    console.log(list.length);
    console.log(list);
    console.timeEnd("dirasync");
});
