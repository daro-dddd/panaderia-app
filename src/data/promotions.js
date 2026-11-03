// Datos de promociones, preventas y cupones comerciales

export const COUPONS = {
  SINGLUTEN10: {
    codigo: 'SINGLUTEN10',
    descuentoPorcentaje: 10,
    descripcion: '10% de descuento en tu primer pedido',
    minimoCompra: 0,
  },
  OFRENDA50: {
    codigo: 'OFRENDA50',
    descuentoFijo: 50,
    descripcion: '$50 MXN de regalo en compras mayores a $250',
    minimoCompra: 250,
  },
  ENVIOGRATIS: {
    codigo: 'ENVIOGRATIS',
    descuentoEnvio: true,
    descripcion: 'Envío a domicilio gratis en compras mayores a $300',
    minimoCompra: 300,
  },
};

export const DELIVERY_DATES = [
  { id: 'hoy', label: 'Hoy (Horneada 4:30 PM)', detalle: 'Frescos y calientitos hoy mismo', disponible: true },
  { id: 'manana', label: 'Mañana (Horneada 11:00 AM)', detalle: 'Aparta tu lugar temprano', disponible: true },
  { id: '1nov', label: 'Viernes 1 de Noviembre (Día de Todos los Santos)', detalle: 'Preventa especial Ofrenda', disponible: true },
  { id: '2nov', label: 'Sábado 2 de Noviembre (Día de Muertos)', detalle: 'Preventa especial Día de Muertos', disponible: true },
];

export const SUCURSALES = [
  {
    id: 'suc-1',
    nombre: 'Sucursal Taller Roma Norte',
    direccion: 'Calle Colima 184, Col. Roma Norte, Cuauhtémoc, CDMX',
    horario: '9:00 AM - 8:00 PM',
    telefono: '+52 55 1234 5678',
  },
  {
    id: 'suc-2',
    nombre: 'Sucursal Coyoacán Dulce',
    direccion: 'Av. Hidalgo 45, Del Carmen, Coyoacán, CDMX',
    horario: '10:00 AM - 8:30 PM',
    telefono: '+52 55 8765 4321',
  },
];
