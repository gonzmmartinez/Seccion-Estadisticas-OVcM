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
Raw2 <- read_sheet(ss = planilla, sheet = "Cesareas_partos_edad")

######### TRANSFORMAR DATOS #########

# Ces�reas y partos por departamento
Data1 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Departamento) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  arrange(A�o, Departamento)

# Ces�reas y partos por tipo de parto
Data2 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Tipo) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  arrange(A�o, desc(Cantidad))

# Ces�reas y partos por edades agrupadas
Data3 <- Raw2 %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Rango_etario, Rango_ord) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  arrange(A�o, Rango_ord)

######### ESCRIBIR DATOS #########
write_json(toJSON(Data1), path = paste0(dir, "/json/salud_partos_departamento.json"))
write_json(toJSON(Data2), path = paste0(dir, "/json/salud_partos_tipo.json"))
write_json(toJSON(Data3), path = paste0(dir, "/json/salud_partos_edad.json"))