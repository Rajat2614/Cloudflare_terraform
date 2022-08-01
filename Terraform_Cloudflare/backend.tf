resource "cloudflare_worker_script" "postItem" {
  name = "post"
  content = file("functions/post.js")

  kv_namespace_binding {
    name         = "KV"
    namespace_id = cloudflare_workers_kv_namespace.kv_ns.id
  }
}

resource "cloudflare_worker_script" "getItem" {
  name = "get"
  content = file("functions/get.js")

  kv_namespace_binding {
    name         = "KV"
    namespace_id = cloudflare_workers_kv_namespace.kv_ns.id
  }
}

resource "cloudflare_worker_script" "deleteItem" {
  name = "delete"
  content = file("functions/delete.js")

  kv_namespace_binding {
    name         = "KV"
    namespace_id = cloudflare_workers_kv_namespace.kv_ns.id
  }
}