const getRelationship = require("./getRelationshipService");
const familyTree = require("../index");

test("getRelationship() function exists", () => {
  expect(getRelationship).toBeDefined();
});

test("To get a relationship all parameters must be defined", () => {
  expect(getRelationship(null, null, familyTree)).toEqual("INVALID_COMMAND");
});

test("To get a relationship all parameters must be defined (missing Name)", () => {
  expect(getRelationship("Louis", null, familyTree)).toEqual("INVALID_COMMAND");
});

test("To get a relationship all parameters must be defined (missing relationship)", () => {
  expect(getRelationship(null, "Siblings", familyTree)).toEqual(
    "INVALID_COMMAND"
  );
});

test("To get a relationship person must exist", () => {
  expect(getRelationship("Peter", "Siblings", familyTree)).toEqual(
    "PERSON_NOT_FOUND"
  );
});

test("To get a relationship all parameters must be valid", () => {
  expect(getRelationship("Ronald", "Dog", familyTree)).toEqual(
    "INVALID_RELATIONSHIP"
  );
});

//Testing a case that matches and a case that doesn't match for every valid rlationship
test.each`
  name         | relationship        | output
  ${"Aster"}   | ${"Paternal-Uncle"} | ${"NONE"}
  ${"William"} | ${"Paternal-Uncle"} | ${"Albus"}
  ${"William"} | ${"Maternal-Uncle"} | ${"NONE"}
  ${"Aster"}   | ${"Maternal-Uncle"} | ${"Hugo"}
  ${"Remus"}   | ${"Paternal-Aunt"}  | ${"NONE"}
  ${"Molly"}   | ${"Paternal-Aunt"}  | ${"Ginerva"}
  ${"Lucy"}    | ${"Maternal-Aunt"}  | ${"NONE"}
  ${"Remus"}   | ${"Maternal-Aunt"}  | ${"Dominique"}
  ${"Malfoy"}  | ${"Sister-In-Law"}  | ${"NONE"}
  ${"Lily"}    | ${"Sister-In-Law"}  | ${"Darcy Alice"}
  ${"James"}   | ${"Brother-In-Law"} | ${"NONE"}
  ${"Helen"}   | ${"Brother-In-Law"} | ${"Bill Charlie Percy"}
  ${"Charlie"} | ${"Son"}            | ${"NONE"}
  ${"Harry"}   | ${"Son"}            | ${"James Albus"}
  ${"Ted"}     | ${"Daughter"}       | ${"NONE"}
  ${"Audrey"}  | ${"Daughter"}       | ${"Molly Lucy"}
  ${"Darcy"}   | ${"Siblings"}       | ${"NONE"}
  ${"Bill"}    | ${"Siblings"}       | ${"Charlie Percy Ronald Ginerva"}
`(
  "$relationship of $name should output $output",
  ({ name, relationship, output }) => {
    expect(getRelationship(name, relationship, familyTree)).toEqual(output);
  }
);
