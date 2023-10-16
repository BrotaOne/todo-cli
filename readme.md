# Learn How to Build a CLI and Utilize MongoDB

## This code was implemented by referencing an article. You can find the article here:
[How to Build a Task Manager CLI Tool with Node.js](https://www.freecodecamp.org/news/nodejs-tutorial-build-a-task-manager-cli-tool/)


## Instructions for Use

1. Change the MongoDB connection string in the .env file to your own.

2. Change the MongoDB username and password in the docker-compose.yml file to your own.

3. Start MongoDB using Docker Compose:
```bash
docker-compose up
```

4. Install the todo-cli globally:
```bash
pnpm i
npm i -g .
```

## Please Note

1. As chalk5 is an ESM module, I have set the type to 'module' in package.json.
2. To ensure uniqueness of IDs, I have used nanoid and a pre-save middleware to generate the ID before saving.

```js
TodoSchema.pre('save', function(next){
    this.code = nanoid(10);
    next();
})
```