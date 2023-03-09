import {
  Button, Box, FormControl, InputLabel, Input, FormHelperText, Stack, Grid,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { queryPoolListByPage } from '../service/pool';
import NftTable from './NftTable';

function PoolList() {
  const [contractAddress, setContractAddress] = useState('0x670d854c7da9e7fa55c1958a1aeb368b48496020');
  const [poolList, setPoolList] = useState([]);

  const getPoolList = async () => {
    const res = await queryPoolListByPage({
      contractAddress,
      size: 90,
      page: 1,
      filterRepeat: 1,
      // fromPlatform: 1,
      mode: 'pro',
    });
    const tempList = res?.data?.data?.list?.filter((i) => i.fromPlatform === 1);
    setPoolList(tempList);
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
          <NftTable poolList={poolList} />
        </Grid>
      </Grid>

    </Box>
  );
}

export default PoolList;
