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
library(janitor)

######### LEER DATOS #########
dir <- dirname(rstudioapi::getActiveDocumentContext()$path)

planilla <- "https://docs.google.com/spreadsheets/d/1Zq5ghQLxkpWY3munP3AS-qdx0PmcRzQ2oTW6f1nePZ4/edit?usp=sharing"

Raw1 <- read_sheet(ss = planilla, sheet = "Cesareas_partos")

######### TRANSFORMAR DATOS #########

# Cesáreas y partos por departamento
Data1 <- Raw1 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Departamento) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  arrange(Año, Departamento)

# Cesáreas y partos por tipo de parto
Data2 <- Raw1 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Tipo) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  arrange(Año, desc(Cantidad))

######### ESCRIBIR DATOS #########
write_json(toJSON(Data1), path = paste0(dir, "/json/salud_partos_departamento.json"))
write_json(toJSON(Data2), path = paste0(dir, "/json/salud_partos_tipo.json"))