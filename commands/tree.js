

let fs=require('fs');
let path=require('path');
let types=require('../utility/utility.js');
function treeFn(dirPath){
   
    if(dirPath==undefined){
        // console.log('please enter the path');
        
        treeHelper(process.cwd(),""); 
        //return;
    }else{
        let doesExsist=fs.existsSync(dirPath);
        if(doesExsist){
            
             treeHelper(dirPath,"");   

        }else{
            console.log('please enter the correct path');
        }
    }
}
function treeHelper(dirPath,indent){
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName=path.basename(dirPath);
        console.log(indent+"|--"+fileName);
    }else{
        let dirName=path.basename(dirPath);
        console.log(indent+"|-->"+dirName);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childPath=path.join(dirPath,childrens[i]);
            treeHelper(childPath,indent+"\t")
        }
    }

}

module.exports={
    treeKey:treeFn
}