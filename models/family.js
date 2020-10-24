const { Member, Gender } = require("./member");
const addChild = require("../controllers/addChildService");
const member = require("./member");

class Family {
  /**
   *
   * @param {*} king
   * @param {*} queen
   *
   */

  getGeneration(name) {
    if (name == null) return null;
    if (!Member.isNameTaken(name)) return null;

    let member = this.searchMember(name);

    return member.generation;
  }

  searchMember(name) {
    if (name == null) return null;
    if (!Member.isNameTaken(name)) return null;

    return this.searchMemberOnBranch(this.queen, name, 0);
  }

  searchMemberOnBranch(familyNode, name, generation) {
    // console.log(generation);

    if (name.localeCompare(familyNode.name) == 0) {
      familyNode.generation = generation;
      return familyNode;
    }

    //Only couples can have children
    if (familyNode.spouse == null) return null;

    if (name.localeCompare(familyNode.spouse.name) == 0) {
      familyNode.spouse.generation = generation;
      return familyNode.spouse;
    }

    let childList = [];

    if (familyNode.gender.localeCompare(Gender.FEMALE) == 0) {
      if (familyNode.children == null) return null;
      childList = familyNode.children;
    } else {
      if (familyNode.spouse.children == null) return null;
      childList = familyNode.spouse.children;
    }

    for (var i = 0; i < childList.length; i++) {
      let member = this.searchMemberOnBranch(
        childList[i],
        name,
        generation + 1
      );
      if (member != null) return member;
    }
    return null;
  }

  addSpouse(spouseName, name, gender) {
    const spouse = this.searchMember(spouseName);
    const member = new Member(
      name,
      gender.localeCompare(Gender.FEMALE) == 0 ? Gender.FEMALE : Gender.MALE
    );
    spouse.setPartner(member);
  }

  startFamilyTree() {
    const queen = new Member("Queen Margret", Gender.FEMALE);
    const king = new Member("King Arthur", Gender.MALE);
    king.setPartner(queen);
    this.queen = queen;
    this.king = king;

    addChild("Queen Margret", "Bill", "Male", this);
    addChild("Queen Margret", "Charlie", "Male", this);
    addChild("Queen Margret", "Percy", "Male", this);
    addChild("Queen Margret", "Ronald", "Male", this);
    addChild("Queen Margret", "Ginerva", "Female", this);
    this.addSpouse("Bill", "Flora", "Female");
    this.addSpouse("Percy", "Audrey", "Female");
    this.addSpouse("Ronald", "Helen", "Female");
    this.addSpouse("Ginerva", "Harry", "Male");
    addChild("Flora", "Victoire", "Female", this);
    addChild("Flora", "Dominique", "Female", this);
    addChild("Flora", "Louis", "Male", this);
    this.addSpouse("Victoire", "Ted", "Male");
    addChild("Victoire", "Remus", "Male", this);
    addChild("Audrey", "Molly", "Female", this);
    addChild("Audrey", "Lucy", "Female", this);
    addChild("Helen", "Rose", "Female", this);
    addChild("Helen", "Hugo", "Male", this);
    this.addSpouse("Rose", "Malfoy", "Male");
    addChild("Rose", "Draco", "Male", this);
    addChild("Rose", "Aster", "Female", this);
    addChild("Ginerva", "James", "Male", this);
    addChild("Ginerva", "Albus", "Male", this);
    addChild("Ginerva", "Lily", "Female", this);
    this.addSpouse("James", "Darcy", "Female");
    this.addSpouse("Albus", "Alice", "Female");
    addChild("Darcy", "William", "Male", this);
    addChild("Alice", "Ron", "Male", this);
    addChild("Alice", "Ginny", "Female", this);
  }
}

module.exports = Family;
