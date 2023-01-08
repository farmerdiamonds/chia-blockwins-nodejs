import { homedir } from 'node:os';
import { readFileSync } from 'node:fs';
import { Agent } from 'node:https';
import { request } from 'node:https';

async function nodeRequest(path,data){
  const keypath = homedir() + '/.chia/mainnet/config/ssl/full_node/';
  let privatekey, privatecert;
  try{
    privatekey = readFileSync(keypath + "private_full_node.key",{encoding:'utf8',flag:'r'});
  }catch(e){
    console.log("Could not open full_node private key: "+e);
    return {success: false};
  }
  try{
    privatecert = readFileSync(keypath + "private_full_node.crt",{encoding:'utf8',flag:'r'});
  }catch(e){
    console.log("Could not open full_node private certificate: "+e);
    return {success: false};
  }
  const clientoptions = {
    hostname: '127.0.0.1',
    port: 8555, //check for correct port in .chia/mainnet/config/config.json
    path: path,
    method: 'POST',
    key: privatekey,
    cert: privatecert
  };
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
  clientoptions.agent = new Agent(clientoptions);
  return new Promise((resolve, reject) => {
    const noderequest = request(clientoptions, (noderesponse) => {
      let responsedata = '';
      noderesponse.on('data', (chunk) => {
        responsedata += chunk;
      });
      noderesponse.on('end', () => {
        const responseobject = JSON.parse(responsedata.toString());
        resolve(responseobject);
      });
      noderequest.on('error', (e) => {
        console.log("Requesterror:\n"+e);
        reject(e);
      });
      noderequest.on('timeout', () => {
        noderequest.destroy();
        console.log("RPC Error:\n"+e);
        reject(new Error('Connection timeout'));
      });
    });
    noderequest.write(data);
    noderequest.end();
  });
}
export { nodeRequest };