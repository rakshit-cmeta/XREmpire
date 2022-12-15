async function batchMint() {

    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
    results = "wss://xls20-sandbox.rippletest.net:51233"
    document.getElementById('standbyResultField').value = results
    await client.connect()
    results += '\nConnected, finding wallet.'
    document.getElementById('standbyResultField').value = results
    standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value)
    document.getElementById('standbyResultField').value = results
    const account_info = await client.request({
        "command": "account_info",
        "account": standby_wallet.address
    })

    my_sequence = account_info.result.account_data.Sequence
    results += "\n\nSequence Number: " + my_sequence + "\n\n"
    document.getElementById('standbyResultField').value = results
    const nftokenCount = parseInt(standbyNFTokenCountField.value)

    const ticketTransaction = await client.autofill({
        "TransactionType": "TicketCreate",
        "Account": standby_wallet.address,
        "TicketCount": nftokenCount*7,
        "Sequence": my_sequence
    })

    const signedTransaction = standby_wallet.sign(ticketTransaction)
    const tx = await client.submitAndWait(signedTransaction.tx_blob)

    let response = await client.request({
        "command": "account_objects",
        "account": standby_wallet.address,
        "type": "ticket"
    })

    let tickets = []

    for (let i = 0; i < nftokenCount*7; i++) {
        tickets[i] = response.result.account_objects[i].TicketSequence
    }


    results += "Tickets generated, minting NFTokens.\n\n"
    document.getElementById('standbyResultField').value = results


    let asset_arr = ["Qmcpw5R83Cs9wgWvWjpaZidar27WDxzrRNM7ZqvMPWZMEr", "QmPzC4SMnyVvTmYji1PQt1bGSa4sUVuDSwVksLecbEkTPT",
        "QmQkKxijLzUtW84FdNup5QuukJXwQ88n58VktRvvpZrqXB", "QmU3CeYQgKC9VmnbsFLoUMaiH4ZBzcAyDJHRuc3G9VVaA1", "QmT31dXGfgpnE5zZk6LFqzbkAcDhM367QWebbmcT7EaWez"
        , "QmV5szth6HrrUtEVExhLXubnZaiNbTfV9ymfWSjyN95Hw7", "QmVVBJvY7x6TsExJZJ2qFyikK89MH6UBBEsxxkRZmSk9bs"]


    let batch = {
        "Qmcpw5R83Cs9wgWvWjpaZidar27WDxzrRNM7ZqvMPWZMEr":[],
        "QmPzC4SMnyVvTmYji1PQt1bGSa4sUVuDSwVksLecbEkTPT": [],
        "QmQkKxijLzUtW84FdNup5QuukJXwQ88n58VktRvvpZrqXB":[],
        "QmU3CeYQgKC9VmnbsFLoUMaiH4ZBzcAyDJHRuc3G9VVaA1":[],
        "QmT31dXGfgpnE5zZk6LFqzbkAcDhM367QWebbmcT7EaWez":[],
        "QmV5szth6HrrUtEVExhLXubnZaiNbTfV9ymfWSjyN95Hw7":[],
        "QmVVBJvY7x6TsExJZJ2qFyikK89MH6UBBEsxxkRZmSk9bs":[]

    }

   for (let j = 0; j < asset_arr.length; j++) {
        for (let i = 0; i < nftokenCount; i++) {
            const transactionBlob = {
                "TransactionType": "NFTokenMint",
                "Account": standby_wallet.classicAddress,
                "URI": xrpl.convertStringToHex(asset_arr[j]),
                "Flags": parseInt(standbyFlagsField.value),
                "TransferFee": parseInt(standbyTransferFeeField.value),
                "Sequence": 0,

                "TicketSequence": tickets[i+nftokenCount*j],
                "LastLedgerSequence": null,
                "NFTokenTaxon": 0
            }

            
            const tx = await client.submit(transactionBlob, { wallet: standby_wallet })
            console.log(tx);
        }
        console.log(asset_arr[j]);
       
    }
    
    results += "\n\nNFTs:\n"
    let nfts = await client.request({
        method: "account_nfts",
        account: standby_wallet.classicAddress,
        limit: 400
    })
    console.log(nfts);
    results += JSON.stringify(nfts, null, 2)

    for (i = 0; i<nfts.result.account_nfts.length;i++){
        
        batch[hex_to_ascii(nfts.result.account_nfts[i].URI)].push(nfts.result.account_nfts[i].NFTokenID);

    }


    console.log(batch);
   /* while (nfts.result.marker != null) {
        nfts = await client.request({
            method: "account_nfts",
            account: standby_wallet.classicAddress,
            limit: 400,
            marker: nfts.result.marker
        })
        results += '\n' + JSON.stringify(nfts, null, 2)
    }*/

  //  results += '\n\nTransaction result: ' + tx.result.meta.TransactionResult
 //   results += '\n\nnftokens: ' + JSON.stringify(nfts, null, 2)
  //  document.getElementById('standbyBalanceField').value =
  //      (await client.getXrpBalance(standby_wallet.address))
  //  document.getElementById('standbyResultField').value = results

   
} // End of batchMint()

async function getdata(){
    const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
     let results = "wss://xls20-sandbox.rippletest.net:51233"
    document.getElementById('standbyResultField').value = results
    await client.connect()
    results += '\nConnected, finding wallet.'
    document.getElementById('standbyResultField').value = results
    standby_wallet = xrpl.Wallet.fromSeed(standbySeedField.value)
    document.getElementById('standbyResultField').value = results
    let nfts = await client.request({
        method: "account_nfts",
        account: standby_wallet.classicAddress,
        limit: 400
    })

     results = JSON.stringify(nfts, null, 2)
    while (nfts.result.marker != null) {
        nfts = await client.request({
            method: "account_nfts",
            account: standby_wallet.classicAddress,
            limit: 400,
            marker: nfts.result.marker
        })
        results += '\n' + JSON.stringify(nfts, null, 2)
    }

    results += '\n\nTransaction result: ' + tx.result.meta.TransactionResult

}


function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }
