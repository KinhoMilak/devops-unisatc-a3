terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  
}

# Pull the Docker image
resource "docker_image" "strapi" {
  name = var.docker_image_name
  pull_triggers = [var.docker_image_tag]
}

# Create a container
resource "docker_container" "strapi" {
  name  = "strapi-cms"
  image = docker_image.strapi.image_id

  ports {
    internal = 1337
    external = var.external_port
  }

  # Volume for persistent SQLite database
  volumes {
    host_path      = abspath("${path.root}/../.tmp")
    container_path = "/app/.tmp"
  }

  # Environment variables
  env = [
    "NODE_ENV=production",
    "HOST=0.0.0.0",
    "PORT=1337"
  ]

  restart = "unless-stopped"
}