export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h")

    const buffer = await res.arrayBuffer()

    // Shift_JISとしてデコード
    const decoder = new TextDecoder("shift_jis")
    const text = decoder.decode(buffer)

    const data = JSON.parse(text)

    return Response.json(data)
  }
}
