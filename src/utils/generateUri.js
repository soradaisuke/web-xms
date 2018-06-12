import UrlParse from 'url-parse';

export default function generateUri(url = window.location.href, queries = {}) {
  const uri = new UrlParse(url, true);
  const combinedQueries = { ...uri.query, ...queries };
  Object.keys(combinedQueries).forEach((key) => {
    if (combinedQueries[key] === '' || combinedQueries[key] === null || typeof combinedQueries[key] === 'undefined') {
      delete combinedQueries[key];
    }
  });
  uri.set('query', combinedQueries);

  return uri;
}
