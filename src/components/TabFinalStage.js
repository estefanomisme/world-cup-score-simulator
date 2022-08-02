import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { PanelOctavosFinal, PanelCuartosFinal, PanelSemifinal, PanelFinal } from './PanelFinalStage';
import './styles/react-tabs.css';
import './styles/TabFinalStage.css';

function TabFinalStage ({activarTabla, definirCampeon, campeon}) {
	/*const [equipos, , ,] = useContext(Context);
	let clasificados = [];

	for (let grupo of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
		let [primero, segundo] = equipos
			.filter(equipo => equipo.grupo === grupo)
			.sort((x, y) => x.puesto - y.puesto);
		clasificados.push(primero, segundo);
	}*/

	return (
		<Tabs>
			<TabList>
				<Tab className='react-tabs__tab tabFS'>Octavos de Final</Tab>
				<Tab className='react-tabs__tab tabFS'>Cuartos de Final</Tab>
				<Tab className='react-tabs__tab tabFS'>Semifinal</Tab>
				<Tab className='react-tabs__tab tabFS'>Final</Tab>
			</TabList>
			<TabPanel className='panelOF'><PanelOctavosFinal activarTabla={activarTabla}/></TabPanel>
			<TabPanel className='panelCF'><PanelCuartosFinal /></TabPanel>
			<TabPanel className='panelSF'><PanelSemifinal /></TabPanel>
			<TabPanel className='panelF'><PanelFinal definirCampeon={definirCampeon} campeon={campeon}/></TabPanel>
		</Tabs>
	);
}

export default TabFinalStage;
