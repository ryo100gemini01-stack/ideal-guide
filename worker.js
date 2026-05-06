export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h")

    const buffer = await res.arrayBuffer()

    let text

    try {
      text = new TextDecoder("shift-jis").decode(buffer)
    } catch (e) {
      // ここで落ちてる可能性が高い
      return new Response("shift-jis decode failed: " + e.message)
    }

    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      return new Response("JSON parse failed: " + e.message + "\n\n" + text.slice(0, 200))
    }

    return Response.json(data)
  }
}
