import { getBlockwins } from './fullnode.mjs';
import { saveBlockwins } from './protocol.mjs';

const startHeight = 0; //blockheight with the first blockwin for a contract
const contracts = [
  "0x32c091703326955ece83a8985bc7af53e6516f321865758a97593069f9c507c7",
  "0x6e9c78c15cdc6d03d210e73d444c2eb8757cbab2a0934b77e204a2cf17726a17"
]; // array of poolcontract puzzlehashes

async function main(){
  try{
    contracts.forEach(async function(puzzlehash){
      const blockwins=await getBlockwins(puzzlehash,startHeight);
      console.log(blockwins.coin_records.length+' Blockwins for contract: '+puzzlehash);
      console.log(await saveBlockwins(blockwins.coin_records));
    });
  }catch(e){
    console.log(e);
  }
  setTimeout(10000,main);
}
main();