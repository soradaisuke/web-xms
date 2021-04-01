export default function generateQuery({ namespace, inline, query }) {
  if (inline) {
    return { [namespace]: encodeURIComponent(JSON.stringify(query)) };
  }

  return query;
}