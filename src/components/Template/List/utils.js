export const paginate = (pageInfo, params, setParams) => {
  const loadNextPage = () => {
    const currentParams = { ...params };
    currentParams.after = pageInfo.endCursor;
    delete currentParams.before;
    setParams(currentParams);
  };
  const loadPreviousPage = () => {
    const currentParams = { ...params };
    currentParams.before = pageInfo.startCursor;
    delete currentParams.after;
    setParams(currentParams);
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
