const axios = require('axios');
const Validator = require('validatorjs');
const stringValidator = require('validator');

// Valid images formats 
const validImageFormat = [
  'image/gif',
  'image/jpeg',
  'image/png'
];

// Validate an image
const validateImage = async (imageHash) => {
  const url = `https://gateway.pinata.cloud/ipfs/${imageHash}`;
  let isValid = false;
  try {
    const image = await axios.get(url, { timeout: 30000 });
    if (validImageFormat.find((format) => image.headers['content-type'] === format)) {
      isValid = true;
    }
  } catch (error) {
  }
  return isValid;

};

// Validate is the correct type of file. Need to send the expected files
const validateFile = async (fileHash, fileType) => {
  // File type should be an array with the valid types
  const url = `https://gateway.pinata.cloud/ipfs/${fileHash}`;
  let isValid = false;
  try {
    const file = await axios.get(url, { timeout: 5000 });
    if (fileType.find((format) => file.headers['content-type'] === format)) {
      isValid = true;
    }
  } catch (error) {
  }
  return isValid;

};

// ----------------------------------Creating validators
Validator.registerAsync('imageIPFS', async function (image, attribute, req, passes) {
  const isValid = await validateImage(image);
  if (isValid) {
    await passes(true);
  } else {
    await passes(false, 'Is not a valid file');
  }
  return isValid;
});

Validator.registerAsync('videoIPFS', async function (image, attribute, req, passes) {
  const isValid = await validateImage(image);
  if (isValid) {
    await passes(true);
  } else {
    await passes(false, 'Is not a valid file');
  }
  return isValid;
});

Validator.register('mimetype', function (value) {
  return stringValidator.default.isMimeType(value);
}, 'The :attribute is not mimetype');

Validator.register('ethereumAddress', function (value) {
  return stringValidator.default.isEthereumAddress(value);
}, 'The :attribute is not an ethereum address');

// Create rules 
const rules = {
  name: 'required|min:3|max:50',
  description: 'required|min:10|max:256',
  image: 'required|imageIPFS',
  properties: {
    "category": 'required|mimetype',
    // Todo files[0] have to exist
    "files.*.type": 'mimetype',
    "files.*.uri": 'validateFile', //Todo that the file type is the same that type
    "creators.*.name": 'string',
    "creators.*.address": 'ethereumAddress',
    "createdAt": "required|date",
  },

};

// Function to check if an input is valid or not
const validateNFTData = async (data) => {
  const validation = await new Validator(data, rules);
  validation.hasAsync = true;
  await validation.checkAsync(() => {
    console.log('Is valid');
  }, () => {
    console.log(validation.errors.all());
  });
};

// Call to the function
validateNFTData({
  "name": "Test file",
  "description": "A descripcion of the nft ",
  "image": "QmQq6ZMQUrxZ5c1VSZpUzkwCsjEekLDfZeQnHciTe3nU3Q/1.png",
  "properties": {
    "category": 'text/html',
    "createdAt": "2010",
    "files": [
      {
        type: 'text/html',
      }
    ],
    "creators": [
      {
        name: 'Isabella',
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8'
      }
    ]
  }
});