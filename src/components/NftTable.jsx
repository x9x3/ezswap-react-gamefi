import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography, Box, TextField, Button,
} from '@mui/material';
import { mathLib } from 'ezswap_math';
import { utils, BigNumber, getDefaultProvider } from 'ethers';
import { toast } from 'react-toastify';
import {
  useAccount, useConnect, useDisconnect, useClient,
} from 'wagmi';
import { buyMultipleNFT, sellMultipleNFT } from '../toolkit/transaction';

const NFTcolumns = [
  { field: 'id', headerName: 'ID', width: 100 },
];
const columns = [
  { field: 'id', headerName: 'Pool Address', width: 100 },
  {
    field: 'nftIds',
    headerName: 'nftIds',
    width: 100,
    valueGetter: (data) => (data?.row?.nftIds?.toString()),
  },
  { field: 'bondingCurve', headerName: 'bondingCurve', width: 100 },
  {
    field: 'type',
    headerName: 'type',
    width: 100,
    // valueGetter: (data) => (getType(data?.row?.type)),
  },
  {
    field: 'spotPrice',
    headerName: 'spotPrice',
    width: 200,
    valueGetter: (data) => (Number(utils.formatEther(data?.row?.spotPrice))),
  },
  {
    field: 'delta',
    headerName: 'delta',
    width: 200,
    valueGetter: (data) => (Number(utils.formatEther(data?.row?.delta))),
  },
  {
    field: 'fee',
    headerName: 'swap fee',
    width: 200,
    valueGetter: (data) => (Number(utils.formatEther(data?.row?.fee))),
  },
  {
    field: 'protocolFee',
    headerName: 'protocolFee',
    width: 100,
    valueGetter: (data) => (Number(utils.formatEther(data?.row?.protocolFee))),
  },
  { field: 'gfee', headerName: 'gfee', width: 100 },
];
const calculatedColumns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'nftIds',
    headerName: 'nftIds',
    width: 100,
    valueGetter: (data) => (data?.row?.nftIds?.toString()),
  },
  { field: 'bondingCurve', headerName: 'bondingCurve', width: 100 },
  { field: 'type', headerName: 'type', width: 100 },
  { field: 'currentPrice', headerName: 'currentPrice', width: 200 },
  { field: 'nextPrice', headerName: 'nextPrice', width: 200 },
];

export default function NftTable({ poolList = [], actionType = 'Buy' }) {
  const { address, isConnected } = useAccount();
  // const client = useClient();

  // const [calculatedlist, setCalculatedlist] = React.useState([]);
  const [selectedKeys, setSelectedKeys] = React.useState([]);
  // const [index, setIndex] = React.useState(0);

  /* React.useEffect(() => {
    const tempList = poolList
      // ?.filter((p) => (p.id === '0x4cddd875f3cbef84ce7a0547fea35d96d37d17ea'))
      ?.map((pool) => {
        const {
          spotPrice, delta, protocolFee, fee, gfee, type, bondingCurve, nftIds,
        } = pool;
        const action = type;
        // todo 项目方协议费,自定义设置 例:0.5%计算时换算成0.005
        const projectFee = 0.005;
        const priceItem = mathLib?.[bondingCurve]?.[action](
          Number(utils.formatEther(spotPrice)),
          Number(utils.formatEther(delta)),
          Number(utils.formatEther(fee)),
          Number(utils.formatEther(protocolFee)),
          projectFee,
          index,
        );
        const temp = {
          ...pool,
          id: pool.id,
          type,
          tokenId: nftIds?.[0],
          nftIds,
          bondingCurve,
          currentPrice: priceItem?.currentPrice?.userBuyPrice,
          nextPrice: priceItem?.nextPrice?.userBuyPrice,
        };
        return temp;
      });
    setCalculatedlist(tempList);
  }, [poolList, index]); */

  const buyNFT = (ActionType) => {
    if (!address) {
      toast.warn('Please connect the wallet!');
    }
    if (!isConnected) {
      toast.warn('Please connect the wallet!');
    }
    const selectedList = selectedKeys?.map((key) => poolList.find((c) => c.id === key));
    if (ActionType === 'buy') {
      // 从池子里购买NFT,
      buyMultipleNFT({
        address,
        selectedList,
      });
    } else {
      // 将自己的NFT卖给池子
      // address:nft出售方
      sellMultipleNFT({
        address,
        selectedList,
      });
    }
  };

  return (
    <Box sx={{ height: 200, width: '100%' }}>

      {/* {actionType === 'Sell'
        ? (
          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>My NFT List</Typography>
            <DataGrid
              rows={poolList}
              columns={NFTcolumns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        ) : null} */}

      <Typography variant="h5" sx={{ my: 2 }}>Original Pool Data</Typography>
      <DataGrid
        rows={poolList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onRowSelectionModelChange={(keys) => {
          console.log('keysorigin', keys);
          setSelectedKeys(keys);
        }}
      />
      {/* <Typography variant="h5" sx={{ my: 2 }}>
        Calculated data
        <TextField
          type="number"
          label="index"
          variant="outlined"
          value={index}
          sx={{ ml: 2 }}
          onChange={(e) => {
            console.log('Number(e?.target?.value)', Number(e?.target?.value));
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
        onRowSelectionModelChange={(keys) => {
          console.log('keys', keys);
          setSelectedKeys(keys);
        }}
      /> */}
      <Button
        variant="contained"
        onClick={() => {
          buyNFT(actionType);
        }}
      >
        {actionType}
      </Button>
    </Box>
  );
}
