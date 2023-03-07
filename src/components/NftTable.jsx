import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 270 },
  { field: 'kind', headerName: 'kind', width: 100 },
  { field: 'fromPlatform', headerName: 'FromPlatform', width: 130 },
  { field: 'owner', headerName: 'owner', width: 100 },
  { field: 'spotPrice', headerName: 'spotPrice', width: 200 },
  { field: 'priceCurrencySymbol', headerName: 'priceCurrencySymbol', width: 100 },
  { field: 'fee', headerName: 'Fee', width: 100 },
  { field: 'protocolFee', headerName: 'protocolFee', width: 100 },
  // { field: 'royaltySpotPrice', headerName: 'royaltySpotPrice', width: 100 },
  { field: 'tokenBalance', headerName: 'tokenBalance', width: 200 },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

export default function NftTable({ poolList }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={poolList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}