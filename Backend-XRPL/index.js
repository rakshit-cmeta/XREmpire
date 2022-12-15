const { XummSdk } = require("xumm-sdk");


const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{ cors: { origin: '*' } });
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000

const xrpl = require('xrpl')
let wallet;
const xbow = "Qmcpw5R83Cs9wgWvWjpaZidar27WDxzrRNM7ZqvMPWZMEr"
const miner = "QmPzC4SMnyVvTmYji1PQt1bGSa4sUVuDSwVksLecbEkTPT"
const archer = "QmQkKxijLzUtW84FdNup5QuukJXwQ88n58VktRvvpZrqXB"
const tesla = "QmU3CeYQgKC9VmnbsFLoUMaiH4ZBzcAyDJHRuc3G9VVaA1"
const robo = "QmT31dXGfgpnE5zZk6LFqzbkAcDhM367QWebbmcT7EaWez"
const valkyrie = "QmV5szth6HrrUtEVExhLXubnZaiNbTfV9ymfWSjyN95Hw7"
const canon = "QmVVBJvY7x6TsExJZJ2qFyikK89MH6UBBEsxxkRZmSk9bs"
const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
const seed = "xxxxxxxxxxx"

asset_price = {
    0: 50,
    1: 500,
    2: 30,
    3: 20,
    4: 50,
    5: 50,
    6: 80
}



let asset_arr = ["Qmcpw5R83Cs9wgWvWjpaZidar27WDxzrRNM7ZqvMPWZMEr", "QmPzC4SMnyVvTmYji1PQt1bGSa4sUVuDSwVksLecbEkTPT",
    "QmQkKxijLzUtW84FdNup5QuukJXwQ88n58VktRvvpZrqXB", "QmU3CeYQgKC9VmnbsFLoUMaiH4ZBzcAyDJHRuc3G9VVaA1", "QmT31dXGfgpnE5zZk6LFqzbkAcDhM367QWebbmcT7EaWez"
    , "QmV5szth6HrrUtEVExhLXubnZaiNbTfV9ymfWSjyN95Hw7", "QmVVBJvY7x6TsExJZJ2qFyikK89MH6UBBEsxxkRZmSk9bs"]

const Schema = mongoose.Schema;

const asset = new Schema({
    id: Number,
    url: String,
    TokenId: String
});

const assetmodel = mongoose.model('asset', asset);


/*


let a = {
    "Qmcpw5R83Cs9wgWvWjpaZidar27WDxzrRNM7ZqvMPWZMEr": [
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A260000099B00000000",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2616E5DA9C00000001",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A262DCBAB9D00000002",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2644B17C9E00000003",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A265B974D9F00000004",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26727D1EA000000005",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A268962EFA100000006",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26A048C0A200000007",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26B72E91A300000008",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26E4FA33A50000000A"
    ],
    "QmPzC4SMnyVvTmYji1PQt1bGSa4sUVuDSwVksLecbEkTPT": [
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2612C5D5A70000000C",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2629ABA6A80000000D",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26409177A90000000E",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26577748AA0000000F",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A266E5D19AB00000010",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A268542EAAC00000011",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A269C28BBAD00000012",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26C9F45DAF00000014",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26CE1462A400000009",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26FBE004A60000000B"
    ],
    "QmQkKxijLzUtW84FdNup5QuukJXwQ88n58VktRvvpZrqXB": [
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A260EA5D0B200000017",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26258BA1B300000018",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A263C7172B400000019",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26535743B50000001A",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A266A3D14B60000001B",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A268122E5B70000001C",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26AEEE87B90000001E",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26B30E8CAE00000013",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26E0DA2EB000000015",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26F7BFFFB100000016"
    ],
    "QmU3CeYQgKC9VmnbsFLoUMaiH4ZBzcAyDJHRuc3G9VVaA1": [
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A260A85CBBD00000022",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26216B9CBE00000023",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2638516DBF00000024",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A264F373EC000000025",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26661D0FC100000026",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2693E8B1C300000028",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A269808B6B80000001D",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26C5D458BA0000001F",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26DCBA29BB00000020",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26F39FFABC00000021"
    ],
    "QmT31dXGfgpnE5zZk6LFqzbkAcDhM367QWebbmcT7EaWez": [
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A260665C6C80000002D",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A261D4B97C90000002E",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26343168CA0000002F",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A264B1739CB00000030",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2661FD0ACC00000031",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A267D02E0C200000027",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26AACE82C400000029",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26C1B453C50000002A",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26D89A24C60000002B",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26EF7FF5C70000002C"
    ],
    "QmV5szth6HrrUtEVExhLXubnZaiNbTfV9ymfWSjyN95Hw7": [
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A260245C1D300000038",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26192B92D400000039",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26301163D50000003A",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A265DDD05D70000003C",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2678E2DBCD00000032",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A268FC8ACCE00000033",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26A6AE7DCF00000034",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26BD944ED000000035",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26D47A1FD100000036",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26EB5FF0D200000037"
    ],
    "QmVVBJvY7x6TsExJZJ2qFyikK89MH6UBBEsxxkRZmSk9bs": [
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26150B8DDF00000044",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A262BF15EE000000045",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2646F734D60000003B",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A2674C2D6D80000003D",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A268BA8A7D90000003E",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26A28E78DA0000003F",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26B97449DB00000040",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26D05A1ADC00000041",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26E73FEBDD00000042",
        "000800003B7CBCF3BA86C7A0CF796F1516A11BB8037D3A26FE25BCDE00000043"
    ]
}



let i = 0;
for (var key of Object.keys(a)) {
    for (j = 0; j < a[key].length; j++) {
        let assets = new assetmodel;
        assets["id"] = i
        assets["TokenId"] = a[key][j]
        assets["url"] = key
        assets.save()
    }
    i++;
} 



*/



const ObjectId = Schema.ObjectId;

const user = new Schema({
    id: String
});

const usermodel = mongoose.model('user', user);

let mongopass = "xrpltomoon"
let mongouser = "admin"

const signin = {
    "TransactionType": "SignIn",

}


const nftbuyoffer = {
    
    "TransactionType": "NFTokenCreateOffer",
    "Owner": "raRYJGFPcZZ3Hz3nmxtrqgThMry8GNBfu5",
    "NFTokenID": "",
    "Amount": "",
    
}

const nftacceptoffer = {
    "TransactionType": "NFTokenAcceptOffer",
    "NFTokenBuyOffer": ""
}

const Sdk = new XummSdk("ce89d7db-c07c-4a99-b11e-19b7b0d50cc5", "382bdf58-cc1e-4f54-a686-2c22c9b8df18");





io.on('connection', async (socket) => {
   // let subs = await createSignin();
  //  socket.emit("signpayload", subs.created);
   // let ans = await handlesignin(subs, socket);
    socket.on("buynft", async (params) => {
        let subs = await createNFToffer(params.id,params.price);
        socket.emit("signpayload",subs.created);
        let ans = await handlebuy(subs,socket)
    })

});











async function createSignin() {
    const Signinsubscription = await Sdk.payload.createAndSubscribe(signin, event => {
        console.log('New payload event:', event.data)

        if (event.data.signed === true) {
            // No need to console.log here, we'll do that below
            return event.data
        }

        if (event.data.signed === false) {
            // No need to console.log here, we'll do that below
            return false
        }
    })
    console.log(Signinsubscription.created);
    return Signinsubscription
}

async function createNFToffer(id,price) {
    
    nftbuyoffer["Amount"] = price.toString();
    nftbuyoffer["NFTokenID"] = (await assetmodel.findOne({"id":id})).TokenId
    console.log(nftbuyoffer);

    const Signinsubscription = await Sdk.payload.createAndSubscribe(nftbuyoffer, event => {
        console.log('New payload event:', event.data)

        if (event.data.signed === true) {
            // No need to console.log here, we'll do that below
            return event.data
        }

        if (event.data.signed === false) {
            // No need to console.log here, we'll do that below
            return false
        }
    })
    console.log(Signinsubscription.created);
    return Signinsubscription
}



/**
 * Now let's wait until the subscription resolved (by returning something)
 * in the callback function.
 * 
 * 
 * 
 */


async function handlesignin(subscription, socket) {
    const resolveData = await subscription.resolved

    if (resolveData.signed === false) {
        console.log('The sign request was rejected :(')
        socket.emit("signfail");

    }

    if (resolveData.signed === true) {
        console.log('Woohoo! The sign request was signed :)')

        /**
         * Let's fetch the full payload end result, and get the issued
         * user token, we can use to send our next payload per Push notification
         */
        const result = await Sdk.payload.get(resolveData.payload_uuidv4)
        console.log('User token:', result.application.issued_user_token)
gi
        const instance = await usermodel.findOne({ id: result.response.account });
        socket.id = instance._id;
        if (!instance) {
            const userm = new usermodel;
            console.log(result.response.account);
            userm.id = result.response.account;
            await userm.save();
        }


        socket.emit("signsuccess", result);

        return result
    }
}

async function handlebuy(subscription, socket) {
    const resolveData = await subscription.resolved

    if (resolveData.signed === false) {
        console.log('The sign request was rejected :(')
        socket.emit("signfail");

    }

    if (resolveData.signed === true) {
        console.log('Woohoo! The sign request was signed :)')
        
        

        socket.emit("done");

        return result
    }
}






server.listen(PORT, async (error) => {

    if (!error) {
        await mongoose.connect('mongodb+srv://admin:xxxxxxxx@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority');
        await client.connect()
        wallet = xrpl.Wallet.fromSeed(seed)
        console.log("Server is Successfully Running,and App is listening on port " + PORT)
    }
    else
        console.log("Error occurred, server can't start", error);
}
);