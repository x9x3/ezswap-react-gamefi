import {
  Button, Box, FormControl, InputLabel, Input, FormHelperText, Stack, Grid, Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { queryPoolListByPage } from '../../service/pool';
import NftTable from '../../components/NftTable';

function BuyFromPool() {
  const [contractAddress, setContractAddress] = useState('0x8e81970ceb63c236534a763c0ecb611d2d16189f');
  const [poolList, setPoolList] = useState([]);
  const getPoolList = async () => {
    try {
      const res = await queryPoolListByPage({
        contractAddress,
        // network: 'eth',
        network: 'goerli',
      });
      const tempList = res?.data?.data?.filter((i) => i.fromPlatform === 1 && i.type !== 'sell');
      setPoolList(tempList);
    } catch (error) {
      console.log('error', error);
      setPoolList([]);
    }
  };

  useEffect(() => {
    getPoolList();
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Grid container>
        <Grid item md={12}>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              m: 4,
            }}
          >
            <FormControl sx={{ width: 400 }}>
              <InputLabel htmlFor="my-input">contract address</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={contractAddress}
                onChange={(e) => {
                  setContractAddress(e?.target?.value);
                }}
              />
            </FormControl>
            <Button
              sx={{
                width: 200,
                mt: 2,
              }}
              variant="contained"
              onClick={async () => {
                getPoolList();
              }}
            >
              get PoolList

            </Button>
          </Stack>
        </Grid>
        <Grid item md={12} sx={{ m: 4 }}>
          <NftTable poolList={poolList} actionType="Sell" />
        </Grid>
      </Grid>

    </Box>
  );
}

export default BuyFromPool;
