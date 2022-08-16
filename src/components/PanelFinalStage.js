import { useContext } from 'react';
import { Context } from './TabBox';
import nuevosDatosEquipos from './functions/nuevosDatosEquipos';
import './styles/PanelFinalStage.css'

function PlantillaFase ({fase, partidosFase, activarTabla, definirCampeon}) {

  const [equipos, setEquipos,
    partidos, setPartidos,
    , setEquiposTablaFinal] = useContext(Context);

  function setResultado(fase, equipoNombre, puntaje, tipoAnotacion, esLocal) {
    if (equipoNombre !== null) {
      let [partidoActualizado] = partidosFase.filter(partido => (
        partido.local.nombre === equipoNombre
        || partido.visitante.nombre === equipoNombre
      ));

      const restodePartidos = partidos.filter(partido => partido !== partidoActualizado);

      const resultado = puntaje !== '' && !(Number.isNaN(parseInt(puntaje))) ? parseInt(puntaje) : null;

      if (esLocal) {
        if (tipoAnotacion === 'gol') {
          partidoActualizado.local.resultado = resultado;
        } else if (tipoAnotacion === 'penal') {
          partidoActualizado.local.penales = resultado;
        }
      } else {
        if (tipoAnotacion === 'gol') {
          partidoActualizado.visitante.resultado = resultado;
        } else if (tipoAnotacion === 'penal') {
          partidoActualizado.visitante.penales = resultado;
        }
      }

      if (partidoActualizado.local.resultado !== partidoActualizado.visitante.resultado
        && partidoActualizado.local.penales === partidoActualizado.visitante.penales) {
        partidoActualizado.local.penales = null;
        partidoActualizado.visitante.penales = null;
      }

      setPartidos([...restodePartidos, partidoActualizado].sort((x, y) => x.id - y.id));
    };
  }

  function clasificarEquipos (e) {
    e.preventDefault();

    const nombreFase = partidosFase[0].grupo;
    let partidosActualizados = partidos.filter(partido => partido.id > 48);
    const restodePartidos = partidos.filter(partido => partido.id <= 48);
    let partidosReiniciados = partidosActualizados.filter(partido => partido.grupo !== nombreFase);

    partidosFase.forEach(partido => {
      if (partido.local.penales !== null
        && partido.visitante.penales !== null
        && partido.local.penales === partido.visitante.penales) {
        alert('Un partido no puede quedar empatado en penales')
        return;
      }
      else {
        let equipoGanador;
        let equipoPerdedor;

        if ((partido.local.resultado === partido.visitante.resultado
          && partido.local.penales > partido.visitante.penales)
        || (partido.local.resultado > partido.visitante.resultado)) {
            equipoGanador = partido.local.nombre;
            equipoPerdedor = partido.visitante.nombre;
        } else if ((partido.local.resultado === partido.visitante.resultado
          && partido.local.penales < partido.visitante.penales)
        || (partido.local.resultado < partido.visitante.resultado)) {
          equipoGanador = partido.visitante.nombre;
          equipoPerdedor = partido.local.nombre;
        }

        partido.ganador = equipoGanador;
        partido.perdedor = equipoPerdedor;
      }
    });

    if (nombreFase === 'octavosFinal') {
      activarTabla();
    }
  
    partidosReiniciados.forEach(partido => {
      const idLocal = partido.local.id;
      const idVisitante = partido.visitante.id;
      let nombreLocal;
      let nombreVisitante;
      if ((nombreFase === 'octavosFinal' && partido.grupo === 'cuartosFinal')
      || (nombreFase === 'cuartosFinal' && partido.grupo === 'semifinal')
      || (nombreFase === 'semifinal' && (partido.grupo === 'partidoTercerLugar' || partido.grupo === 'final'))) {
        if (partido.grupo !== 'partidoTercerLugar') {
          nombreLocal = partidosFase
            .filter(partido => partido.id === parseInt(idLocal.replace('GP', '')))[0].ganador;
          nombreVisitante = partidosFase
            .filter(partido => partido.id === parseInt(idVisitante.replace('GP', '')))[0].ganador;
        } else {
          nombreLocal = partidosFase
            .filter(partido => partido.id === parseInt(idLocal.replace('PP', '')))[0].perdedor;
          nombreVisitante = partidosFase
            .filter(partido => partido.id === parseInt(idVisitante.replace('PP', '')))[0].perdedor;
        };
        partido.local = { id: idLocal, nombre: nombreLocal? nombreLocal: null, resultado: null, penales: null };
        partido.visitante = { id: idVisitante, nombre: nombreVisitante? nombreVisitante: null, resultado: null, penales: null };
        partido.ganador = null;
        partido.perdedor = null;
      } else if ((nombreFase === 'octavosFinal' && ['semifinal', 'partidoTercerLugar', 'final'].includes(partido.grupo))
      || (nombreFase === 'cuartosFinal' && ['partidoTercerLugar', 'final'].includes(partido.grupo))) {
        partido.local = { id: idLocal, nombre:  null, resultado: null, penales: null };
        partido.visitante = { id: idVisitante, nombre: null, resultado: null, penales: null };
        partido.ganador = null;
        partido.perdedor = null;
      };
    });

    partidosActualizados = [...partidosFase, ...partidosReiniciados].sort((x, y) => x.id - y.id);
    setPartidos([...restodePartidos, ...partidosActualizados]);

    equipos.forEach(equipo => {
      if (nombreFase === 'semifinal') {
        if (partidosFase.some(partido => partido.ganador === equipo.nombre)) {
          equipo.clasificado = 'final';
        }
        else if (partidosFase.some(partido => partido.perdedor === equipo.nombre)) {
          equipo.clasificado = 'partidoTercerLugar';
        }
      }
      else if (partidosFase.some(partido => partido.ganador === equipo.nombre)) {
        if (nombreFase === 'octavosFinal') {
          equipo.clasificado = 'cuartosFinal';
        }
        else if (nombreFase === 'cuartosFinal') {
          equipo.clasificado = 'semifinal';
        }
      }
    });

    if (nombreFase === 'final') {
      let equipoCampeon = null;

      for (const equipo of equipos) {
        if (partidosFase[0].ganador === equipo.nombre) {
          equipoCampeon = equipo.nombre;
          definirCampeon(equipoCampeon);
          break;
        };
      }
    };
    setEquipos([...equipos]);
  

    /* actualizar los resultados en tabla final de equipos */
    // coger los resultados de la fase final
    // agarrar los goles hechos por cada equipo y los suma en la tabla de equipos
    // a partir de semifinal, ponerles el puesto de primero, segundo, tercero, cuarto

    const nombreEquiposFaseFinalLocal = partidos
      .filter(partido => partido.id > 48 && partido.id <= 56)
      .map(partido => partido.local.nombre);
    const nombreEquiposFaseFinalVisitante = partidos
      .filter(partido => partido.id > 48 && partido.id <= 56)
      .map(partido => partido.visitante.nombre);
    const nombreEquiposFaseFinal = [...nombreEquiposFaseFinalLocal, ...nombreEquiposFaseFinalVisitante];

    const [partidosJugados, victorias, empates, derrotas,
      golesFavorLocal, golesFavorVisitante, golesContraLocal,
      golesContraVisitante] = nuevosDatosEquipos(nombreEquiposFaseFinal, partidosActualizados);

    let objEquiposActualizados = [];

    nombreEquiposFaseFinal.forEach((equipoNombre, indice) => {
      let [equipoActualizado] = equipos.filter(equipo => equipo.nombre === equipoNombre);

      equipoActualizado = {
        ...equipoActualizado,
        partidos: equipoActualizado.partidos + partidosJugados[indice],
        victorias: equipoActualizado.victorias + victorias[indice],
        empates: equipoActualizado.empates + empates[indice],
        derrotas: equipoActualizado.derrotas + derrotas[indice],
        golesFavor: equipoActualizado.golesFavor + golesFavorLocal[indice] + golesFavorVisitante[indice],
        golesContra: equipoActualizado.golesContra + golesContraLocal[indice] + golesContraVisitante[indice],
        puntos: equipoActualizado.puntos + victorias[indice] * 3 + empates[indice],
        puesto: 0
      }

      objEquiposActualizados.push(equipoActualizado);
    });

    const restoDeEquipos = equipos
      .filter(equipo => !(nombreEquiposFaseFinal.includes(equipo.nombre)));

    const ordenClasificacion = {
      faseDeGrupos: 0,
      octavosFinal: 1,
      cuartosFinal: 2,
      semifinal: 3,
      partidoTercerLugar: 4,
      final: 5
    };

    const tablaFinalActualizada = [...restoDeEquipos, ...objEquiposActualizados].sort((x, y) => {
      if (ordenClasificacion[y.clasificado] === ordenClasificacion[x.clasificado]) {
        if ([4, 5].includes(ordenClasificacion[y.clasificado])) {
          const [ganador] = partidos
            .filter((partido) => partido.grupo === y.clasificado)
            .map((partido) => partido.ganador );
          return ganador === y.nombre? 1: -1;
        }
        else {
          if ( y.puntos === x.puntos ) {
            if (( y.golesFavor - y.golesContra ) === ( x.golesFavor - x.golesContra)) {
              return y.golesFavor - x.golesFavor;
            }
            else {
              return (y.golesFavor - y.golesContra ) - ( x.golesFavor - x.golesContra);
            }
          }
          else {
            return y.puntos - x.puntos;
          }
        }
      }
      else {
        return ordenClasificacion[y.clasificado] - ordenClasificacion[x.clasificado];
      }
    });

    setEquiposTablaFinal([...tablaFinalActualizada]);
  };

	return (
    <>
      <h2>{fase}</h2>
      <form onSubmit={clasificarEquipos}>
        {partidosFase.map((partido, index) => (
          <div key={index} className='partidos-fasefinal-inline'>
            <div className='golesPartido'>
              <label
                htmlFor={`local-${partido.local.id}`} >
                {partido.local.nombre !== null ? partido.local.nombre: partido.local.id}
              </label>
              <input
                id={`local-${partido.local.id}`}
                type="tel"
                maxLength="2"
                disabled={partido.local.nombre? false: true}
                defaultValue={partido.local.resultado !== null ? partido.local.resultado: ''}
                onChange={(e) => setResultado(partido.grupo, partido.local.nombre, e.target.value, 'gol', true)} />
              <p>-</p>
              <input
                id={`visitante-${partido.visitante.id}`}
                type="tel"
                maxLength="2"
                disabled={partido.visitante.nombre? false: true}
                defaultValue={partido.visitante.resultado !== null ? partido.visitante.resultado: ''}
                onChange={(e) => setResultado(partido.grupo, partido.visitante.nombre, e.target.value, 'gol', false)} />
              <label
                htmlFor={`visitante-${partido.visitante.id}`} >
                {partido.visitante.nombre !== null ? partido.visitante.nombre: partido.visitante.id}
              </label>
            </div>
            <div
              className="penalesPartido"
              style={{display: partido.local.resultado === partido.visitante.resultado
                && partido.local.resultado !== null ?
                'flex': 'none'}} >
              <p>Penales</p>
                <input
                  id={`local-${partido.local.id}-penales`}
                  type="tel"
                  maxLength="2"
                  disabled={partido.local.nombre? false: true}
                  defaultValue={partido.local.goles !== null ? partido.local.penales: ''}
                  onChange={(e) => setResultado(partido.grupo, partido.local.nombre, e.target.value, 'penal', true)} />
                <p>-</p>
                <input
                  id={`visitante-${partido.visitante.id}-penales`}
                  type="tel"
                  maxLength="2"
                  disabled={partido.visitante.nombre? false: true}
                  defaultValue={partido.visitante.penales !== null ? partido.visitante.penales: ''}
                  onChange={(e) => setResultado(partido.grupo, partido.visitante.nombre, e.target.value, 'penal', false)} />
            </div>
          </div>
			  ))}
        <button
          type="submit"
          disabled={partidosFase.every(partido => (partido.local.nombre !== null
            && partido.visitante.nombre !== null &&
            ((partido.local.resultado !== null && partido.visitante.resultado != null
              && partido.local.resultado !== partido.visitante.resultado)
            ||(partido.local.resultado === partido.visitante.resultado
              && partido.local.penales != null && partido.visitante.penales != null))))?
            false: true}
          >Calcular</button>
      </form>
    </>
	);
}

export function PanelOctavosFinal ({activarTabla}) {

	const [, , partidos, ] = useContext(Context);

	const fase = 'Octavos de Final';

  const partidosFase = partidos
    .filter( partido => partido.grupo === 'octavosFinal')
    .sort((x, y) => x.id - y.id);

	return (
		<PlantillaFase className='OFPlantilla' fase={fase} partidosFase={partidosFase} activarTabla={activarTabla} />
	)
}

export function PanelCuartosFinal () {
  const [, , partidos, ] = useContext(Context);
	const fase = 'Cuartos de Final';
	const partidosFase = partidos
    .filter( partido => partido.grupo === 'cuartosFinal')
    .sort((x, y) => x.id - y.id);

	return (
		<PlantillaFase className='CFPlantilla' fase={fase} partidosFase={partidosFase} />
	);
}

export function PanelSemifinal () {
  const [, , partidos, ] = useContext(Context);
	const fase = 'Semifinal';
	const partidosFase = partidos
    .filter( partido => partido.grupo === 'semifinal')
    .sort((x, y) => x.id - y.id);

	return (
		<PlantillaFase className='SFPlantilla' fase={fase} partidosFase={partidosFase} />
	);
}

export function PanelFinal ({definirCampeon, campeon}) {
  const [equipos, , partidos, ] = useContext(Context);
  const partidosTercerLugar = partidos
  .filter( partido => partido.grupo === 'partidoTercerLugar')
  .sort((x, y) => x.id - y.id);
  const partidosFinal = partidos
    .filter( partido => partido.grupo === 'final')
    .sort((x, y) => x.id - y.id);
  const strImgCampeon = campeon? equipos.filter(equipo => equipo.nombre === campeon)[0].imgcampeon: '';

	return (
    <>
      <PlantillaFase className='PTLPlantilla' fase={'Partido por el Tercer lugar'} partidosFase={partidosTercerLugar} />
      <PlantillaFase className='FinalPlantilla' fase={'Final'} partidosFase={partidosFinal} definirCampeon={definirCampeon}/>
      <div style={{display: campeon? 'initial': 'none'}}>
        {campeon? <img
          src={require(`./images/${strImgCampeon}`)}
          alt={campeon}
          className="champion" />: <></>}
        <p>Felicidades, {campeon}, eres el campeón del FIFA World Cup Qatar 2022</p>
      </div>
    </>
	);
}
