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

Raw1 <- read_sheet(ss = "https://docs.google.com/spreadsheets/d/1Cfbecjc5DLo3uGsMEHscsfUC9YOtnKtFvt1bOZI_B4c/edit?usp=sharing",
                   sheet = "Ingresadas")

Raw2 <- read_sheet(ss = "https://docs.google.com/spreadsheets/d/1Cfbecjc5DLo3uGsMEHscsfUC9YOtnKtFvt1bOZI_B4c/edit?usp=sharing",
                   sheet = "Modalidad")

Raw3 <- read_sheet(ss = "https://docs.google.com/spreadsheets/d/1Cfbecjc5DLo3uGsMEHscsfUC9YOtnKtFvt1bOZI_B4c/edit?usp=sharing",
                   sheet = "Tipo")

######### TRANSFORMAR DATOS #########
# Ingresadas
Data1 <- Raw1 %>%
  filter(Tipo %ni% c("No configura VFG", "Consultas")) %>%
  group_by(Año, Distrito, Trimestre) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  mutate(year_trimestre = paste0(Trimestre, "-", str_sub(Año, 3,4)))
totalData1 <- Raw1 %>%
  filter(Tipo %ni% c("No configura VFG", "Consultas")) %>%
  group_by(Año, Trimestre) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  ungroup %>%
  mutate(Distrito = "TODOS") %>%
  mutate(year_trimestre = paste0(Trimestre, "-", str_sub(Año, 3,4)))
Data1 <- rbind(Data1, totalData1)

# Modalidad
Data2 <- Raw2 %>%
  filter(Modalidad != "Sin especificar") %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Modalidad) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  mutate(Porcentaje = 100 * Cantidad / sum(Cantidad))
totalData2 <- Raw2 %>%
  filter(Modalidad != "Sin especificar") %>%
  group_by(Modalidad) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  mutate(Porcentaje = 100 * Cantidad / sum(Cantidad)) %>%
  ungroup %>%
  mutate(Año = "TODOS")
Data2 <- rbind(Data2, totalData2) %>%
  arrange(Año, desc(Porcentaje))

# Modalidad
Data3 <- Raw3 %>%
  filter(Tipo != "Sin especificar") %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Tipo) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  mutate(Porcentaje = 100 * Cantidad / sum(Cantidad))
totalData3 <- Raw3 %>%
  filter(Tipo != "Sin especificar") %>%
  group_by(Tipo) %>%
  summarise(Cantidad = sum(Frecuencia)) %>%
  mutate(Porcentaje = 100 * Cantidad / sum(Cantidad)) %>%
  ungroup %>%
  mutate(Año = "TODOS")
Data3 <- rbind(Data3, totalData3) %>%
  arrange(Año, desc(Porcentaje))
  

# Escribir JSON
write_json(toJSON(Data1), path=paste0(dir, "/json/denuncias_ovfg_ingresadas.json"))

write_json(toJSON(Data2), path = paste0(dir, "/json/denuncias_ovfg_modalidades.json"))

write_json(toJSON(Data3), path = paste0(dir, "/json/denuncias_ovfg_tipos.json"))