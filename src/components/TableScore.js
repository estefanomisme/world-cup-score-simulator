import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/react-tabs.css';
import './styles/TableScore.css';

function TableScore({equipos}) {
	return (
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Equipo</th>
						<th>Pts</th>
						<th>PJ</th>
						<th>PG</th>
						<th>PE</th>
						<th>PP</th>
						<th>GF</th>
						<th>GC</th>
						<th>DG</th>
					</tr>
				</thead>
				<tbody>
					{equipos.map((equipo, index) => (
						<tr key={index}>
							<td>
								<img
									src={require(`./images/${equipo.logo}`)}
									alt={equipo.nombre}
									className="flag" />
							</td>
							<td>{equipo.nombre}</td>
							<td>{equipo.puntos}</td>
							<td>{equipo.partidos}</td>
							<td>{equipo.victorias}</td>
							<td>{equipo.empates}</td>
							<td>{equipo.derrotas}</td>
							<td>{equipo.golesFavor}</td>
							<td>{equipo.golesContra}</td>
							<td>{equipo.diferenciaGoles}</td>
					</tr>
					))}
				</tbody>
			</table>
	);
}

export default TableScore;
