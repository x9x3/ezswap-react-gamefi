import axios from 'axios';

export function queryPoolListByPage(parameter) {
  return axios({
    url: 'https://test.ezswap.io/api/recommend/queryPoolListByPage',
    method: 'post',
    data: parameter
  })
}