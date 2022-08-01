resource "cloudflare_workers_kv_namespace" "kv_ns" {
  title = var.kv_namespace
}

resource "cloudflare_workers_kv" "example" {
  namespace_id = cloudflare_workers_kv_namespace.kv_ns.id
  key = "User Id"
  value = "Todos"
}
