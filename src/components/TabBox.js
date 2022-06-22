import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles/react-tabs.css';
import './styles/TabBox.css';
import TabGroupStage from './TabGroupStage.js';
import TabFinalStage from './TabFinalStage.js';


function TabBox(props) {
	return (
	  <Tabs className='react-tabs tabBox'>
	    <TabList>
				<Tab className='react-tabs__tab tabMain'>Fase de grupos</Tab>
	      <Tab className='react-tabs__tab tabMain'>Fase Final</Tab>
			</TabList>
	    <TabPanel>
	      <h2><TabGroupStage /></h2>
	    </TabPanel>
	    <TabPanel>
	      <h2>tabFinalStage</h2>
	    </TabPanel>
	  </Tabs>
	);
}

export default TabBox;
