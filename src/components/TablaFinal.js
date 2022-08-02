export default function TablaFinal ({equipos, activada, campeon}) {
  return (
    <details style={{display: activada? 'initial': 'none'}}>
      <summary>Tabla Final</summary>
      <p>Campeon: {campeon? campeon: 'Por definir'}</p>
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
            <th>%Efec</th>
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
              <td>{equipo.golesFavor - equipo.golesContra}</td>
              <td>{(equipo.puntos * 100 / 21).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}