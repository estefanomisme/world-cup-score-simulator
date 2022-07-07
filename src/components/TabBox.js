import { useState, createContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/react-tabs.css';
import './styles/TabBox.css';
import {listaEquipos, listaPartidos} from './grupos_state';
import TabGroupStage from './TabGroupStage.js';
import TabFinalStage from './TabFinalStage.js';

export const Context = createContext();

function TabBox() {

	const [equipos, setEquipos] = useState(listaEquipos);
	const [partidos, setPartidos] = useState(listaPartidos);

	return (
		<Context.Provider value={[equipos, setEquipos, partidos, setPartidos]}>
			<Tabs className='react-tabs tabBox'>
				<TabList>
					<Tab className='react-tabs__tab tabMain'>Fase de grupos</Tab>
					<Tab className='react-tabs__tab tabMain'>Fase Final</Tab>
				</TabList>
				<TabPanel>
					<h2><TabGroupStage /></h2>
				</TabPanel>
				<TabPanel>
					<h2><TabFinalStage /></h2>
				</TabPanel>
			</Tabs>
		</Context.Provider>
	);
}

export default TabBox;
