const inquirer = require('inquirer'); 
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const promptUser = () =>


//const generateMarkdown = require('./generateMarkdown.js');

// array of questions for user
inquirer.prompt ([
    {
        type: 'input',
        message: "What is your GitHub username? (No @ needed)",
        name: 'username',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the name of your GitHub repo?",
        name: 'repo',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid GitHub repo is required for a badge.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "What is the title of your project?",
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project title is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        default: 'Project Description',
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid project description is required.");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "If applicable, describe the steps required to install your project for the Installation section.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "If applicable, provide guidelines on how other developers can contribute to your project.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "Choose a license for your project.",
        choices: ['Apache 2.0', 'MIT', 'GNU GPL v3', 'Mozilla', 'Boost'],
        name: 'license'
    }
]);

const generateReadMe = (answers) => {

    let badge = "";

    switch (answers.license) {
        case "Apache 2.0":
            badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            break;
        case "MIT":
            badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            break;
        case "GNU GPL v3":
            badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
            break;
        case "Mozilla":
            badge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            break;
        case "Boost":
            badge = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            break;
    }



return `# ${answers.title}

 ## Description
 
 ${answers.description}

 ## Usage

 ${answers.usage}

 ## Installation

 ${answers.installation}

 ## Contribute

 ${answers.contributing}

 ## GitHub Info

 - ${answers.username}
 - ${answers.repo}

 ## Test

 ${answers.tests}

 ## License

 ${badge}

`;
}


promptUser()
.then((answers) => writeFileAsync('README.md',
generateReadMe(answers)))

.then(() => console.log('Your read me is now ready')
)
.catch((err) => console.error(err));
