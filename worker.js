export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h")
    const buffer = await res.arrayBuffer()

    let text

    try {
      const decoder = new TextDecoder("shift_jis")
      text = decoder.decode(buffer)
    } catch (e) {
      // フォールバック（とりあえずUTF-8）
      text = new TextDecoder().decode(buffer)
    }

    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      return new Response(text, { status: 500 })
    }

    return Response.json(data)
  }
}
