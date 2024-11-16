# Limpiar todo
rm(list = ls())

# Librerias
library(jsonlite)
library(dplyr)
library(stringr)

# Leer datos
dir <- dirname(rstudioapi::getActiveDocumentContext()$path)
Raw <- read.csv(paste0(dir, "/csv/denuncias_ingresadas.csv"))

# Transformar datos
Data0 <- Raw

Data1 <- Raw %>%
  group_by(Año, Trimestre) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  mutate(year_trimestre = paste0(Trimestre, "-", str_sub(Año, 3,4)))

# Escribir JSON
write_json(toJSON(Data1), path=paste0(dir, "/json/denuncias_ingresadas.json"))

# Escribir JSON
write_json(toJSON(Data0), path = paste0(dir, "/json/denuncias_ingresadas_og.json"))