exports.getRandomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

exports.checkKeyInObj = (obj, key) => obj.hasOwnProperty(key);

exports.checkValueInArrayOfObj = (array, nameFild, value) => (array.findIndex(obj => obj[nameFild] === value)) !== -1;

exports.getObjectFromArrayOnKey = (array, nameFild, value) => array.find(obj => obj[nameFild] === value);

exports.getObjectsFromArrayWithoutThisOnKey = (array, nameFild, value) => array.filter(obj => obj[nameFild] !== value);