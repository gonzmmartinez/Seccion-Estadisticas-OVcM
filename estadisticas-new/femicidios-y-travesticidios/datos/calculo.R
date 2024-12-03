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

planilla <- "https://docs.google.com/spreadsheets/d/1_n2tTaEXNYTv7fGRLLXt65W49wvFmE3eDpxiBZqmMZk/edit?usp=sharing"

Raw0 <- read_sheet(ss = planilla, sheet = "REGISTRO")

Raw1 <- read_sheet(ss = planilla, sheet = "CAUSAS TOTALES" )

Raw2 <- read_sheet(ss = planilla, sheet = "CAUSAS JUDICIALES" )

######### TRANSFORMAR DATOS #########

# Rango etario
Data3 <- Raw0 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Rango_etario) %>%
  summarise(Cantidad = n()) %>%
  ungroup %>%
  mutate(Ord_rango_etario = case_when(Rango_etario == "Menos de 18 años" ~ 1,
                                      Rango_etario == "18-29 años" ~ 2,
                                      Rango_etario == "30-39 años" ~ 3,
                                      Rango_etario == "40-49 años" ~ 4,
                                      Rango_etario == "50 años o más" ~ 5,
                                      Rango_etario == "Sin dato" ~ 6,)) %>%
  arrange(Ord_rango_etario)

# Vínculo
Data4 <- Raw0 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Vinculo) %>%
  summarise(Cantidad = n()) %>%
  ungroup %>%
  arrange(desc(Cantidad))

# Hijas/os de las victimas
Data5 <- Raw0 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Hijos) %>%
  summarise(Cantidad = n()) %>%
  ungroup %>%
  arrange(Hijos)

# Lugar del hecho
Data6 <- Raw0 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Lugar_del_hecho) %>%
  summarise(Cantidad = n()) %>%
  ungroup %>%
  arrange(Lugar_del_hecho)

# Medio utilizado
Data7 <- Raw0 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Medio_utilizado) %>%
  summarise(Cantidad = n()) %>%
  ungroup %>%
  arrange(Medio_utilizado)

# Causas totales
Data8 <- Raw1 %>%
  mutate(Año = as.character(Año)) %>%
  mutate(Estado = case_when(Estado == "Caratulado" ~ "Tienen la carátula provisoria de femicidio",
                            Estado == "En etapa de investigación" ~ "Se encuentran en etapa de investigación",
                            .default = Estado)) %>%
  arrange(Cantidad)

# Causas judiciales
Data9 <- Raw2 %>%
  mutate(Año = as.character(Año))

# Localidad
Departamentos <- data.frame(Localidad = rep(c("Anta", "Cachi", "Cafayate", "Capital", "Cerrillos", "Chicoana", "General Güemes",
                                          "General José de San Martín", "Guachipas", "Iruya", "La Caldera", "La Candelaria",
                                          "La Poma", "La Viña", "Los Andes", "Metán", "Molinos", "Orán", "Rivadavia",
                                          "Rosario de la Frontera", "Rosario de Lerma", "San Carlos", "Santa Victoria"), 5)) %>%
  mutate(Año = rep(c("2020", "2021", "2022", "2023", "2024"), each=23)) %>%
  mutate(ID = paste0(str_sub(Año, 3), "-", Localidad))
Data10 <- Raw0 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año, Localidad) %>%
  summarise(Cantidad = n()) %>%
  ungroup %>%
  mutate(ID = paste0(str_sub(Año, 3), "-", Localidad))
Data10 <- Departamentos %>%
  left_join(select(Data10, ID, Cantidad), by="ID") %>%
  replace(is.na(.), 0)

# Femicidios caratulados
Data11 <- Raw0 %>%
  mutate(Año = as.character(Año)) %>%
  group_by(Año) %>%
  summarise(Cantidad = n())

######### ESCRIBIR DATOS #########
write_json(toJSON(Data3), path = paste0(dir, "/json/femicidios_edades.json"))

write_json(toJSON(Data4), path = paste0(dir, "/json/femicidios_vinculo.json"))

write_json(toJSON(Data5), path = paste0(dir, "/json/femicidios_hijos.json"))

write_json(toJSON(Data6), path = paste0(dir, "/json/femicidios_lugar_del_hecho.json"))

write_json(toJSON(Data7), path = paste0(dir, "/json/femicidios_medio_utilizado.json"))

write_json(toJSON(Data8), path=paste0(dir, "/json/femicidios_causas_totales.json"))

write_json(toJSON(Data9), path=paste0(dir, "/json/femicidios_causas_judiciales.json"))

write_json(toJSON(Data10), path=paste0(dir, "/json/femicidios_localidad.json"))

write_json(toJSON(Data11), path=paste0(dir, "/json/femicidios_cantidad.json"))