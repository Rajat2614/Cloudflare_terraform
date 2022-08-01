resource "cloudflare_worker_script" "todoItem" {
  name = "todo"
  content = file("individual/worker.js")

  kv_namespace_binding {
    name         = "KV"
    namespace_id = cloudflare_workers_kv_namespace.example_ns.id
  }
}

# resource "cloudflare_worker_route" "todo_route" {
#   zone_id = var.zone_id
#   pattern = "legitbytes.com/todo"
#   enabled = true
#   script_name = cloudflare_worker_script.todoItem.name
# }

    