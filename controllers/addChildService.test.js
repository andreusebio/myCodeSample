const addChild = require("./addChildService");
const familyTree = require("../index");

test("addChild() function exists", () => {
  expect(addChild).toBeDefined();
});

test("To add a child all parameters must be defined", () => {
  expect(addChild(null, null, null, familyTree)).toEqual("INVALID_COMMAND");
});

test("To add a child all parameters must be defined (missing Mother's name and Gender)", () => {
  expect(addChild(null, "Yalup", null, familyTree)).toEqual("INVALID_COMMAND");
});

test("To add a child all parameters must be defined (missing Gender)", () => {
  expect(addChild("Dritha", "Yalup", null, familyTree)).toEqual(
    "INVALID_COMMAND"
  );
});

test("Pjali does not exist, a child cant be added to him", () => {
  expect(addChild("Pjali", "Vani", "Female", familyTree)).toEqual(
    "PERSON_NOT_FOUND"
  );
});

test("Ted is a male, a child cant be added to him", () => {
  expect(addChild("Ted", "Vani", "Female", familyTree)).toEqual(
    "CHILD_ADDITION_FAILED"
  );
});

test("Rose is a female in a family, a child can be added to her", () => {
  expect(addChild("Rose", "Markaj", "Male", familyTree)).toEqual("CHILD_ADDED");
});

test("Molly is a female not family, a child can't be added to her", () => {
  expect(addChild("Molly", "Jamalak", "Female", familyTree)).toEqual(
    "CHILD_ADDITION_FAILED"
  );
});

test("Flora name already exists, there can't be duplicated names in the family", () => {
  expect(addChild("Helen", "Flora", "Female", familyTree)).toEqual(
    "CHILD_ADDITION_FAILED"
  );
});

test("Flora gender should be of type Male or Female", () => {
  expect(addChild("Flora", "Markaj", "Other", familyTree)).toEqual(
    "CHILD_ADDITION_FAILED"
  );
});
