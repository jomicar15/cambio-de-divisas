import { useEffect, useState } from "react";
import { urlDivisas } from './constants/constants';
import {CardInformation} from './components/CardInformation'
import { InformationDate } from "./components/InformationDate";
import { DataInterface , Error} from "./assets/interfaces";
import { Loading } from "./components/Loading";
import { styled } from "@mui/material";

const ContainerLoading = styled('article')({
  position: 'fixed', // Cambiado de 'absolute' a 'fixed'
  top: '50%', // Mueve el modal al centro verticalmente
  left: '50%', // Mueve el modal al centro horizontalmente
  transform: 'translate(-50%, -50%)', // Ajuste para centrar correctamente
  zIndex: '0',
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection:'column'        
})
const BlurContainer= styled('div')({position:'fixed',width:'100%',height:'100%',backgroundColor:'gray',opacity:'0.7',zIndex:'1',})


function App() {
  const [isOpenModal,setIsOpenModal] = useState(false);
  const [data, setData] = useState<DataInterface | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // useEffect para hacer la petición a la API que luego se saca como custom hook
  useEffect(() => {
    fetch(urlDivisas)
      .then(response => response.json())
      .then((data: DataInterface) => {
        setData(data); // Guardar los datos recibidos
        setError(null); // Limpiar el error si la petición es exitosa
      })
      .catch(() => {
        const petitionError: Error = {
          isError: true,
          message: 'Error haciendo el fetching',
        };
        setError(petitionError); // Guardar el error en el estado
      });
  }, []);

  // Retornar el JSX de la app
  return (
    <>

    <main style={{display:'flex',flexDirection:"column",placeItems:'center',gap:'20px',backgroundColor:'#b2ffbe', paddingBottom:'3em'}}>
            {/* div para hacer el efecto de deshabilitar los botones traseros */}
      {isOpenModal&&<BlurContainer/>}
      <h1>Cambio de divisas</h1>
      {/* Renderizado condicional basado en la presencia de error o datos */}
      {
        error ? (<h1>{error.message}</h1>) 
        : data ? (
          <>
            <InformationDate dato={data.datetime}/>
            <article style={{display:'flex',flexWrap:'wrap',placeContent:'center',gap:'20px'}}>
              <CardInformation monitors={data.monitors}/>
            </article>
          </>
        ) : (
            <ContainerLoading>
              <Loading/>
            </ContainerLoading>
        )
      }
    </main>
    </>
  );
}

export default App;
