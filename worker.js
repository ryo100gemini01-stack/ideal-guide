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

export default {
  async fetch(request) {
    const html = `<meta name="server-response" content="{&quot;test&quot;:1}">`

    const result = extractServerResponseData(html)

    return new Response(JSON.stringify(result), {
      headers: { "content-type": "application/json" }
    })
  }
}
