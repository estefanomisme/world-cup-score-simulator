import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { PanelOctavosFinal, PanelCuartosFinal, PanelSemifinal, PanelFinal } from './PanelFinalStage';
import './styles/react-tabs.css';
import './styles/TabFinalStage.css';


function TabFinalStage (props) {
	return (
		<Tabs>
			<TabList>
				<Tab className='react-tabs__tab tabFS'>Octavos de Final</Tab>
				<Tab className='react-tabs__tab tabFS'>Cuartos de Final</Tab>
				<Tab className='react-tabs__tab tabFS'>Semifinal</Tab>
				<Tab className='react-tabs__tab tabFS'>Final</Tab>
			</TabList>
			<TabPanel className='panelOF'><PanelOctavosFinal /></TabPanel>
			<TabPanel className='panelCF'><PanelCuartosFinal /></TabPanel>
			<TabPanel className='panelSF'><PanelSemifinal /></TabPanel>
			<TabPanel className='panelF'><PanelFinal /></TabPanel>
		</Tabs>
	);
}

export default TabFinalStage;
