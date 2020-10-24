const Relationships = require("../models/relationships");
const Messages = require("../models/messages");
const { Member, Gender } = require("../models/member");

const getRelationship = (name, relationship, family) => {
  try {
    checkIfFieldsAreValid(name, relationship);

    const member = family.searchMember(name);

    switch (String(relationship).valueOf()) {
      case Relationships.SON:
        return processOutput(member.getChild(Gender.MALE));
      case Relationships.DAUGHTER:
        return processOutput(member.getChild(Gender.FEMALE));
      case Relationships.SIBLINGS:
        return processOutput(member.getSibling());
      case Relationships.PATERNAL_UNCLE:
        return processOutput(
          member.getParentSibling(Gender.MALE, (isMother = false))
        );
      case Relationships.MATERNAL_UNCLE:
        return processOutput(
          member.getParentSibling(Gender.MALE, (isMother = true))
        );
      case Relationships.PATERNAL_AUNT:
        return processOutput(
          member.getParentSibling(Gender.FEMALE, (isMother = false))
        );
      case Relationships.MATERNAL_AUNT:
        return processOutput(
          member.getParentSibling(Gender.FEMALE, (isMother = true))
        );
      case Relationships.SISTER_IN_LAW:
        return processOutput(member.getInLaws(Gender.FEMALE));
      case Relationships.BROTHER_IN_LAW:
        return processOutput(member.getInLaws(Gender.MALE));
      default:
        return Messages.INVALID_RELATIONSHIP;
    }
  } catch (e) {
    return e;
  }
};

const checkIfFieldsAreValid = (name, relationship) => {
  if (name == null || relationship == null) throw Messages.INVALID_COMMAND;

  if (
    !Object.values(Relationships).some(
      (ralationshipName) => ralationshipName.localeCompare(relationship) == 0
    )
  )
    throw Messages.INVALID_RELATIONSHIP;

  if (!Member.isNameTaken(name)) throw Messages.PERSON_NOT_FOUND;
};

const processOutput = (result) => {
  if (!result || result.length == 0) return Messages.NONE;
  return result.join(" ");
};

module.exports = getRelationship;
