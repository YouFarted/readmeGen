// vscode has a suggestion to import things the ES6 way, which I expored but 
// went back to the ES5 way because we're going with tried-and-true node.js 
// methodology in this class and that is ES5 because node existed from before
// ES6
const fs = require('fs')
const inquirer = require('inquirer')
const generateMarkdown = require('./utils/generateMarkdown.js')

// array of questions for user
const questions = [

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

function play() {
    console.log("hi")
    console.log(generateMarkdown({
        title: "The title",
    }))
}

// function call to initialize program
//init();
play();