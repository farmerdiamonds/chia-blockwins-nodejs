# chia-blockwins-nodejs
Small nodejs program to send blockheight and timestamp of blockwins for multiple pooling contracts to a remote webserver

Tested on Ubuntu NodeJS Version v18.12.1 Chia-Blockchain v1.3.1

Do not use this in production, take it as an example on how one could program such a functionality.

In the modulefile protocol.mjs you have to change the hostname for the destination webserver and the path to the script which will process the JSON data created in the form of {"token":"yoursecrettoken","blockwins":[{"confirmed_block_index":47329,"timestamp":1616980872},{"confirmed_block_index":104798,"timestamp":1617981856}]}

You can doublecheck the path to the key and the certificate of your Chia-blockchain installation and the RPC port in the modulefile walletrpc.mjs
