export function extractServerResponseData(html) {
  const metaMatch = html.match(/<meta name="server-response" content="([^"]+)"/)
  if (!metaMatch?.[1]) throw new Error('not found')

  let data = metaMatch[1]

  data = data
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")

  return JSON.parse(data)
}
