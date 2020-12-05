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