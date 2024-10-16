// src/components/FacturaPDF.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const FacturaPDF = ({ factura }) => {
  return (
    
    <div id="factura-pdf">
      <h1>Dicaprios Sport</h1>
      <br></br>
      <h2>Factura del Pedido</h2>
      <p><strong>Pedido ID:</strong> {factura.pedido}</p>
      <p><strong>Fecha de Emisión:</strong> {factura.fecha_emision}</p>
      <p><strong>Cliente:</strong> {factura.cliente}</p>
      <p><strong>Total:</strong> Q{factura.total.toFixed(2)}</p>
    </div>
  );
};

export const generarFacturaPDF = (factura) => {
  // Crear un div temporal en el documento para renderizar el contenido del PDF
  const input = document.createElement('div');
  document.body.appendChild(input);

  // Renderizar el componente FacturaPDF dentro del div temporal
  const root = ReactDOM.createRoot(input);
  root.render(<FacturaPDF factura={factura} />);

  // Esperar un momento para que el contenido se renderice antes de generar el PDF
  setTimeout(() => {
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); // Ajustar la posición y el tamaño de la imagen
        pdf.save(`Factura_Pedido_${factura.pedido}.pdf`);
      })
      .catch((error) => {
        console.error('Error al generar el PDF:', error);
      })
      .finally(() => {
        // Limpiar el DOM eliminando el div temporal
        document.body.removeChild(input);
      });
  }, 500);
};

export default FacturaPDF;
