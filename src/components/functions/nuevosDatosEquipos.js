export default function nuevosDatosEquipos (nombreEquipos, partidos) {
  const partidosJugados = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      [partido.local.nombre, partido.visitante.nombre].includes(equipo)?
      total + 1 : total), 0)
  ));

  const victorias = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      (partido.local.nombre === equipo
        && partido.local.resultado != null
        && partido.visitante.resultado != null
        && partido.local.resultado > partido.visitante.resultado) ||
      (partido.visitante.nombre === equipo
        && partido.local.resultado != null
        && partido.visitante.resultado != null
        && partido.visitante.resultado > partido.local.resultado) ?
      total + 1 : total), 0)
  ));

  const empates = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      (partido.local.nombre === equipo || partido.visitante.nombre === equipo)
      && (partido.local.resultado != null && partido.visitante.resultado != null)
      && (partido.local.resultado === partido.visitante.resultado)  ?
      total + 1 : total), 0)
  ));

  const derrotas = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      (partido.local.nombre === equipo
        && partido.local.resultado != null
        && partido.visitante.resultado != null
        && partido.local.resultado < partido.visitante.resultado) ||
      (partido.visitante.nombre === equipo
        && partido.local.resultado != null
        && partido.visitante.resultado != null
        && partido.visitante.resultado < partido.local.resultado) ?
      total + 1 : total), 0)
  ));

  const golesFavorLocal = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      (partido.local.nombre === equipo
        && partido.local.resultado != null) ?
        total + partido.local.resultado : total), 0)
  ));

  const golesFavorVisitante = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      (partido.visitante.nombre === equipo
        && partido.visitante.resultado != null) ?
        total + partido.visitante.resultado : total), 0)
  ));

  const golesContraLocal = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      (partido.local.nombre === equipo
        && partido.visitante.resultado != null) ?
        total + partido.visitante.resultado : total), 0)
  ));

  const golesContraVisitante = nombreEquipos.map((equipo) => (
    partidos
    .reduce((total, partido) => (
      (partido.visitante.nombre === equipo
        && partido.local.resultado != null) ?
        total + partido.local.resultado : total), 0)
  ));

  return ([partidosJugados, victorias, empates, derrotas,
    golesFavorLocal, golesFavorVisitante, golesContraLocal,
    golesContraVisitante])
}