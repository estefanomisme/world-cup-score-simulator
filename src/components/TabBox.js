import { useState, createContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/react-tabs.css';
import './styles/TabBox.css';
import {listaEquipos, listaPartidos} from './grupos';
import TabGroupStage from './TabGroupStage.js';
import TabFinalStage from './TabFinalStage.js';
import TablaFinal from './TablaFinal.js';

export const Context = createContext();

function TabBox() {

	const [equipos, setEquipos] = useState(listaEquipos);
	const [partidos, setPartidos] = useState(listaPartidos);
	const [equiposTablaFinal, setEquiposTablaFinal] = useState(listaEquipos);
	const [tablaFinalActivada, setTablaFinalActivada] = useState(false);
	const [campeon, setCampeon] = useState(null);

	function activarTabla () {
		setTablaFinalActivada(true);
	}

	function definirCampeon ( nombreEquipo ) {
		setCampeon(nombreEquipo);
	}

	return (
		<Context.Provider value={[equipos, setEquipos, partidos, setPartidos, equiposTablaFinal, setEquiposTablaFinal]}>
			<Tabs className='react-tabs tabBox'>
				<TabList>
					<Tab className='react-tabs__tab tabMain'>Fase de grupos</Tab>
					<Tab className='react-tabs__tab tabMain'>Fase Final</Tab>
				</TabList>
				<TabPanel>
					<h2><TabGroupStage /></h2>
				</TabPanel>
				<TabPanel>
					<h2><TabFinalStage activarTabla={activarTabla} definirCampeon={definirCampeon} campeon={campeon}/></h2>
				</TabPanel>
			</Tabs>
			<TablaFinal equipos={equiposTablaFinal} activada={tablaFinalActivada} campeon={campeon}/>
		</Context.Provider>
	);
}

export default TabBox;
