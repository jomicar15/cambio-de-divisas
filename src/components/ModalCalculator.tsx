import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BanderaVnzla from "../assets/Bandera_Ven.png";
import BanderaUSA from "../assets/Bandera_USA.png";
import { styled } from "@mui/material";
import { styledModalCloseBtn, styledInputsPrice } from "../constants/constants";

const Image = styled("img")({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
});

const ContainerInputs = styled("article")({
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
});

const ContainerModal = styled("section")({
  fontFamily: "roboto",
  minWidth: "400px", // Mínimo ancho para asegurar que se vea bien
  height: "auto", // Ajustar la altura al contenido
  maxHeight: "90vh", // Evitar que sea más alto que la pantalla
  border: "2px solid transparent",
  borderRadius: "15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "10000",
  backgroundColor: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px", // Añadir un poco de relleno
  boxSizing: "border-box",
  overflowY: "auto", // Habilitar el scroll si es necesario
  paddingBottom:'3em'
});

const CalcBtn = styled("button")({
  borderRadius: "8px",
  border: "none",
  padding: "1em",
  width: "80%",
  backgroundColor: "#2881FF",
  color: "white",
  marginTop: "1.5em", // Añadir margen en lugar de usar posición absoluta
});

export const ModalCalculator = ({ price, changeOpen, title, miniature }) => {
  const [result, setResult] = useState<string>("");
  const [introducedPrice, setIntroducedPrice] = useState<string>("");
  const [error, setError] = useState<string>("");

  const calcResult = (): void => {
    const numericPrice = parseFloat(introducedPrice);
    if (isNaN(numericPrice)) {
      setError("Por favor, introduce un número válido");
      return;
    }
    const newResult = (price * numericPrice).toFixed(2); // Mantener 2 decimales
    setResult(newResult);
    setError("");
  };

  const closeModal = () => {
    changeOpen(false);
    setResult("");
    setIntroducedPrice("");
    setError("");
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") calcResult(); // Ejecutar el cálculo si la tecla presionada es Enter
  };

  const handleIntroducedPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;
    // Permitir números y decimales
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setIntroducedPrice(inputValue); // Solo actualiza el estado si es un número válido
      setError(""); // Limpiar el error si el input es válido
    } else {
      setError("Solo se permiten números y decimales");
      setResult("");
    }
  };

  return (
    <ContainerModal>
      <CloseIcon onClick={closeModal} sx={styledModalCloseBtn} />
      <div className="div-title" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
          <img src={miniature} alt={`image of ${title}`} style={{ width: "32px", height: "32px" }} />
          <span style={{ fontSize: "1.5em", fontWeight: "bolder", marginBottom: "1em" }}>{title}</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <ContainerInputs>
          <Image src={BanderaUSA} />
          <input
            type="text"
            placeholder="Dólares"
            onChange={handleIntroducedPrice}
            onKeyUp={handleKeyUp}
            style={styledInputsPrice}
            value={introducedPrice}
          />
        </ContainerInputs>
        <span style={{ marginBottom: "1em" }}>
          <strong>Tasa:</strong> {price}
        </span>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <ContainerInputs>
          <Image src={BanderaVnzla} />
          <input
            type="text"
            value={result}
            disabled
            placeholder="Bolívares"
            style={styledInputsPrice}
          />
        </ContainerInputs>
      </div>
      <CalcBtn onClick={calcResult}>Calcular</CalcBtn>
    </ContainerModal>
  );
};
