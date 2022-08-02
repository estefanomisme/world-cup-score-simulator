import { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/react-tabs.css';
import './styles/TabGroupStage.css';
import TableScore from './TableScore';
import TableMatches from './TableMatches';
import { Context } from './TabBox';

function TabGroupStage({activarTabla}) {

	const [equipos, , partidos, , , ] = useContext(Context);
	const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

	return (
		<Tabs>
			<TabList>
				{grupos.map((grupo) => (
					<Tab key={grupo} className='react-tabs__tab tabGS'>Grupo {grupo}</Tab>
				))}
			</TabList>

			{grupos.map((grupo) => (
				<TabPanel key={`grupo-${grupo}`} className={`react-tabs__tab-panel panel-grupo-${grupo}`}>
				  <TableScore
						equipos={equipos.filter(equipo => equipo.grupo === grupo)} />
					<TableMatches
						equiposGrupo={equipos.filter(equipo => equipo.grupo === grupo)}
						partidosGrupo={partidos.filter(partido => partido.grupo === grupo)} />
				</TabPanel>
			))}

		</Tabs>
	);
}

export default TabGroupStage;
