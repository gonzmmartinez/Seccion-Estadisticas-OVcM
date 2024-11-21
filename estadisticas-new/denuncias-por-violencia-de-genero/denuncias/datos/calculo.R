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

# Leer datos
dir <- dirname(rstudioapi::getActiveDocumentContext()$path)

Raw <- read_sheet(ss = "https://docs.google.com/spreadsheets/d/1Cfbecjc5DLo3uGsMEHscsfUC9YOtnKtFvt1bOZI_B4c/edit?usp=sharing",
                   sheet = "Ingresadas")

Raw1 <- read_sheet(ss = "https://docs.google.com/spreadsheets/d/1Cfbecjc5DLo3uGsMEHscsfUC9YOtnKtFvt1bOZI_B4c/edit?usp=sharing",
                   sheet = "Modalidad")

######### TRANSFORMAR DATOS #########
# Ingresadas
Data0 <- Raw %>%
  filter(Tipo %ni% c("No configura VFG", "Consultas"))

Data1 <- Raw %>%
  group_by(Año, Trimestre) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  mutate(year_trimestre = paste0(Trimestre, "-", str_sub(Año, 3,4)))

# Modalidad
Data2 <- Raw1 %>%
  filter(Modalidad != "Sin especificar") %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Modalidad) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  mutate(Porcentaje = 100 * Cantidad / sum(Cantidad))
totalData2 <- Raw1 %>%
  filter(Modalidad != "Sin especificar") %>%
  group_by(Modalidad) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  mutate(Porcentaje = 100 * Cantidad / sum(Cantidad)) %>%
  ungroup %>%
  mutate(Año = "TODOS")
Data2 <- rbind(Data2, totalData2) %>%
  arrange(Año, desc(Porcentaje))
  

# Escribir JSON
write_json(toJSON(Data1), path=paste0(dir, "/json/denuncias_ingresadas.json"))

write_json(toJSON(Data0), path = paste0(dir, "/json/denuncias_ingresadas_og.json"))

write_json(toJSON(Data2), path = paste0(dir, "/json/denuncias_ovfg_modalidades.json"))