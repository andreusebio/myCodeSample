# To run:

- npm start <absolute\*path\*to\*input\*file>
  (e.g. npm start C:\Users\UserName\Desktop\Shippit\MeetTheFamily\inputs\testInput.txt)

# To run included test-set (Jest):

1. npx yarn install _(necessary to install jest. For reason jest is not available at the moment with npm)_
2. npm test

# 3rd party libraries:

The only 3rd party librarie added to the project was _jest_ for testing

---

# Considerations:

## Input file:

- Input file might have empty spaces and lines -> file text is formated before processing
- Input file might have Invalid commands -> **INVALID_COMMAND** was added as a possible output

## Family:

- New family members can't have existing names
- Only couples can have children

## GET_RELATIONSHIP:

- In case command structure is correct but relationship is not existant (e.g. Grandmother) **INVALID_RELATIONSHIP** was added as a possible output
- **INVALID_COMMAND** is used in case operation is missing fields

## ADD-CHILD:

- All new names are only one word
- **INVALID_COMMAND** is used in case operation is missing fields
