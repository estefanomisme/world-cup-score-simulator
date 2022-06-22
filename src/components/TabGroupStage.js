import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/react-tabs.css';
import './styles/TabGroupStage.css';
import grupos from './grupos';
import TableScore from './TableScore';
import TableMatches from './TableMatches';

function TabGroupStage(props) {
	// const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	return (
		<Tabs>
			<TabList>
				{grupos.map((grupo) => (
					<Tab key={grupo.id} className='react-tabs__tab tabGS'>Grupo {grupo.id}</Tab>
				))}
			</TabList>
			{grupos.map((grupo) => (
				<TabPanel key={`grupo-${grupo.id}`} className={`react-tabs__tab-panel panel-grupo-${grupo.id}`}>
				  <TableScore equipos={grupo.equipos}/>
					<TableMatches	equipos={grupo.equipos}/>
				</TabPanel>
			))}
		</Tabs>
	);
}

export default TabGroupStage;
