
let fs=require('fs');
let path=require('path');
let types=require('../utility/utility.js');
function organizeFn(dirPath){
    // console.log('organize cmd implemented for',dirPath);

    //1. input->directory path given
    let destPath;
    if(dirPath==undefined){
        console.log('please enter the path');
        // destPath=process.cwd();
        return;
    }else{
        let doesExsist=fs.existsSync(dirPath);
        if(doesExsist){
            //2.create-> organized_filea ->directory
             destPath=path.join(dirPath,'organize_files'); //making the path
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);//making the directory
            }
            

        }else{
            console.log('please enter the correct path');
        }
    }

    //3.identifying categories of all the files present in that input directory
    organizeHelper(dirPath,destPath);
    //transfer files to that directory categories wise
}
function organizeHelper(src,des){
    let childNames=fs.readdirSync(src);
    //console.log(childNames);
    for(let i=0;i<childNames.length;i++){
        let childAddress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category=getCategory(childNames[i]);
           console.log(childNames[i],"  belongs to this -->>  ",category);
           sendFile(childAddress,des,category);
        }
    }
}
function sendFile(src,des,category){
    let categoryPath=path.join(des,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName=path.basename(src);
    let destFilePath=path.join(categoryPath,fileName);
    
    if(fs.existsSync(destFilePath)==false){
        fs.copyFileSync(src,destFilePath);
    }
    console.log(fileName,"copied to--> ",category);
    fs.unlinkSync(src);
}
function getCategory(name){
    let ext=path.extname(name);
   // console.log(ext);
    ext=ext.slice(1);
    for(let type in types ){
        let currentType=types[type];
        for(let i=0;i<currentType.length;i++){
            if(ext==currentType[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizeKey:organizeFn
}

