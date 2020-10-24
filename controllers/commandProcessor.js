const Commands = require("../models/commands");
const Messages = require("../models/messages");
const addChild = require("./addChildService");
const getRelationship = require("./getRelationshipService");

const processCommand = (command, familyTree) => {
  switch (String(command[0]).valueOf()) {
    case Commands.ADD_CHILD:
      if (command.length == 4)
        console.log(addChild(command[1], command[2], command[3], familyTree));
      break;
    case Commands.GET_RELATIONSHIP:
      if (command.length == 3)
        console.log(getRelationship(command[1], command[2], familyTree));
      break;
    default:
      console.log(Messages.INVALID_COMMAND);
  }
};

module.exports = processCommand;
