import {dataTime} from '../assets/interfaces'

interface InformationDateProps {
    dato: dataTime;
}

export const InformationDate = ({ dato }:InformationDateProps): JSX.Element => {
    const {date,time} = dato;
    return (
      <>
        <h2>Fecha: {date}</h2>
        <h3>Hora: {time}</h3>
      </>
    );
  };
