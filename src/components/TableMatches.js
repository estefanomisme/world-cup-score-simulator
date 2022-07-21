import { useContext } from 'react';
import './styles/react-tabs.css';
import './styles/TableMatches.css';
import { Context } from './TabBox';

function TableMatches({equiposGrupo, partidosGrupo}) {

	const [equipos, setEquipos, partidos, setPartidos] = useContext(Context);

	const equipo1 = equiposGrupo.filter(equipo => equipo.bombo === 1)[0].nombre;
	const equipo2 = equiposGrupo.filter(equipo => equipo.bombo === 2)[0].nombre;
	const equipo3 = equiposGrupo.filter(equipo => equipo.bombo === 3)[0].nombre;
	const equipo4 = equiposGrupo.filter(equipo => equipo.bombo === 4)[0].nombre;

	function setResultado(nFecha, equipoNombre, goles, esLocal) {

		let [partidoActualizado] = partidosGrupo
			.filter( partido => partido.fecha === nFecha
				&& (partido.local.nombre === equipoNombre || partido.visitante.nombre === equipoNombre));
		const restoDePartidos = partidos.filter( partido => partido !== partidoActualizado );

		const resultado = goles !== '' && !(Number.isNaN(parseInt(goles))) ? parseInt(goles) : null;

		if (esLocal === true) {
			partidoActualizado = {...partidoActualizado, local: {nombre: equipoNombre, resultado: resultado}};
		} else {
			partidoActualizado = {...partidoActualizado, visitante: {nombre: equipoNombre, resultado: resultado}};
		}

		setPartidos([...restoDePartidos, partidoActualizado].sort((x, y) => x.id - y.id));
	}

	function enviarResultadosATabla(e) {
    /* Envia los resultados a la tabla de clasificaciones */
		e.preventDefault();

		const partidosLlenados = partidosGrupo
			.filter( partido => partido.local.resultado !== null
				&& partido.visitante.resultado !== null);

		const listaNombreEquiposActualizados = [equipo1, equipo2, equipo3, equipo4];

		let listaEquiposActualizados = equipos
			.filter(equipo => equipo.nombre === equipo1
				|| equipo.nombre === equipo2
				|| equipo.nombre === equipo3
				|| equipo.nombre === equipo4).sort((x, y) => x.bombo - y.bombo)
	
		const restodeEquipos = equipos
			.filter(equipo => equipo.nombre !== equipo1
				&& equipo.nombre !== equipo2
				&& equipo.nombre !== equipo3
				&& equipo.nombre !== equipo4);

    const partidosJugados = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        partido.local.nombre === equipo ||
        partido.visitante.nombre === equipo ?
        total + 1 : total), 0)
    ));

    const victorias = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        (partido.local.nombre === equipo && partido.local.resultado > partido.visitante.resultado) ||
        (partido.visitante.nombre === equipo && partido.visitante.resultado > partido.local.resultado) ?
        total + 1 : total), 0)
    ));

    const empates = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        (partido.local.nombre === equipo || partido.visitante.nombre === equipo)
				&& (partido.local.resultado === partido.visitante.resultado)  ?
        total + 1 : total), 0)
    ));

    const derrotas = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        (partido.local.nombre === equipo && partido.local.resultado < partido.visitante.resultado) ||
        (partido.visitante.nombre === equipo && partido.visitante.resultado < partido.local.resultado) ?
        total + 1 : total), 0)
    ));

    const golesFavorLocal = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        (partido.local.nombre === equipo) ? total + partido.local.resultado : total
      ), 0)
    ));

    const golesFavorVisitante = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        (partido.visitante.nombre === equipo) ? total + partido.visitante.resultado : total
      ), 0)
    ));

    const golesContraLocal = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        (partido.local.nombre === equipo) ? total + partido.visitante.resultado : total
      ), 0)
    ));

    const golesContraVisitante = listaNombreEquiposActualizados.map((equipo) => (
      partidosLlenados
      .reduce((total, partido) => (
        (partido.visitante.nombre === equipo) ? total + partido.local.resultado : total
      ), 0)
    ));

    let objEquiposActualizados = listaEquiposActualizados.map((equipo, indice) => ({...equipo,
      partidos: partidosJugados[indice],
      victorias: victorias[indice],
      empates: empates[indice],
      derrotas: derrotas[indice],
      golesFavor: golesFavorLocal[indice] + golesFavorVisitante[indice],
      golesContra: golesContraLocal[indice] + golesContraVisitante[indice],
      puntos: victorias[indice] * 3 + empates[indice],
    }))

		objEquiposActualizados = objEquiposActualizados.sort((y, x) => {
			if ( x.puntos === y.puntos ) {
				if (( x.golesFavor - x.golesContra ) === ( y.golesFavor - y.golesContra)) {
					return x.golesFavor - y.golesFavor;
				}
				else {
					return (x.golesFavor - x.golesContra ) - ( y.golesFavor - y.golesContra)
				}
			}
			else {
				return x.puntos - y.puntos;
			}
		});

		objEquiposActualizados[0].puesto = 1;
		objEquiposActualizados[1].puesto = 2;
		objEquiposActualizados[2].puesto = 3;
		objEquiposActualizados[3].puesto = 4;

    /* Cuando los resultados se envian, se determina la posicion y clasificacion de los equipos,
       y se actualiza la lista de partidos de la fase final
    */

    const grupoEquipos = objEquiposActualizados[0].grupo;

    let partidosActualizados = partidos
      .filter( partido => partido.grupo === 'octavosFinal' )
      .filter( partido => partido.local.id[1] === grupoEquipos
        || partido.visitante.id[1] === grupoEquipos);

		if (objEquiposActualizados.every(equipo => equipo.partidos === 3)) {
			objEquiposActualizados[0].clasificado = 'octavosFinal';
			objEquiposActualizados[1].clasificado = 'octavosFinal';
			objEquiposActualizados[2].clasificado = 'faseDeGrupos';
			objEquiposActualizados[3].clasificado = 'faseDeGrupos';

      partidosActualizados.forEach( partido => {
        if ('1' + objEquiposActualizados[0].grupo === partido.local.id) {
          partido.local.nombre = objEquiposActualizados[0].nombre;
        } else if ('1' + objEquiposActualizados[0].grupo === partido.visitante.id) {
          partido.visitante.nombre = objEquiposActualizados[0].nombre;
        }
        if ('2' + objEquiposActualizados[1].grupo === partido.local.id) {
          partido.local.nombre = objEquiposActualizados[1].nombre;
        } else if ('2' + objEquiposActualizados[1].grupo === partido.visitante.id) {
          partido.visitante.nombre = objEquiposActualizados[1].nombre;
        }
      });
		}
    else {
      partidosActualizados.forEach( partido => {
        if ('1' + objEquiposActualizados[0].grupo === partido.local.id) {
          partido.local.nombre = null;
        } else if ('1' + objEquiposActualizados[0].grupo === partido.visitante.id) {
          partido.visitante.nombre = null;
        }
        if ('2' + objEquiposActualizados[1].grupo === partido.local.id) {
          partido.local.nombre = null;
        } else if ('2' + objEquiposActualizados[1].grupo === partido.visitante.id) {
          partido.visitante.nombre = null;
        }
      });
    }

    const restodePartidos = partidos
      .filter( partido => !partidosActualizados.includes(partido));

		setEquipos([...restodeEquipos, ...objEquiposActualizados]);
    setPartidos([...restodePartidos, ...partidosActualizados].sort((x, y) => x.id - y.id));

	}

	return (
		<>
			<h2>Partidos</h2>
			<form onSubmit={enviarResultadosATabla}>
				{partidosGrupo.map( (partido, index) => (
					<div key={index} className='partidos-inline'>
						<p>Fecha {partido.fecha}</p>
						<label
							htmlFor={`fecha_${partido.fecha}-${partido.local.nombre.toLowerCase()}`}>
							{partido.local.nombre}
						</label>
						<input id={`fecha_${partido.fecha}-${partido.local.nombre.toLowerCase()}`}
							type="tel"
							maxLength="2"
							defaultValue={partido.local.resultado === null ? '' : partido.local.resultado}
							onChange={(e) => setResultado(partido.fecha, partido.local.nombre, e.target.value, true)} />
						<p>-</p>
						<input id={`fecha_${partido.fecha}-${partido.visitante.nombre.toLowerCase()}`}
							type="tel"
							maxLength="2"
							defaultValue={partido.visitante.resultado === null ? '' : partido.visitante.resultado}
							onChange={(e) => setResultado(partido.fecha, partido.visitante.nombre, e.target.value, false)} />
						<label htmlFor={`fecha_${partido.fecha}-${partido.visitante.nombre.toLowerCase()}`}>
							{partido.visitante.nombre}
						</label>
					</div>
				))}
				<button type="submit">Calcular</button>
			</form>
		</>
	);
}

export default TableMatches;
