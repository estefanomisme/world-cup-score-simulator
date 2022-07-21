import { useState, useContext } from 'react';
import { Context } from './TabBox';
import './styles/PanelFinalStage.css'

function PlantillaFase ({fase, partidosFase}) {

  const [equipos, setEquipos, partidos, setPartidos] = useContext(Context);

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

      setPartidos([...restodePartidos, partidoActualizado].sort((x, y) => x.id - y.id));
    };
  }

  function clasificarEquipos (e) {
    e.preventDefault();
    const nombreFase = partidosFase[0].grupo;
    let partidosActualizados = partidos.filter(partido => partido.id > 48);
    const partidosGrupo = partidosActualizados.filter(partido => partido.grupo === nombreFase);

    let nombreEquiposClasificados = [];

    partidosGrupo.forEach(partido => {
      if (partido.local.penales !== null
        && partido.visitante.penales !== null
        && partido.local.penales === partido.visitante.penales) {
        alert('Un partido no puede quedar empatado en penales')
        return;
      }
      else {
        const equipoGanador = partido.local.goles === partido.visante.goles ? (
          partido.local.penales > partido.visante.penales ? partido.local.nombre: partido.visante.nombre
        ): (
          partido.local.goles > partido.visante.goles ? partido.local.nombre: partido.visante.nombre
          );
        nombreEquiposClasificados.push(equipoGanador);
      }
    });

    let equiposClasificados = equipos.filter((equipo, indice) => (
      equipo.nombre === nombreEquiposClasificados[indice])
    );

    /* 1. seleccionar a los equipos clasificados a la siguiente fase
       2. borrar todos los partidos de la siguiente fase */

    if (nombreFase === 'octavosFinal') {
      equiposClasificados.forEach(equipo => {
        equipo.clasificado = 'cuartosFinal';
      });
      partidosActualizados.forEach(partido => {
        if (partido.grupo === 'octavosFinal') {
          partidoSiguienteFase = partidosActualizados
            .filter(partidoSF => partidoSF.local.id === 'GP' + partido.id
              || partidoSF.local.id === 'GP' + partido.id);
          if (partidoSiguienteFase.local.id === 'GP' + partido.id) {
            partidoSiguienteFase.local.nombre = ;
          }
          // equipoSiguienteFase.id = 'GP' + partido.id;
          // equipoClasificado = equiposClasificados
          //   .filter(equipo => [partido.local.nombre, partido.visitante.nombre].includes(equipo.nombre));
          // equipoSiguienteFase.nombre = partido.local.nombre === equipoClasificado.nombre?
          //   equipoClasificado.nombre: null;
        }
        
        else if (['semifinal', 'partidoTercerLugar', 'final'].includes(partido.grupo)) {
          let localId = partido.local.id;
          let visitanteId = partido.visitante.id;
          partido = {...partido,
            local: {id: localId, nombre: null, resultado: null, penales: null},
            visitante: {id: visitanteId, nombre: null, resultado: null, penales: null}}
        }
      })
    } else if (nombreFase === 'cuartosFinal') {
      equiposClasificados.forEach(equipo => {
        equipo.clasificado = 'semifinal';
      });
      partidosActualizados.forEach(partido => {
        if (['semifinal', 'partidoTercerLugar', 'final'].includes(partido.grupo)) {
          let localId = partido.local.id;
          let visitanteId = partido.visitante.id;
          partido = {...partido,
            local: {id: localId, nombre: null, resultado: null, penales: null},
            visitante: {id: visitanteId, nombre: null, resultado: null, penales: null}}
        }
      })
    } else if (nombreFase === 'semifinal') {
      let [equipoGanador] = equiposClasificados;
      let equipoPerdedor = equipos
        .filter(equipo => equipo.clasificado === 'semifinal')
        .filter(equipo => equipo !== equipoGanador);
      equipoGanador.clasificado = 'final';
      equipoPerdedor.clasificado = 'partidoTercerLugar';
    }
  }

	return (
    <>
      <h2>{fase}</h2>
      <form /*onSubmit={clasificarEquipos}*/>
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
                  defaultValue={partido.local.penales !== null ? partido.local.penales: ''}
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
        <button type="submit">Calcular</button>
      </form>
    </>
	);
}

export function PanelOctavosFinal () {

	const [, , partidos, setPartidos] = useContext(Context);

	const fase = 'Octavos de Final';

  const partidosFase = partidos
    .filter( partido => partido.grupo === 'octavosFinal')
    .sort((x, y) => x.id - y.id);

	return (
		<PlantillaFase className='OFPlantilla' fase={fase} partidosFase={partidosFase} />
	)
}

export function PanelCuartosFinal () {
  const [, , partidos, setPartidos] = useContext(Context);
	const fase = 'Cuartos de Final';
	const partidosFase = partidos
    .filter( partido => partido.grupo === 'cuartosFinal')
    .sort((x, y) => x.id - y.id);

	return (
		<PlantillaFase className='CFPlantilla' fase={fase} partidosFase={partidosFase} />
	);
}

export function PanelSemifinal () {
  const [, , partidos, setPartidos] = useContext(Context);
	const fase = 'Semifinal';
	const partidosFase = partidos
    .filter( partido => partido.grupo === 'semifinal')
    .sort((x, y) => x.id - y.id);

	return (
		<PlantillaFase className='SFPlantilla' fase={fase} partidosFase={partidosFase} />
	);
}

export function PanelFinal () {
  const [, , partidos, setPartidos] = useContext(Context);
	const fase = 'Final';
  const partidosFase = partidos
    .filter( partido => partido.grupo === 'final')
    .sort((x, y) => x.id - y.id);

	return (
		<PlantillaFase className='FinalPlantilla' fase={fase} partidosFase={partidosFase} />
	);
}
