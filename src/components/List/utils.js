export const paginate = (pageInfo, params, setParams) => {
  const loadNextPage = () => {
    setParams({
      after: pageInfo.endCursor,
      before: undefined,
    });
  };

  const loadPreviousPage = () => {
    setParams({
      after: undefined,
      before: pageInfo.startCursor,
    });
  };

  const newPageInfo = pageInfo
    ? {
        ...pageInfo,
        hasNextPage: !!params.before || pageInfo.hasNextPage,
        hasPreviousPage: !!params.after || pageInfo.hasPreviousPage,
      }
    : undefined;

  return { loadNextPage, loadPreviousPage, pageInfo: newPageInfo };
};

export const optimizeParams = (obj, newKeys, rangeKeys) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  const newObj = Object.assign({}, ...keyValues);

  if (rangeKeys.length > 0) {
    for (let key of rangeKeys) {
      if (newObj[`${key}From`] !== undefined && newObj[`${key}To`] !== undefined) {
        newObj[key] = {
          gte: newObj[`${key}From`],
          lte: newObj[`${key}To`],
        };
      }
      delete newObj[`${key}From`];
      delete newObj[`${key}To`];
    }
  }

  return newObj;
};
