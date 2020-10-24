const Messages = require("../models/messages");
const { Member, Gender } = require("../models/member");

const addChild = (motherName, childName, gender, family) => {
  try {
    checkIfFieldsAreValid(motherName, childName, gender);

    member = family.searchMember(motherName);

    checkMemberCanBeMother(member);

    newChild = new Member(
      childName,
      gender.localeCompare(Gender.FEMALE) == 0 ? Gender.FEMALE : Gender.MALE,
      member.spouse,
      member
    );
    member.addChild(newChild);

    return Messages.CHILD_ADDITION_SUCCEEDED;
  } catch (e) {
    return e;
  }
};

const checkIfFieldsAreValid = (motherName, childName, gender) => {
  if (motherName == null || childName == null || gender == null)
    throw Messages.INVALID_COMMAND;

  if (
    gender.localeCompare(Gender.FEMALE) != 0 &&
    gender.localeCompare(Gender.MALE) != 0
  )
    throw Messages.CHILD_ADDITION_FAILED;

  if (Member.isNameTaken(childName)) throw Messages.CHILD_ADDITION_FAILED;
};

const checkMemberCanBeMother = (member) => {
  if (member == null) throw Messages.PERSON_NOT_FOUND;

  if (member.gender.localeCompare(Gender.FEMALE) != 0)
    throw Messages.CHILD_ADDITION_FAILED;

  //Only couples can have children
  if (member.spouse == null) throw Messages.CHILD_ADDITION_FAILED;
};

module.exports = addChild;
