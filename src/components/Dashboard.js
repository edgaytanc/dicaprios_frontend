import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';

const Dashboard = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dicaprios Sport
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button component={Link} to="/clientes">
              <ListItemText primary="Gestión de Clientes" />
            </ListItem>
            <ListItem button component={Link} to="/productos">
              <ListItemText primary="Gestión de Productos" />
            </ListItem>
            <ListItem button component={Link} to="/categorias">
              <ListItemText primary="Gestión de Categorias" />
            </ListItem>
            <ListItem button component={Link} to="/proveedores">
              <ListItemText primary="Gestión de Proveedores" />
            </ListItem>
            <ListItem button component={Link} to="/pedidos">
              <ListItemText primary="Gestión de Pedidos" />
            </ListItem>
            <ListItem button component={Link} to="/facturas">
              <ListItemText primary="Facturación" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
