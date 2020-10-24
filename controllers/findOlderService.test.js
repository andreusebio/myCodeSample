const findOlder = require("./findOlderService");
const familyTree = require("../index");

test("findOlder() function exists", () => {
  expect(findOlder).toBeDefined();
});

test("To find older all parameters must be defined", () => {
  expect(findOlder(null, null, familyTree)).toEqual("INVALID_COMMAND");
});

test("To find older all parameters must be defined (missing Name)", () => {
  expect(findOlder("Louis", null, familyTree)).toEqual("INVALID_COMMAND");
});

test("Bill is older than Molly", () => {
  expect(findOlder("Bill", "Molly", familyTree)).toEqual("Bill");
});

test("Bill is older than Molly", () => {
  expect(findOlder("Molly", "Bill", familyTree)).toEqual("Bill");
});

test("Bill is older than Remus", () => {
  expect(findOlder("Remus", "Bill", familyTree)).toEqual("Bill");
});

test("Ted is older than Remus", () => {
  expect(findOlder("Remus", "Ted", familyTree)).toEqual("Ted");
});
