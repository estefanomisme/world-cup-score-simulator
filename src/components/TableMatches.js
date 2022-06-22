import './styles/react-tabs.css';
import './styles/TableMatches.css';

function TableMatches({equipos}) {

	const equipo1 = equipos.filter(equipo => equipo.bombo === 1)[0].nombre;
	const equipo2 = equipos.filter(equipo => equipo.bombo === 2)[0].nombre;
	const equipo3 = equipos.filter(equipo => equipo.bombo === 3)[0].nombre;
	const equipo4 = equipos.filter(equipo => equipo.bombo === 4)[0].nombre;
	
	const fechas = [
		[1, equipo1, equipo2],
		[1, equipo3, equipo4],
		[2, equipo4, equipo2],
		[2, equipo1, equipo3],
		[3, equipo4, equipo1],
		[3, equipo2, equipo3]
	]

	return (
		<table>
			<thead>
				<tr>
					<th>Partidos</th>
				</tr>
			</thead>
			<tbody>
				{fechas.map( (fecha, index) => (
					<tr key={index}>
						<td>Fecha {fecha[0]}</td>
						<td>{fecha[1]}</td>
						<td>
							<input className='score1' type='tel' maxlength='2' pattern='[0-9]*' />
							-
							<input className='score2' type='tel' maxlength='2' pattern='[0-9]*' />
						</td>
						<td>{fecha[2]}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default TableMatches;
