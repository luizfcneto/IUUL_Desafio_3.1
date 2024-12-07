#!/bin/bash

# Nome do arquivo .env (ajuste se necessário)
dotenv_file=".env"

# Função para carregar as variáveis do .env
load_dotenv() {
  if [ -f "$dotenv_file" ]; then
    eval "$(cat $dotenv_file)"
  fi
}

# Carregar as variáveis
load_dotenv

# Subir os containers
sudo docker-compose up -d