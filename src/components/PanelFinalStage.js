function PlantillaFase ({fase, equipos}) {
	return (
  	<table>
    	<thead>
      	<tr>
        	<th>{fase}</th>
      	</tr>
    	</thead>
    	<tbody>
				{equipos.map((equipo, index) => (
					<tr key={index}>
						<td>{equipo[0]}</td>
						<td>
							<input className='score1' type='number' />
							-
							<input className='score2' type='number' />
						</td>
						<td>{equipo[1]}</td>
					</tr>
				))}
    	</tbody>
  	</table>
	);
}

export function PanelOctavosFinal ({}) {

	const fase = 'Octavos de Final';
	const equipos = [
		['1A', '2B'],
		['1C', '2D'],
		['1E', '2F'],
		['1G', '2H'],
		['1B', '2A'],
		['1D', '2C'],
		['1F', '2E'],
		['1H', '2G']
	];

	return (
		<PlantillaFase className='OFPlantilla' fase={fase} equipos={equipos} />
	)
}

export function PanelCuartosFinal ({}) {
	const fase = 'Cuartos de Final';
	const equipos = [
		['OF1', 'OF2'],
		['OF3', 'OF4'],
		['OF5', 'OF6'],
		['OF7', 'OF8']
	];

	return (
		<PlantillaFase className='CFPlantilla' fase={fase} equipos={equipos} />
	);
}

export function PanelSemifinal ({}) {
	const fase = 'Semifinal';
	const equipos = [
		['CF1', 'CF2'],
		['CF3', 'CF4']
	];
	return (
		<PlantillaFase className='SFPlantilla' fase={fase} equipos={equipos} />
	);
}

export function PanelFinal ({}) {
	const fase = 'Final';
	const equipos = [
		['SF1', 'SF2']
	]
	return (
		<PlantillaFase className='FinalPlantilla' fase={fase} equipos={equipos} />
	);
}
