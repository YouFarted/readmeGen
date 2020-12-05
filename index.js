// vscode has a suggestion to import things the ES6 way, which I expored but 
// went back to the ES5 way because we're going with tried-and-true node.js 
// methodology in this class and that is ES5 because node existed from before
// ES6
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const generateMarkdown = require('./utils/generateMarkdown.js')

const licenceOptions = [
   {name:    'Apache 2.0 License',
    badge:     'https://img.shields.io/badge/License-Apache%202.0-blue.svg',
    summary:   'The Apache License is a permissive free software license written by the Apache Software Foundation (ASF).[5] It allows users to use the software for any purpose, to distribute it, to modify it, and to distribute modified versions of the software under the terms of the license, without concern for royalties. The ASF and its projects release their software products under the Apache License. The license is also used by many non-ASF projects.',
    linkToFull:'https://opensource.org/licenses/Apache-2.0'},

   {name:    'Boost Software License 1.0',
    badge:     'https://img.shields.io/badge/License-Boost%201.0-lightblue.svg',
    summary:   'summary',
    linkToFull:'linkToFull'},

   {name:    'BSD 3-Clause License',
    badge:     'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg',
    summary:   'summary',
    linkToFull:'linkToFull'},

   {name:    'BSD 2-Clause License',
    badge:     'https://img.shields.io/badge/License-BSD%202--Clause-orange.svg',
    summary:   'summary',
    linkToFull:'https://opensource.org/licenses/BSD-2-Clause'},

   {name:  'Creative Commons 1.0',
    badge:   'https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg',
    summary: 'summary',
    linkToFull:'http://creativecommons.org/publicdomain/zero/1.0/'},

   {name:  'Attribution 4.0 International',
    badge:   'https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg',
    summary: 'summary',
    linkToFull:'https://creativecommons.org/licenses/by/4.0/'},

   {name:  'name0',
    badge:   'badge0',
    summary: 'summary0',
    linkToFull:'linkToFull0'},

   {name:  'name1',
    badge:   'badge1',
    summary: 'summary1',
    linkToFull:'linkToFull1'},
]

var licenseChoices = licenceOptions.map(license => license.name)

// array of questions for user
var questions = [
    {name: 'title',
    type: 'input',
    message: "What's the title?"},
    {name: 'githubUser',
    type: 'input',
    message: 'What is your github Username?'},
    {name: 'license',
     type: 'list',
     message: 'What licence do you want?',
     choices: licenseChoices}
];

const meh = []

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
    const answers = inquirer.prompt(questions)
   answers.then(function(answers){
       let licenseIndex = licenseChoices.findIndex(i => i===answers.license)
       let fullLicense = licenceOptions[licenseIndex]
       console.log(fullLicense)
       var markdownData = {
           title: answers.title,
           license: fullLicense
       }
       let markdownText = generateMarkdown(markdownData)
       writeToFile("./dumping_ground/README.md", markdownText)
   })

}

function play() {
    //console.log("hi")
    var markdownData = {
        title: "the title",
        license: {
            name:    'BSD 2-Clause License',
            badge:     'https://img.shields.io/badge/License-BSD%202--Clause-orange.svg',
            summary:   'summary',
            linkToFull:'https://opensource.org/licenses/BSD-2-Clause'},
    
        }
    let markdownText = generateMarkdown(markdownData)
       writeToFile("./dumping_ground/README.md", markdownText)
}

// function call to initialize program
//init();
play();