import { Button, Box, FormControl, InputLabel, Input, FormHelperText, Stack, Grid } from '@mui/material'
import { useState, useEffect } from 'react';
import { queryPoolListByPage } from '../service/pool';
import NftTable from './NftTable';
function PoolList() {
  const [contractAddress, setContractAddress] = useState('0x670d854c7da9e7fa55c1958a1aeb368b48496020')
  const [poolList, setPoolList] = useState([])

  const getPoolList = async () => {
    const res = await queryPoolListByPage({
      contractAddress,
      "size": 90,
      "page": 1,
      "filterRepeat": 1,
      "mode": "pro"
    })
    setPoolList(res?.data?.data?.list || [])
  }

  useEffect(() => {
    getPoolList()
  }, [])
  return (
    <Box sx={{ my: 4 }}>
      <Grid container>
        <Grid item md={12}>
          <Stack
            sx={{
              width: 400
            }}
          >
            <FormControl>
              <InputLabel htmlFor="my-input">contract address</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={contractAddress}
                onChange={(e) => {
                  setContractAddress(e?.target?.value)
                }}
              />
            </FormControl>
          </Stack>
          <Stack>
            <Button
              sx={{
                width: 200,
                mt: 2
              }}
              variant="contained"
              onClick={async () => {
                getPoolList()
              }}
            >get PoolList</Button>
          </Stack>
        </Grid>

        <Grid item md={12}>
          <NftTable poolList={poolList} />
        </Grid>
      </Grid>

    </Box >
  )
}

export default PoolList