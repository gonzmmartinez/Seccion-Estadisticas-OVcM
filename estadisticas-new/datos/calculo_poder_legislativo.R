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

planilla <- "https://docs.google.com/spreadsheets/d/120Juz6y-Ika8IK5v2p_FlhmgRxqOXFaLvQ6MirE5Xts/edit?usp=sharing"

Raw1 <- read_sheet(ss = planilla, sheet = "Nacionales")
Raw2 <- read_sheet(ss = planilla, sheet = "Provinciales")

######### TRANSFORMAR DATOS #########

# Diputados nacionales por Salta
Data1 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Diputados Nacionales") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o)

# Senadores nacionales por Salta
Data2 <- Raw1 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Senadores Nacionales") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o)

# Diputados Provinciales
Data3 <- Raw2 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Diputados Provinciales") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o) %>%
  select(-Cargo)
totales3 <- Raw2 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Diputados Provinciales") %>%
  rename(Cantidad = "Frecuencia") %>%
  group_by(A�o, G�nero) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  ungroup %>%
  mutate(Departamento = "TODOS")
Data3 <- rbind(Data3, totales3)

# Senadores Provinciales
Data4 <- Raw2 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Senadores Provinciales") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o) %>%
  select(-Cargo)
totales4 <- Raw2 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Senadores Provinciales") %>%
  rename(Cantidad = "Frecuencia") %>%
  group_by(A�o, G�nero) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  ungroup %>%
  mutate(Departamento = "TODOS")
Data4 <- rbind(Data4, totales4)

# Concejo deliberante
Data5 <- Raw2 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Concejo Deliberante") %>%
  rename(Cantidad = "Frecuencia") %>%
  arrange(A�o) %>%
  select(-Cargo)
totales5 <- Raw2 %>%
  mutate(A�o = as.character(A�o)) %>%
  filter(Cargo == "Concejo Deliberante") %>%
  rename(Cantidad = "Frecuencia") %>%
  group_by(A�o, G�nero) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  ungroup %>%
  mutate(Departamento = "TODOS")
Data5 <- rbind(Data5, totales5)

######### ESCRIBIR DATOS #########
write_json(toJSON(Data1), path = paste0(dir, "/json/poder_legislativo_diputados.json"))
write_json(toJSON(Data2), path = paste0(dir, "/json/poder_legislativo_senadores.json"))
write_json(toJSON(Data3), path = paste0(dir, "/json/poder_legislativo_diputados_prov.json"))
write_json(toJSON(Data4), path = paste0(dir, "/json/poder_legislativo_senadores_prov.json"))
write_json(toJSON(Data5), path = paste0(dir, "/json/poder_legislativo_concejo.json"))