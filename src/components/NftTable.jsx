import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import { mathLib } from 'ezswap_math';
const getType = (val) => {
  return ['','Exponential', 'Linear'][parseInt(val)]
}
// return ['buy', 'sell', 'trade'][parseInt(val)]

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'type', headerName: 'type', width: 100,
    valueGetter: (data) => (getType(data?.row?.type)),
  },
  { field: 'spotPrice', headerName: 'spotPrice', width: 200 },
  { field: 'delta', headerName: 'delta', width: 200 },
  { field: 'fee', headerName: 'Fee', width: 200 },
  { field: 'gfee', headerName: 'gfee', width: 100 },
  { field: 'protocolFee', headerName: 'protocolFee', width: 100 },
  { field: 'tokenBalance', headerName: 'tokenBalance', width: 200 },
];
const calculatedColumns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'type', headerName: 'type', width: 100,
    valueGetter: (data) => (getType(data?.row?.type)),
  },
  { field: 'currentPrice', headerName: 'spotPrice', width: 200 },
  { field: 'delta', headerName: 'delta', width: 200 },
  { field: 'fee', headerName: 'Fee', width: 200 },
  { field: 'gfee', headerName: 'gfee', width: 100 },
  { field: 'protocolFee', headerName: 'protocolFee', width: 100 },
  { field: 'tokenBalance', headerName: 'tokenBalance', width: 200 },
];

export default function NftTable({ poolList }) {
  const [calculatedlist, setCalculatedlist] = React.useState([])
  React.useEffect(() => {
    const tempList = poolList.map(pool => {
      console.log('pool', pool);
      const { spotPrice, delta, protocolFee, fee, gfee,type } = pool
      console.log('getType(type)', getType(type));
      const priceItem = mathLib?.[getType(type)]?.buy(
        spotPrice,
        delta,
        fee,
        protocolFee,
        0,
        1,
        'read'
      )
      console.log('priceItem', priceItem);
      return pool
    })
    setCalculatedlist(tempList)
  }, [poolList])
  return (
    <Box sx={{ height: 200, width: '100%' }}>
      <Typography variant="h3">Original data</Typography>
      <DataGrid
        rows={poolList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <Typography variant="h3">Calculated data</Typography>
      <DataGrid
        rows={calculatedlist}
        columns={calculatedColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}