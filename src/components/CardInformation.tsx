import { useState } from "react";
import { Monitors } from "../assets/interfaces";
import { ModalCalculator } from "./ModalCalculator";


// Definir la interfaz para los props del componente
interface InformationDateProps {
  monitors: Monitors;
}

const styleInformationDate = {
  display: 'flex',
  gap: '20px',
  placeItems: 'center',
  border: '2px solid black',
  borderRadius: '20px',
  padding: '30px',
};


// Componente InformationDate
export const CardInformation = ({ monitors }: InformationDateProps): JSX.Element[] | null => {
  // Estado para almacenar qué tarjeta tiene el modal abierto (usamos null cuando ninguno está abierto)
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
  
  if (!monitors) return null; // Si no hay datos, no genera nada

  const handleCalculateBtn = (index: number) => {
    // Establecer el índice del monitor que abre el modal
    setOpenModalIndex(index);
  };

  // Convertir monitores en un array de monitores
  const monitorsArray = Object.values(monitors);
  return monitorsArray.map((monitor, index) => {
    const { title, price, last_update, image } = monitor;
    return (
      <>
      <div key={index} className="card" style={styleInformationDate}>
        <img src={image} alt={`image of ${title}`} width={50} height={50} />
        <div>
          <h2 style={{ color: 'blue' }}>{title}</h2>
          <strong>Precio: </strong> <span style={{ color: 'blue' }}>{price}</span>
          <p><strong>Última actualización: </strong>{last_update}</p>
          <button onClick={() => handleCalculateBtn(index)} style={{cursor:'pointer',borderRadius:'10px',color:'white',backgroundColor:'#469152',border:'none',padding:'10px'}}>Calcular precio</button>
          {/* Mostrar el modal si el índice coincide */}
          {openModalIndex === index && (<ModalCalculator title={title} miniature={image} changeOpen={setOpenModalIndex} price={price} />)}
        </div>
      </div>
      </>
    );
  });
};
