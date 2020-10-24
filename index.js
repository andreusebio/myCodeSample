const fs = require("fs");
const Family = require("./models/family");
const processCommand = require("./controllers/commandProcessor");

const familyTree = new Family();
familyTree.startFamilyTree();

const fileDir = process.argv[2];

if (fileDir) {
  fs.readFile(fileDir, (error, inputData) => {
    if (error) {
      throw error;
    }
    const lines = convertInputDataToFormatedStringMatrix(inputData);
    lines.forEach((command) => processCommand(command, familyTree));
  });
}

const convertInputDataToFormatedStringMatrix = (inputData) => {
  var lines = inputData.toString().split("\n");

  for (var i = 0; i < lines.length; i++) {
    //clean duplicate spaces and line breaks
    lines[i] = lines[i].trim().replace(/(\r\n|\n|\r| +(?= ))/gm, "");

    //check for empty lines and remove them
    if (lines[i].length == 0) {
      lines.splice(i, 1);
      i--;
    } else {
      lines[i] = lines[i].toString().split(" ");
    }
  }
  return lines;
};

//for testing porpuses
module.exports = familyTree;
