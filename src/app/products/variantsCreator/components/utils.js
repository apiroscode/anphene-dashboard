export const cartesianProduct = (arr) => {
  return arr.reduce(
    (a, b) => {
      return a
        .map((x) => {
          return b.values.map((y) => {
            return x.concat([
              {
                id: b.id,
                values: [y],
              },
            ]);
          });
        })
        .reduce((a, b) => {
          return a.concat(b);
        }, []);
    },
    [[]]
  );
};

export const findDuplicateValues = (arr) => {
  const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);
  const duplicates = [...new Set(findDuplicates(arr))];
  if (duplicates.length > 0) {
    return arr.map((item, idx) => (duplicates.includes(item) ? `${item}/${idx}` : item));
  } else {
    return arr;
  }
};
