"use strict"

// function to generate markdown for README
function generateMarkdown(data) {
    return `# ${data.title}

![License](${data.license.badge})

## Table Of Contents
1.  [Description](#description)
2.  [Installation](#installation)
3.  [Usage](#usage)
4.  [License](#license)
5.  [Contributing](#contributing)
6.  [Tests](#tests)
7.  [Questions](#questions)

## Description
${data.description} 
## Installation
${data.installation}
## Usage
${data.usage}
## License
<b>${data.license.name}</b>

${data.license.summary}

Read more about the full license here: ${data.license.linkToMoreInfo}
## Contributing
${data.contributing}
## Tests
${data.tests}
## Questions
github me at ${data.githubUsername}

email me at ${data.email}
`;
  }
  
module.exports = generateMarkdown;
//export default generateMarkdown <- the correct way of doing this if I were to go the ES6 route