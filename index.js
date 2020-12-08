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
    linkToMoreInfo:'https://opensource.org/licenses/Apache-2.0'},

    {name:    'Boost Software License 1.0',
    badge:     'https://img.shields.io/badge/License-Boost%201.0-lightblue.svg',
    summary:   'This is a simple license that includes a clause on warranty, and encourages free and open use of software licensed under it. You must include the original copyright and this license in software unless in the form of “machine-executable object code generated by a source processor.”',
    linkToMoreInfo:'linkToMoreInfo'},

    {name:    'BSD 3-Clause License',
    badge:     'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg',
    summary:   'Redistribution and use in source and binary forms, with or without modification, are permitted ... + 3 clauses',
    linkToMoreInfo:'linkToMoreInfo'},

    {name:    'BSD 2-Clause License',
    badge:     'https://img.shields.io/badge/License-BSD%202--Clause-orange.svg',
    summary:   'Redistribution and use in source and binary forms, with or without modification, are permitted ... +2 clauses',
    linkToMoreInfo:'https://opensource.org/licenses/BSD-2-Clause'},

    {name:  'Creative Commons 1.0',
    badge:   'https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg',
    summary: 'No Copyright.  The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law. ',
    linkToMoreInfo:'http://creativecommons.org/publicdomain/zero/1.0/'},

    {name:  'Attribution 4.0 International',
    badge:   'https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg',
    summary: 'You are free to: Share — copy and redistribute the material in any medium or format  Adapt — remix, transform, and build upon the material for any purpose, even commercially... so long as you provide attribution ',
    linkToMoreInfo:'https://creativecommons.org/licenses/by/4.0/'},

    {name:  'Attribution-ShareAlike 4.0 International',
    badge:   'https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg',
    summary: 'You are free to: 1) Share — copy and redistribute the material in any medium or format and 2) Adapt — remix, transform, and build upon the material for any purpose, even commercially.',
    linkToMoreInfo:'https://creativecommons.org/licenses/by-sa/4.0/'},

    {name:  'Attribution-NonCommercial 4.0 International',
    badge:   'https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg',
    summary: 'You are free to: 1) Share — copy and redistribute the material in any medium or format and 2) Adapt — remix, transform, and build upon the material.  Note no commercial use.',
    linkToMoreInfo:'https://creativecommons.org/licenses/by-nc/4.0/'},

    {name:  'Attribution-NoDerivates 4.0 International',
    badge:   'https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg',
    summary: 'You are free to:  Share — copy and redistribute the material in any medium or format for any purpose, even commercially.  Note - NO changes are allowed.',
    linkToMoreInfo:'https://creativecommons.org/licenses/by-nd/4.0/'},

    {name:  'Attribution-NonCommmercial-ShareAlike 4.0 International',
    badge:   'https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg',
    summary: 'You are free to: 1) Share — copy and redistribute the material in any medium or format ans 2) Adapt — remix, transform, and build upon the material.  Note no commercial use.',
    linkToMoreInfo:'https://creativecommons.org/licenses/by-nc-sa/4.0/'},

    {name:  'Attribution-NonCommercial-NoDerivatives 4.0 International',
    badge:   'https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg',
    summary: 'Share — copy and redistribute the material in any medium or format.  Note - no commercial use and no changes are allowed',
    linkToMoreInfo:'https://creativecommons.org/licenses/by-nc-nd/4.0/'},

    {name:  'Eclipse Public License 1.0',
    badge:   'https://img.shields.io/badge/License-EPL%201.0-red.svg',
    summary: 'This license, made and used by the Eclipse Foundation, is similar to GPL but allows you to link code under the license to proprietary applications. You may also license binaries under a proprietary license, as long as the source code is available under EPL.',
    linkToMoreInfo:'https://opensource.org/licenses/EPL-1.0'},

    {name:  'GNU GPL v3',
    badge:   'https://img.shields.io/badge/License-GPLv3-blue.svg',
    summary: 'This is the gold-standard open-source license for the sake of keeping software and derived works open-source.  It is absolutely NON permissive.  You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.',
    linkToMoreInfo:'https://www.gnu.org/licenses/gpl-3.0'},

    {name:  'GNU GPL v2',
    badge:   'https://img.shields.io/badge/License-GPL%20v2-blue.svg',
    summary: 'This WAS the gold-standard open-source license for the sake of keeping software and derived works open-source before v3 of it.  It is MOSTLY NON permissive.  What is notable about what sets this apart from v3 is that v3 closed some permisibility gaps and Linus Torvalds, the creator of Linux, eschewed v3 for this reason and stuck with v2.  (Look up "Tivoization" to see precisely what this gap is.  It is named as such because the Tivo company exploited a permissive gap, as the GNU saw it, which prompted the revisions made in the v3)  It is MOSTLY NON permissive.  You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.',
    linkToMoreInfo:'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html'},

    {name:  'GNU AGPL v3',
    badge:   'https://img.shields.io/badge/License-AGPL%20v3-blue.svg',
    summary: 'The AGPL license differs from the other GNU licenses in that it was built for network software. You can distribute modified versions if you keep track of the changes and the date you made them. As per usual with GNU licenses, you must license derivatives under AGPL. It provides the same restrictions and freedoms as the GPLv3 but with an additional clause which makes it so that source code must be distributed along with web publication. Since web sites and services are never distributed in the traditional sense, the AGPL is the GPL of the web.',
    linkToMoreInfo:'https://tldrlegal.com/license/gnu-affero-general-public-license-v3-(agpl-3.0)'},

    {name:  'GNU LGPL v3',
    badge:   'https://img.shields.io/badge/License-LGPL%20v3-blue.svg',
    summary: 'In summary the LGPL states that any non-derivative work can be released under any terms or licenses; Basically that means releasing software that simply uses a LGPL library. A derivative work would be one that makes changes to the source, creating a different work than the originally licensed work.',
    linkToMoreInfo:'https://www.gnu.org/licenses/lgpl-3.0'},

    {name:  'GNU FDL v1.3',
    badge:   'https://img.shields.io/badge/License-FDL%20v1.3-blue.svg',
    summary: 'The purpose of this License is to make a manual, textbook, or other functional and useful document "free" in the sense of freedom: to assure everyone the effective freedom to copy and redistribute it, with or without modifying it, either commercially or noncommercially. Secondarily, this License preserves for the author and publisher a way to get credit for their work, while not being considered responsible for modifications made by others.',
    linkToMoreInfo:'https://www.gnu.org/licenses/fdl-1.3'},

    {name:  'IBM Public License Version 1.0',
    badge:   'https://img.shields.io/badge/License-IPL%201.0-blue.svg',
    summary: 'The IPL differs from the GNU General Public License (GPL), in that it places the liability on the publisher or distributor of the licensed software code. The reason behind this is to facilitate the commercial use of open-source software, without placing the contributor at risk of liability.',
    linkToMoreInfo:'https://opensource.org/licenses/IPL-1.0'},

    {name:  'ISC License (ISC)',
    badge:   'https://img.shields.io/badge/License-ISC-blue.svg',
    summary: 'The ISC license is a permissive free software license published by the Internet Software Consortium, nowadays called Internet Systems Consortium (ISC). It is functionally equivalent to the simplified BSD and MIT licenses',
    linkToMoreInfo:'https://opensource.org/licenses/ISC'},

    {name:  'The MIT License',
    badge:   'https://img.shields.io/badge/License-MIT-yellow.svg',
    summary: 'A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.  There are many variations of this license in use.',
    linkToMoreInfo:'https://tldrlegal.com/license/mit-license'},

    {name:  'Mozilla Public License 2.0',
    badge:   'https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg',
    summary: 'MPL is a copyleft license that is easy to comply with. You must make the source code for any of your changes available under MPL, but you can combine the MPL software with proprietary code, as long as you keep the MPL code in separate files. Version 2.0 is, by default, compatible with LGPL and GPL version 2 or greater. You can distribute binaries under a proprietary license, as long as you make the source available under MPL.',
    linkToMoreInfo:'https://opensource.org/licenses/MPL-2.0'},

    {name:  'Attribution License (BY)',
    badge:   'https://img.shields.io/badge/License-ODC_BY-brightgreen.svg',
    summary: 'You are free: 1) To share: To copy, distribute and use the database. 2) To create: To produce works from the database. 3) To adapt: To modify, transform and build upon the database.  As long as you: Attribute: You must attribute any public use of the database, or works produced from the database, in the manner specified in the license. For any use or redistribution of the database, or works produced from it, you must make clear to others the license of the database and keep intact any notices on the original database.',
    linkToMoreInfo:'https://opendatacommons.org/licenses/by/'},

    {name:  'Open Database License (ODbL)',
    badge:   'https://img.shields.io/badge/License-ODbL-brightgreen.svg',
    summary: 'summary1',
    linkToMoreInfo:'https://opendatacommons.org/licenses/odbl/'},

    {name:  'Public Domain Dedication and License (PDDL)',
    badge:   'https://img.shields.io/badge/License-PDDL-brightgreen.svg',
    summary: ' allows usage, sharing and modification of datasets for any purpose and without any restriction',
    linkToMoreInfo:'https://opendatacommons.org/licenses/pddl/'},

    {name:  'The Perl License AKA The Artistic License 1.0',
    badge:   'https://img.shields.io/badge/License-Perl-0298c3.svg',
    summary: 'The Artistic License is a license for open source software that was originally developed for the Perl programming language. It is now also used for a variety of other open source software as well.',
    linkToMoreInfo:'https://opensource.org/licenses/Artistic-1.0'},

    {name:  'The Artistic License 2.0',
    badge:   'https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg',
    summary: 'This license establishes the terms under which a given free software Package may be copied, modified, distributed, and/or redistributed. The intent is that the Copyright Holder maintains some artistic control over the development of that Package while still keeping the Package available as open source and free software.  It is a revised version of version 1.0 of the same name and strongly recommended over it.',
    linkToMoreInfo:'https://opensource.org/licenses/Artistic-2.0'},

    {name:  'SIL Open Font License 1.1',
    badge:   'https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg',
    summary: 'allows embedding, or "bundling", of a font in commercially sold products.',
    linkToMoreInfo:'https://opensource.org/licenses/OFL-1.1'},

    {name:  'The Unlicense',
    badge:   'https://img.shields.io/badge/license-Unlicense-blue.svg',
    summary: 'The Unlicense is a template for disclaiming copyright monopoly interest in software you\'ve written; in other words, it is a template for dedicating your software to the public domain. It combines a copyright waiver patterned after the very successful public domain SQLite project with the no-warranty statement from the widely-used MIT/X11 license.',
    linkToMoreInfo:'http://unlicense.org/'},

    {name:  'The Do What the Fuck You Want to Public License',
    badge:   'https://img.shields.io/badge/License-WTFPL-brightgreen.svg',
    summary: 'Nearly the entirety of the license is just this:  Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.',
    linkToMoreInfo:'http://www.wtfpl.net/about/'},

    {name:  'The zlib/libpng License',
    badge:   'https://img.shields.io/badge/License-Zlib-lightgrey.svg',
    summary: 'No liability and basically just do what you want.',
    linkToMoreInfo:'https://opensource.org/licenses/Zlib'},
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

    {name: 'email',
    type: 'input',
    message: 'What is your email address?'},

    {name: 'description',
    type: 'input',
    message: 'What is your project description?'},

    {name: 'contributing',
    type: 'input',
    message: 'What are the expectations of contributors in terms of behavior?'},
    
    {name: 'installation',
    type: 'input',
    message: 'How does project installation work?'},

    {name: 'tests',
    type: 'input',
    message: 'How do you run tests?'},

    {name: 'usage',
    type: 'input',
    message: 'Describe how to use the project'},

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
       var markdownData = {
           title: answers.title,
           description: answers.description,
           tests: answers.tests,
           usage: answers.usage,
           contributing: answers.contributing,
           installation: answers.installation,
           email: answers.email,
           githubUsername: answers.githubUser,
           license: fullLicense,
       }
       let markdownText = generateMarkdown(markdownData)
       writeToFile("./dumping_ground/README.md", markdownText)
   })

}

function play() {
    var sampleMarkdownData = {
        title: "the title",
        license: {
            name:    'BSD 2-Clause License',
            badge:     'https://img.shields.io/badge/License-BSD%202--Clause-orange.svg',
            summary:   'bsd 2.0 summary',
            linkToMoreInfo:'https://opensource.org/licenses/BSD-2-Clause'},
        description: "the description",
        installation: "installation steps",
        usage: "usage",
        contributing: "This is a critically UNSAFE ZONE for SJWs.  Any proposals of Terminology warfare will result in cruel and brutal ostracization.  By engaging with 'the community' involved in this software, you either implicitly agree not to be a filthy SJW or you will at least not behave as one in any discussion.  You are strongly encouraged to savagely berate all such people and to spit on them and maybe physically assault them for bonus points.  Such people are revolting, we judge them harshly, and we dilligently and deliberately purge them from our ranks.  Also, use the words master and slave at every opportunity.",
        tests: "test instructions",
        githubUsername: "githubUsername",
        email: "a@b.com"
      }
      
    let markdownText = generateMarkdown(sampleMarkdownData)
    //console.log("markdown: " + markdownText)

    writeToFile("./dumping_ground/README.md", markdownText)
}

// function call to initialize program
init();
//play();
