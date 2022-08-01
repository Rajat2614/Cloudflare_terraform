terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}

provider "cloudflare" {
  api_key = var.api_key
  email = var.email
  account_id= var.account_id
}

# resource "cloudflare_record" "www" {
#   //zone_id = var.zone_id
#   name    = "hello"
#   value   = "203.0.113.10"
#   type    = "A"
#   proxied = true
# }
