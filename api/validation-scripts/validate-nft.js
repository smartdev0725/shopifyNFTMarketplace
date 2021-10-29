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
  const url = `https://cloudflare-ipfs.com/ipfs/${imageHash}`;
  let isValid = false;
  let errorMessage = '';
  try {
    const image = await axios.get(url, { timeout: 60000 });
    if (validImageFormat.find((format) => image.headers['content-type'] === format)) {
      isValid = true;
    }
  } catch (error) {
    if (error) {
      errorMessage = `error ${error.response.status} ${error.response.statusText}`;
    }
  }
  return { isValid, errorMessage };

};

// Validate is the correct type of file. Need to send the expected files
const validateFile = async (fileHash) => {
  // File type should be an array with the valid types
  const url = `https://cloudflare-ipfs.com/ipfs/${fileHash}`;
  let isValid = false;
  let errorMessage = '';
  try {
    const file = await axios.get(url, { timeout: 60000 });
    if (stringValidator.default.isMimeType(file.headers['content-type'])) {
      isValid = true;
    } else {
      errorMessage = 'Is not a valid file';
    }
  } catch (error) {
    if (error) {
      errorMessage = `error ${error.response.status} ${error.response.statusText}`;
    }
  }
  return { isValid, errorMessage };

};

// ----------------------------------Creating validators
Validator.registerAsync('imageIPFS', async function (image, attribute, req, passes) {
  const { isValid, errorMessage } = await validateImage(image);
  if (isValid) {
    await passes(true);
  } else {
    await passes(false, errorMessage ? errorMessage : 'Is not a valid file');
  }
  return isValid;
});

Validator.registerAsync('fileIPFS', async function (file, attribute, req, passes) {
  const { isValid, errorMessage } = await validateFile(file);
  if (isValid) {
    await passes(true);
  } else {
    await passes(false, errorMessage ? errorMessage : 'Is not a valid file');
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
    "files.*.uri": 'fileIPFS|string',
    "creators.*.name": 'required_with:properties.creators.*.address|string',
    "creators.*.address": 'required_with:properties.creators.*.name|ethereumAddress',
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
    const errorText = validation.errors.all();
    console.log(errorText);
  });

};

// Call to the function
validateNFTData({
  "name": "Test file",
  "description": "A descripcion of the nft ",
  "image": "QmbYLJGCFfEVUdarkk7ud8Y7XcpG4FyhR6KDNNhYqtKT7Z",
  "properties": {
    "category": 'text/html',
    "createdAt": "2010",
    "files": [{
      uri: 'QmbYLJGCFfEVUdarkk7ud8Y7XcpG4FyhR6KDNNhYqtKT7Z'
    }],
    "creators": [
      {
        name: 'Isabella',
        address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8'
      },
    ]
  }
});
