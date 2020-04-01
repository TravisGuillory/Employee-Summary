const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];
const confirm = [{
    type: "confirm",
    message: "Add an employee?",
    name: "confirm"
}]

// Question for to determine job title



// Questions to ask all employees
const questions = [{
        type: "list",
        message: "What is your job title?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    },

    {
        type: "input",
        message: "What is  your name?",
        name: "name"
    },

    {
        type: "input",
        message: "What is your id number?",
        name: "id"
    },

    {
        type: "input",
        message: "what is your email address?",
        name: "email"
    }
]

// question for Managers

const managerQuestion = [

    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }
]

const engineerQuestion = [{
    type: "input",
    message: "What is your GitHub username?",
    name: "github"
}]

const internQuestion = [{
    type: "input",
    message: "What is the name of your school",
    name: "school"
}]


const init = async () => {
    const addMember = await inquirer.prompt(confirm)
    // If user confirms that an employee is to be added the proceed to questions
    if (addMember.confirm) {
        const response = await inquirer.prompt(questions);
        switch (response.role) {
            case "Manager":
                return manager(response);
            case "Engineer":
                return engineer(response);
            case "Intern":
                return intern(response);
            default:
                console.log("Incorrect emplopyee type");
                break;
        }

    } else {
        exit(employees);
    }
}

// functions to add the role specific question and push the new employee to the employees array

const manager = async (data) => {
    const managerData = await inquirer.prompt(managerQuestion);
    const elem = new Manager(data.name, data.id, data.email, managerData.officeNumber);
    employees.push(elem);
    init(); // Run init again to allow user to afdd another team member
}

const engineer = async (data) => {
    const engineerData = await inquirer.prompt(engineerQuestion);
    const elem = new Engineer(data.name, data.id, data.email, engineerData.github);
    employees.push(elem);
    init();
}

const intern = async (data) => {
    const internData = await inquirer.prompt(internQuestion);
    const elem = new Intern(data.name, data.id, data.email, internData.school);
    employees.push(elem);
    init();
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// generated html
const exit = (team) => {
    fs.writeFile("./output/team.html", render(team), function (err) {
        if (err) {
            throw err;
        }
        console.log("Created a team, team.html is cresated");
    })
}


init();