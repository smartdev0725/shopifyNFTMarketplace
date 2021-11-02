const Validator = require('validatorjs');
const stringValidator = require('validator');


// ----------------------------------Creating validators
// This validator is for confirm a string is a eth address
Validator.register('ethereumAddress', function (value) {
  return stringValidator.default.isEthereumAddress(value);
}, 'The :attribute is not an ethereum address');

// Create rules 
const rules = {
  "name": 'required|min:3|max:50',
  "description": 'required|min:10|max:256',
  "mainArtist": 'required|min:3|max:100',
  "creators.*.name": 'required_with:properties.creators.*.address|string',
  "creators.*.address": 'required_with:properties.creators.*.name|ethereumAddress'
};

// Function to check if an input is valid or not
const validateCollectionData = async (data) => {
  const validation = await new Validator(data, rules);
  validation.hasAsync = true;
  await validation.checkAsync(() => {
    console.log('Is valid');
  }, () => {
    const errorText = validation.errors.all();
    console.log(errorText);
  });

};

// Call to the function
validateCollectionData({
  "name": "Test file",
  "description": "A descripcion of the nft ",
  "mainArtist": "Isabella",
  "creators": [
    {
      name: 'Isabella',
      address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8'
    },
  ]
});
