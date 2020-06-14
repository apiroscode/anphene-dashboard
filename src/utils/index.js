export const filteredObject = (raw, keys, defaultKeys) => {
  return keys.reduce((obj, key) => {
    return { ...obj, [key]: raw[key] !== undefined ? raw[key] : defaultKeys[key] };
  }, {});
};

export const maybe = (exp, d) => {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
};

export const renameKeys = (obj, newKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
