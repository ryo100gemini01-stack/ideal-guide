export function extractServerResponseData(html: string): any {
  const metaMatch = html.match(/<meta name="server-response" content="([^"]+)"/)
  if (!metaMatch?.[1]) throw new Error('not found')

  let data = metaMatch[1]

  // 1段目デコード
  data = data
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")

  // 2段目（重要）
  const parsed = JSON.parse(data)

  return parsed
}
