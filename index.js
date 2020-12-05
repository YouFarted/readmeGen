// vscode has a suggestion to import things the ES6 way, which I expored but 
// went back to the ES5 way because we're going with tried-and-true node.js 
// methodology in this class and that is ES5 because node existed from before
// ES6
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const generateMarkdown = require('./utils/generateMarkdown.js')

// array of questions for user
const questions = [

];

// function to write README file
function writeToFile(fileName, data) {

    let dirname = path.dirname(fileName)
    fs.mkdir(dirname, {recursive:true}, function(mkdirerr) {
        if(mkdirerr) {
            console.error("mkdir failed with: + " + mkdirerr)
        }
        fs.writeFile(fileName, data, function(err){
            if(err) {
                console.error("writeFile blew up saying:" + err)
                throw err
            }
        })
    });
}

// function to initialize program
function init() {

}

function play() {
    //console.log("hi")
    /*
    console.log(generateMarkdown({
        title: "The title",
    }))
    */
   writeToFile("./dumping_ground/README.md", "blah")
}

// function call to initialize program
//init();
play();