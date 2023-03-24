import { ethers, utils } from 'ethers';
import EZswap from '../ABI/EZswap.json';

const routerAddress = '0x826868A09FECAb872E8E95bc02ff040223C950FE';

const formatCeilNumber = (value) => (Math.ceil(value * 10000) / 10000);

export const buySingleNFT = async ({
  poolAddress, address, total, tokenId,
}) => {
  const DEADLINE = Date.parse(new Date()) / 1000 + 60 * 3600;
  const buyTicketAbi = ['function robustSwapETHForSpecificNFTs(tuple(tuple(address,uint256[],uint256[]),uint256)[],address,address,uint256) public payable returns (uint256)'];
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const signer = provider.getSigner();
  const ticketContract = new ethers.Contract(routerAddress, buyTicketAbi, signer);
  const totalValue = utils.parseEther(formatCeilNumber(total)?.toString()).toString();
  const approveTx = await ticketContract.robustSwapETHForSpecificNFTs(
    [[[poolAddress, [tokenId]], totalValue]],
    address,
    address,
    DEADLINE,
    { value: totalValue },
  );
  const receipt = await approveTx.wait();
  console.log('receipt', receipt);
};
export const buyMultipleNFT = async ({
  address, selectedList,
}) => {
  const DEADLINE = Date.parse(new Date()) / 1000 + 60 * 3600;
  const buyTicketAbi = ['function robustSwapETHForSpecificNFTs(tuple(tuple(address,uint256[],uint256[]),uint256)[],address,address,uint256) public payable returns (uint256)'];
  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const signer = provider.getSigner();
  const ticketContract = new ethers.Contract(routerAddress, buyTicketAbi, signer);
  let totalValue = 0;
  const NFTData = [];
  const conunt = 1;
  selectedList.forEach((item) => {
    const total = utils.parseEther(formatCeilNumber(item.currentPrice)?.toString()).toString();
    totalValue += Number(total);
    NFTData.push([[item.id, [Number(item.tokenId)], [conunt]], total]);
  });
  const approveTx = await ticketContract.robustSwapETHForSpecificNFTs(
    NFTData,
    address,
    address,
    DEADLINE,
    { value: totalValue.toString() },
  );
  const receipt = await approveTx.wait();
  console.log('receipt', receipt);
};

export const a = () => {};
