const Gender = Object.freeze({
  MALE: "Male",
  FEMALE: "Female",
});

class Member {
  static takenNames = [];

  static addTakenName(name) {
    Member.takenNames.push(name);
  }

  static isNameTaken(name) {
    return Member.takenNames.includes(name);
  }

  /**
   *
   * @param {*} name
   * @param {*} gender
   * @param {*} father
   * @param {*} mother
   * @param {*} spouse
   * @param {*} children = []
   *
   */

  constructor(name, gender, father, mother) {
    this.name = name;
    this.gender = gender;
    this.father = father;
    this.mother = mother;
    Member.addTakenName(name);
  }

  setPartner(spouse) {
    this.setSpouse(spouse);
    spouse.setSpouse(this);
  }

  setSpouse(spouse) {
    this.spouse = spouse;
  }

  addChild(child) {
    this.children = this.children || [];
    this.children.push(child);
  }

  getChild(childGender) {
    let mother;

    if (this.gender == Gender.MALE) {
      if (!this.spouse) return false;
      mother = this.spouse;
    } else {
      mother = this;
    }

    if (!mother.children || mother.children.length == 0) return false;
    return mother.children
      .filter((childMember) => childMember.gender == childGender)
      .map((childMember) => childMember.name);
  }

  getSibling(siblingGender) {
    if (!this.mother) return false;
    if (this.mother.children.length <= 1) return false;

    if (siblingGender) {
      return this.mother.children
        .filter(
          (childMember) =>
            childMember.name != this.name && childMember.gender == siblingGender
        )
        .map((childMember) => childMember.name);
    }
    //getSibling() can ben gender independent
    return this.mother.children
      .filter((childMember) => childMember.name != this.name)
      .map((childMember) => childMember.name);
  }

  getParentSibling(siblingGender, isMother) {
    const parent = isMother ? this.mother : this.father;

    if (!parent) return false;

    return parent.getSibling(siblingGender);
  }

  getSiblingsSpouses(inLawGender) {
    if (!this.mother) return false;
    if (this.mother.children.length <= 1) return false;

    return this.mother.children
      .filter(
        (childMember) =>
          childMember.name != this.name &&
          childMember.gender ==
            (inLawGender == Gender.FEMALE ? Gender.MALE : Gender.FEMALE) &&
          childMember.spouse
      )
      .map((childMember) => childMember.spouse.name);
  }

  getInLaws(inLawGender) {
    let inLaws = [];

    //get spouse siblings of releavant gender
    if (this.spouse) {
      const spouseSiblings = this.spouse.getSibling(inLawGender);
      if (spouseSiblings) inLaws = inLaws.concat(spouseSiblings);
    }

    //get siblings spouses of releavant gender
    const siblingsSpouses = this.getSiblingsSpouses(inLawGender);
    if (siblingsSpouses) inLaws = inLaws.concat(siblingsSpouses);

    return inLaws;
  }
}

module.exports = { Member, Gender };
