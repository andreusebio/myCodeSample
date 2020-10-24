const findOlder = (member1, member2, family) => {
  try {
    let member1Gen = family.getGeneration(member1);
    let member2Gen = family.getGeneration(member2);

    if (member1Gen == member2Gen) {
      return Messages.SAME_GENERATION;
    } else if (member1Gen > member2Gen) {
      return member2;
    } else {
      return member1;
    }
  } catch (e) {
    return e;
  }
};

module.exports = findOlder;
