import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';

const getType = (val) => {
  return ['buy', 'sell', 'trade'][parseInt(val)]
}

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

export default function NftTable({ poolList }) {
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
        rows={poolList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}