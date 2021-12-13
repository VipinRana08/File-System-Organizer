#!/usr/bin/env node
let fs=require('fs');
let path=require('path');

let organizeObj=require('./commands/organize');
let treeObj=require('./commands/tree');

const inputArr=process.argv.slice(2);
//console.log(inputArr);

const command=inputArr[0];

switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
  
    default:
        console.log('command not found:😢'); 
        break;   
}


