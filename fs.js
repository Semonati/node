const FileSystem = require("fs");
const { mkdir, readdir, writeFile, rmdir, unlink } = require("fs/promises");

const isExists = FileSystem.existsSync(`${__dirname}/users`);

const users = [
  { first: "nati", last: "semo" },
  { first: "moshe", last: "levi" },
  { first: "shalom", last: "matan" },
];

const removeFileAndFolder = async () => {
  try {
    await mkdir(`${__dirname}/users`);

    for (i = 0; i < 3; i++)
      writeFile(
        `${__dirname}/users/${users[i].first}-${users[i].last}.txt`,
        `file no. ${i + 1}`
      );
  } catch (error) {
    console.log(error.message);
  }
};

const makeAndRemoveFileAndFolder = async () => {
  try {
    const files = await readdir(__dirname + "/users");
    files.forEach(async file => await unlink(`${__dirname}/users/${file}`));
    await rmdir(`${__dirname}/users`);
  } catch (error) {
    console.log(error.message);
  }
};

if(isExists){
  makeAndRemoveFileAndFolder()
} else {
  setTimeout(removeFileAndFolder, 5000);
}