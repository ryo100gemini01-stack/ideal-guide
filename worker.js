export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h", {
      headers: {
        "Accept-Encoding": "identity" // ← これが重要
      }
    })

    const text = await res.text()

    try {
      const data = JSON.parse(text)
      return Response.json(data)
    } catch (e) {
      return new Response(text.slice(0, 1000), { status: 500 })
    }
  }
}
