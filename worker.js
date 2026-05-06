export default {
  async fetch(request) {
    const url = new URL(request.url)

    const genre = url.searchParams.get("genre") || "game"
    const period = url.searchParams.get("period") || "24h"

    const upstream = new URL("https://nico-rank.com/api/ranking")

    // ★重要：API仕様に合わせてそのまま渡す
    upstream.searchParams.set("genre", genre)
    upstream.searchParams.set("period", period)

    try {
      const res = await fetch(upstream.toString(), {
        headers: {
          "Accept": "application/json",
          "Accept-Encoding": "identity",
          "User-Agent": "cf-worker-safe-fetch/1.0",
        },
cf: {
  cacheTtl: 60, // 1分キャッシュ
  cacheEverything: true,
}
      })

      if (!res.ok) {
        return new Response(`Upstream error: ${res.status}`, { status: 502 })
      }

      // --- 安定取得 ---
      const buffer = await res.arrayBuffer()
      const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer)

      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        return new Response(
          JSON.stringify(
            {
              error: "JSON parse failed",
              message: e.message,
              preview: text.slice(0, 500),
            },
            null,
            2
          ),
          {
            status: 500,
            headers: { "content-type": "application/json" },
          }
        )
      }

      // --- 文字化け補正 ---
      const fix = (str) => {
        if (typeof str !== "string") return str
        try {
          return decodeURIComponent(escape(str))
        } catch {
          return str
        }
      }

      if (Array.isArray(data.items)) {
        data.items = data.items.map((item) => ({
          ...item,
          title: fix(item.title),
          tags: item.tags?.map(fix),
          tagDetails: item.tagDetails?.map((t) => ({
            ...t,
            name: fix(t.name),
          })),
        }))
      }

      return new Response(JSON.stringify(data), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
        },
      })
    } catch (err) {
      return new Response(
        JSON.stringify(
          {
            error: "Worker exception",
            message: err instanceof Error ? err.message : String(err),
          },
          null,
          2
        ),
        { status: 500 }
      )
    }
  },
}
