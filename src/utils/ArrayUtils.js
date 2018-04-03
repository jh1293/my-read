export function MergeAndUniqueByPropertyName(arrOld, arrNew, propertyName) {
  let helper = {}
  let mergedArray = arrOld.concat(arrNew);
  let resultArray = [];
  mergedArray.forEach(obj => {
    helper[obj[propertyName]] = obj;
  });
  for (let key in helper) {
    resultArray.push(helper[key]);
  }
  return resultArray;
}

export function searchArrayByKeyword(array, propertyName, keyword) {
  let regex = new RegExp(keyword, 'i');
  let exists = false;
  if (typeof propertyName === 'string') {
    return array.filter(obj => regex.test(obj[propertyName]));
  } else if (propertyName instanceof Array) {
    return array.filter(obj => {
      exists = false;
      propertyName.forEach(pn => {
        if (obj[pn] instanceof Array) {
          exists += regex.test(obj[pn].join());
        } else {
          exists += regex.test(obj[pn]);
        }
      });
      return Boolean(exists);
    });
  } else {
    throw new Error('TypeError: propertyName has to be string or array of strings.');
  }
}
