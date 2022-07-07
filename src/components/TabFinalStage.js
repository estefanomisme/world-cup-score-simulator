import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { PanelOctavosFinal, PanelCuartosFinal, PanelSemifinal, PanelFinal } from './PanelFinalStage';
import './styles/react-tabs.css';
import './styles/TabFinalStage.css';
import { useContext } from 'react';
import { Context } from './TabBox';


function TabFinalStage (props) {
	const [equipos, , ,] = useContext(Context);
	const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
	let clasificados = [];

	for (let grupo of grupos) {
		let [primero, segundo] = equipos
			.filter(equipo => equipo.grupo === grupo)
      .sort((y, x) => {
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
      })
		clasificados.push(primero, segundo);
	}

	console.log(clasificados);

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
