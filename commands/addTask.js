import inquirer from 'inquirer';
import { connectDB, disconnectDB } from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import ora from 'ora';
import chalk from 'chalk';

async function input() {
    const answers = await inquirer.prompt([
        { name: 'name', message: 'enter name of the task: ', type: 'input' },
        { name: 'detail', message: 'enter detail of the task: ', type: 'input' }
    ]);
    return answers;
}

const askQuestions = async () => {
    const todoArray = [];
    let loop = false;
    do {
        const userRes = await input();
        todoArray.push(userRes);
        const confirmQ = await inquirer.prompt([
            { name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' }
        ]);
        loop = !!confirmQ.confirm;
    } while (loop);
    return todoArray;
};

export default async function addTask() {
    try {
        const userResponse = await askQuestions();
        await connectDB();

        let spinner = ora('Creating the todos...').start();

        for (let response of userResponse) {
            await Todos.create(response);
        }

        spinner.stop();
        console.log(
            chalk.greenBright('Created the todos!')
        )

        // disconnecting the database
        await disconnectDB()
    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}
