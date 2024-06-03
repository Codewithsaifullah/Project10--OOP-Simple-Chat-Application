#!/usr/bin/env node

import inquirer from "inquirer";

class Student {
  name: String;
  constructor(name: string) {
    this.name = name;
  }
}

class Person {
  students: Student[] = [];

  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new Person();

const startProgram = async (persons: Person) => {
  console.log("\n Welcome to Simple Chat Application");
  do {
    const ans = await inquirer.prompt([
      {
        name: "selection",
        type: "list",
        message: "Which one do you want to chat",
        choices: ["My Self", "Student"],
      },
    ]);

    if (ans.selection == "My Self") {
      console.log("Hello! How are you?");
      console.log("I am fine");
    } else if (ans.selection == "Student") {
      const ans = await inquirer.prompt([
        {
          name: "resp",
          type: "input",
          message: "Which student you would like to chat?",
        },
      ]);
      const students = persons.students.find((val) => val.name == ans.resp);

      if (!students) {
        const addStd = new Student(ans.resp);
        persons.addStudent(addStd);

        console.log(`Hello I am ${addStd.name} , and I am fine`);
        console.log(persons.students);
      } else if (students) {
        console.log(`Hello I am ${students.name} , and I am fine`);
        console.log(persons.students);
      }
    }

    const resp = await inquirer.prompt([
        {
            name:"confirm",
            type: "confirm",
            message: "Do you want to chat again with someone else?"
        }
    ])

    if(resp.confirm == false){
        console.log("Thank your for using our Application");
        process.exit();
    }

} while (true);
};

startProgram(persons);
