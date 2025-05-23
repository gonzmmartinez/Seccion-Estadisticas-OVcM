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

planilla <- "https://docs.google.com/spreadsheets/d/1F1A1fl2G8Xfk5TtkKqwDOJ16_tAQ3Pgsdb4WjoojGF4/edit?usp=sharing"

Raw1 <- read_sheet(ss = planilla, sheet = "Poder_ejecutivo")

######### TRANSFORMAR DATOS #########

# Gobernador
Data1 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Gobernador") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o)


# Vicegobernador
Data2 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Vicegobernador") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o)


# Ministerios
Data3 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Ministerios") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o)


# Intendencias
Data4 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Intendencias") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o)


# Secretarias
Data5 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Secretarias") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o)

######### ESCRIBIR DATOS #########
write_json(toJSON(Data1), path = paste0(dir, "/json/poder_ejecutivo_gobernador.json"))
write_json(toJSON(Data2), path = paste0(dir, "/json/poder_ejecutivo_vicegobernador.json"))
write_json(toJSON(Data3), path = paste0(dir, "/json/poder_ejecutivo_ministerios.json"))
write_json(toJSON(Data4), path = paste0(dir, "/json/poder_ejecutivo_intendencias.json"))
write_json(toJSON(Data5), path = paste0(dir, "/json/poder_ejecutivo_secretarias.json"))