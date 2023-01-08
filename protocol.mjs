import { Agent } from 'node:https';
import { request } from 'node:https';

async function saveBlockwins(blockwins){
  const path = '/protocol.php';
  const clientoptions = {
    hostname: 'example.com',
    port: 443,
    path: path,
    method: 'POST',
  };
  let data={};
  data.token='yoursecrettoken';
  data.blockwins=[];
  blockwins.forEach(function(blockwin){
    let blockwindata={};
    if(blockwin.coinbase){
      blockwindata.confirmed_block_index = blockwin.confirmed_block_index;
      blockwindata.timestamp = blockwin.timestamp;
      data.blockwins.push(blockwindata);
    }
  });
  clientoptions.agent = new Agent(clientoptions);
  return new Promise((resolve, reject) => {
    const serverrequest = request(clientoptions, (serverresponse) => {
      let responsedata = '';
      serverresponse.on('data', (chunk) => {
        responsedata += chunk;
      });
      serverresponse.on('end', () => {
        try{
          const responseobject = JSON.parse(responsedata.toString());
          resolve(responseobject);
        }catch{
          console.log("Webserver returned missmatched JSON data: "+responsedata.toString());
          resolve({"error":"Missmatched JSON response from Webserver"});
        }
      });
      serverrequest.on('error', (e) => {
        console.log("Requesterror:\n"+e);
        reject(e);
      });
      serverrequest.on('timeout', () => {
        nodereq.destroy();
        console.log("RPC Error:\n"+e);
        reject(new Error('Connection timeout'));
      });
    });
    console.log(JSON.stringify(data));
    serverrequest.write(JSON.stringify(data));
    serverrequest.end();
  });
}
export { saveBlockwins };