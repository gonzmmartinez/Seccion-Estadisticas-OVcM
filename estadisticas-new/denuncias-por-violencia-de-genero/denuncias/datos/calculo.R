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
Data1 <- Raw %>%
  group_by(Año, Trimestre) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  mutate(year_trimestre = paste0(Trimestre, "-", str_sub(Año, 3,4)))
 
# Calcular 
JSON <- toJSON(Data1)

# Escribir JSON
write_json(JSON, path=paste0(dir, "/json/denuncias_ingresadas.json"))