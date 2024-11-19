# Limpiar todo
rm(list = ls())

# Funciones
`%ni%` <- Negate(`%in%`)

# Librerias
library(jsonlite)
library(dplyr)
library(stringr)
library(readr)
library(googlesheets4)

# Leer datos
dir <- dirname(rstudioapi::getActiveDocumentContext()$path)

Raw <- read_sheet(ss = "https://docs.google.com/spreadsheets/d/1Cfbecjc5DLo3uGsMEHscsfUC9YOtnKtFvt1bOZI_B4c/edit?usp=sharing",
                   sheet = "Ingresadas")

# Transformar datos
Data0 <- Raw %>%
  filter(Tipo %ni% c("No configura VFG", "Consultas"))

Data1 <- Raw %>%
  group_by(Año, Trimestre) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  mutate(year_trimestre = paste0(Trimestre, "-", str_sub(Año, 3,4)))

# Escribir JSON
write_json(toJSON(Data1), path=paste0(dir, "/json/denuncias_ingresadas.json"))

# Escribir JSON
write_json(toJSON(Data0), path = paste0(dir, "/json/denuncias_ingresadas_og.json"))