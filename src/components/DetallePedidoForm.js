// src/components/DetallePedidoForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, MenuItem } from '@mui/material';

const DetallePedidoForm = ({ pedidoId }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/productos/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/detalles-pedido/', {
        pedido: pedidoId,
        producto: productoSeleccionado,
        cantidad,
        precio_unitario: precioUnitario,
        subtotal: cantidad * precioUnitario,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Producto añadido al pedido exitosamente');
    } catch (error) {
      console.error('Error al agregar el producto al pedido', error);
      alert('Error al agregar el producto al pedido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Añadir Producto al Pedido
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Producto"
            variant="outlined"
            margin="normal"
            fullWidth
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            {productos.map((prod) => (
              <MenuItem key={prod.id} value={prod.id}>
                {prod.nombre_producto}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Cantidad"
            variant="outlined"
            margin="normal"
            fullWidth
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <TextField
            label="Precio Unitario"
            variant="outlined"
            margin="normal"
            fullWidth
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Añadir Producto'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default DetallePedidoForm;
