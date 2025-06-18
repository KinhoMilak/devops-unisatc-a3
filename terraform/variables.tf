variable "docker_image_name" {
  description = "Docker image name"
  type        = string
  default     = "strapi-cms"
}

variable "docker_image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}

variable "external_port" {
  description = "External port for the application"
  type        = number
  default     = 1337
}