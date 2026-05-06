export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h")
    const data = await res.json()

    function fix(str) {
      try {
        return decodeURIComponent(escape(str))
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
