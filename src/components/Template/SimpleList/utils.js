export const paginate = (pageInfo, variables, setVariables) => {
  const loadNextPage = () => {
    setVariables((prevState) => ({
      ...prevState,
      after: pageInfo.endCursor,
      before: undefined,
    }));
  };

  const loadPreviousPage = () => {
    setVariables((prevState) => ({
      ...prevState,
      before: pageInfo.startCursor,
      after: undefined,
    }));
  };

  const newPageInfo = pageInfo
    ? {
        ...pageInfo,
        hasNextPage: !!variables.before || pageInfo.hasNextPage,
        hasPreviousPage: !!variables.after || pageInfo.hasPreviousPage,
      }
    : undefined;

  return { loadNextPage, loadPreviousPage, pageInfo: newPageInfo };
};
