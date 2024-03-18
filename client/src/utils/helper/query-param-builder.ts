export function QueryParamBuilder(queryObject: Record<string, unknown>) {
  const queryKeyArray = Object.keys(queryObject);
  const length = queryKeyArray.length;

  const query = queryKeyArray.reduce((acc, key, index) => {
    acc += `${key}=${queryObject[key]}`;
    if (index < length - 1) acc += '&';
    return acc;
  }, '');

  return query ? `?${query}` : '';
}
