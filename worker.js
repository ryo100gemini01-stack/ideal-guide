export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h")
    const data = await res.json()

    function fix(str) {
      if (!str) return str

      try {
        // 文字列 → バイト列に戻す（Latin1扱い）
        const bytes = new Uint8Array(
          Array.from(str).map(c => c.charCodeAt(0))
        )

        // UTF-8として再デコード
        return new TextDecoder("utf-8").decode(bytes)
      } catch {
        return str
      }
    }

    data.items.forEach(item => {
      item.title = fix(item.title)
      item.tags = item.tags.map(fix)
      item.tagDetails.forEach(tag => {
        tag.name = fix(tag.name)
      })
    })

    return Response.json(data)
  }
}
