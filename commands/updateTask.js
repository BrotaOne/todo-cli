import { connectDB, disconnectDB } from "../db/connectDB.js";
import { getTaskCode } from "./deleteTask.js";
import inquirer from "inquirer";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

async function askUpdateQ(todo) {
    try {
        const update = await inquirer.prompt([
            { name: 'name', message: 'Update the name?', type: 'input', default: todo.name },
            { name: 'detail', message: 'Update the detail?', type: 'input', default: todo.detail },
            { name: 'status', message: 'Update the status?', type: 'list', choices: ['completed', 'pending'], default: todo.status }
        ])
        return update;
    } catch (error) {
        console.log('Something went wrong... \n', error)
    }
}

export default async function updateTask() {
    try {
        const userCode = await getTaskCode();
        await connectDB();
        const spinner = ora('Finding the todo...').start();
        const todo = await Todos.findOne({ code: userCode.code });
        spinner.stop();
        if (!todo) {
            console.log(chalk.redBright('Could not find any todo matching the provided code. Update failed.'))
        } else {
            const update = await askUpdateQ(todo);
            const spinner = ora('Updating the todo...').start();
            // await Todos.updateOne({ code: userCode.code }, { $set: update });
            await Todos.updateOne({ _id: todo._id }, update, { runValidators: true });
            spinner.stop();
            console.log(chalk.greenBright('Updated Task Successfully'))
        }
        await disconnectDB();
    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}