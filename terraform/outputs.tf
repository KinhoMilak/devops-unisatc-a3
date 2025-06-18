output "application_url" {
  description = "URL to access the application"
  value       = "http://localhost:${var.external_port}"
}

output "container_id" {
  description = "Docker container ID"
  value       = docker_container.strapi.id
}