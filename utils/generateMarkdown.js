// function to generate markdown for README
function generateMarkdown(data) {
    return `# ${data.title}
  
  `;
  }
  
module.exports = generateMarkdown;
//export default generateMarkdown <- the correct way of doing this if I were to go the ES6 route