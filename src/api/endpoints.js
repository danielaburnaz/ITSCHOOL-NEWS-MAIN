const API_KEY = "3655da6e-e2b8-480b-8a93-66cf8f925e36";

export function getNewsCategoriesEndpoint(
  category,
  pageNumber = 1,
  pageSize = 21
) {
  const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

  return `https://content.guardianapis.com/search${queryParams}`;
}

export function getNewsDetailsEndpoint(newsId) {
  const queryParams = `?api-key=${API_KEY}&show-fields=all`;

  return `https://content.guardianapis.com/${newsId}${queryParams}`;
}
