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

planilla <- "https://docs.google.com/spreadsheets/d/1mUMxGbv3x1hoVxWbTfAquSDR25YWnSDTL8T5MFkllvU/edit?usp=sharing"

Raw1 <- read_sheet(ss = planilla, sheet = "Denuncias_SUD")

######### TRANSFORMAR DATOS #########
# Tipo de denuncias
Data1 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Tipo) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  arrange(A�o) %>%
  ungroup %>%
  mutate(Tipo = case_when(Tipo == "Familiar" ~ "Violencia familiar",
                          Tipo == "G�nero" ~ "Violencia de g�nero",
                          Tipo == "No penal" ~ "Violencia no penal"))

# Evolucion
Data2 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Mes, Mes_ord) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  arrange(A�o, Mes_ord) %>%
  ungroup

# Por boca de denuncia
Data3 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Organismo) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  arrange(A�o)

######### ESCRIBIR DATOS #########
write_json(toJSON(Data1), path = paste0(dir, "/json/denuncias_sud_tipo.json"))
write_json(toJSON(Data2), path = paste0(dir, "/json/denuncias_sud_evolucion.json"))
write_json(toJSON(Data3), path = paste0(dir, "/json/denuncias_sud_boca.json"))