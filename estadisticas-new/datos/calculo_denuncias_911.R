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

planilla <- "https://docs.google.com/spreadsheets/d/1fX8iWndJKs_UTTcB1SoU5tpTK7ysVvxJeyVAE0C5gro/edit?usp=sharing"

Raw1 <- read_sheet(ss=planilla, sheet="Mes")
Raw2 <- read_sheet(ss=planilla, sheet="Dia")
Raw3 <- read_sheet(ss=planilla, sheet="Hora")


######### TRANSFORMAR DATOS #########
# Evoluci�n
Data1 <- Raw1 %>%
  filter(Tipo != "Abuso sexual", Mes_num <= 6) %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  arrange(A�o)

# Por mes
Data2 <- Raw1 %>%
  filter(Tipo != "Abuso sexual") %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Mes, Mes_num) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  arrange(A�o, Mes_num)

# Tipo de violencia y accion
Data3 <- Raw1 %>%
  filter(Tipo != "Abuso sexual") %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Accion, Tipo) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  ungroup %>%
  mutate(Accion_ord = case_when(Accion == "Llamadas" ~ 1,
                                Accion == "Intervenciones" ~ 2,
                                Accion == "Intervenciones SAMEC" ~ 3)) %>%
  arrange(A�o, Accion_ord)

# Requerimientos por dia
Data4 <- Raw2 %>%
  filter(Tipo != "Abuso sexual") %>%
  mutate(A�o = as.character(A�o)) %>%
  group_by(A�o, Mes, Mes_num, Dia, Dia_num) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  arrange(A�o, desc(Mes_num), Dia_num)

# Requerimientos por hora
Data5 <- Raw3 %>%
  filter(Tipo != "Abuso sexual") %>%
  mutate(A�o = as.character(A�o),
         Hora = formatC(Hora, width=2, flag="0")) %>%
  group_by(A�o, Mes, Mes_num, Hora) %>%
  summarise(Cantidad = sum(Cantidad)) %>%
  arrange(A�o, desc(Mes_num), Hora)

######### ESCRIBIR DATOS #########
write_json(toJSON(Data1), path = paste0(dir, "/json/denuncias_911_evolucion.json"))

write_json(toJSON(Data2), path = paste0(dir, "/json/denuncias_911_por_mes.json"))

write_json(toJSON(Data3), path = paste0(dir, "/json/denuncias_911_violencia_accion.json"))

write_json(toJSON(Data4), path = paste0(dir, "/json/denuncias_911_dia.json"))

write_json(toJSON(Data5), path = paste0(dir, "/json/denuncias_911_hora.json"))