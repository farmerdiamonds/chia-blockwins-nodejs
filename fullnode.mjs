import { nodeRequest } from './noderpc.mjs';

async function getBlockwins(puzzlehash,startheight){
  return await nodeRequest("/get_coin_records_by_puzzle_hash",'{"puzzle_hash":"'+puzzlehash+'", "start_height":'+startheight+', "include_spent_coins":true}');
}

export {
  getBlockwins
}