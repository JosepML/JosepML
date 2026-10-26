-- EP Oscuridad (2026-10-26): la historia abre con el reparto. Ya aplicado en la base de datos; este archivo es el registro.
update public.proyectos set
  historia = $t$La dirección del EP fue de Noelia Fluxà y Julie Estel Soard. Yo hice la dirección de fotografía y la edición de algunos de los videoclips.

Adrián Muñoz recorre el enfado, la soledad, la ruptura, las cicatrices y la resignación. Mi trabajo fue pensar la imagen de la serie entera, no de cada vídeo por separado.$t$
where idioma = 'es' and slug = 'ep-oscuridad-adrian-munoz';
