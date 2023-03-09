import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, TextField } from '@mui/material';
import { mathLib } from 'ezswap_math';
import { utils, BigNumber } from 'ethers';

// utils.parseEther, formatEther;
// const curveType = typelist[getSelectedChainId()]
// const poolType = ['buy', 'sell', 'trade']
const getType = (val) => ['buy', 'sell', 'trade'][parseInt(val, 10)];
// return ['buy', 'sell', 'trade'][parseInt(val)]
const curveType = {
  '0xfad6ba8976b23faf7f7c9b7aeee1a9e2c953d2c5': 'Exponential',
  '0x1268CFc4a818e94A2A3eE72B8507aC9F72fa01C5': 'Linear',
};
const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'type',
    headerName: 'type',
    width: 100,
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
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'type', headerName: 'type', width: 100,
  },
  { field: 'currentPrice', headerName: 'currentPrice', width: 200 },
  { field: 'nextPrice', headerName: 'nextPrice', width: 200 },
];

export default function NftTable({ poolList }) {
  const [calculatedlist, setCalculatedlist] = React.useState([]);
  const [index, setIndex] = React.useState(1);
  React.useEffect(() => {
    const tempList = poolList.map((pool) => {
      const {
        spotPrice, delta, protocolFee, fee, gfee, type, bondingCurve,
      } = pool;
      const poolType = curveType[bondingCurve];
      const action = getType(type);
      const priceItem = mathLib?.[poolType]?.[action](
        Number(utils.formatEther(spotPrice)),
        Number(utils.formatEther(delta)),
        Number(utils.formatEther(fee)),
        protocolFee / 1000,
        0,
        index,
      );
      const temp = {
        id: pool.id,
        type: getType(pool.type),
        currentPrice: priceItem?.currentPrice?.userBuyPrice,
        nextPrice: priceItem?.nextPrice?.userBuyPrice,
      };
      return temp;
    });
    setCalculatedlist(tempList);
  }, [poolList, index]);
  return (
    <Box sx={{ height: 200, width: '100%' }}>
      <Typography variant="h3" sx={{ my: 2 }}>Original data</Typography>
      <DataGrid
        rows={poolList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <Typography variant="h3" sx={{ my: 2 }}>
        Calculated data
        <TextField
          type="number"
          label="index"
          variant="outlined"
          value={index}
          sx={{ ml: 2 }}
          onChange={(e) => {
            setIndex(Number(e?.target?.value));
          }}
        />
      </Typography>

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
