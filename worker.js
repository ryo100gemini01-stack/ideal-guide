export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h")

    const buffer = await res.arrayBuffer()

    // Shift_JISでデコード
    const text = new TextDecoder("shift-jis").decode(buffer)

    const data = JSON.parse(text)

    return Response.json(data)
  }
}
