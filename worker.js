export default {
  async fetch() {
    const res = await fetch("https://nico-rank.com/api/ranking?game&period=24h")

    // JSONとして読まない
    const buffer = await res.arrayBuffer()

    // UTF-8としてそのままデコード
    const text = new TextDecoder("utf-8").decode(buffer)

    // ここで初めてJSON.parse
    const data = JSON.parse(text)

    return Response.json(data)
  }
}
