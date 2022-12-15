let sdk;
let xrplClient;

window.connect = async function () {
  const xumm = new XummPkce('d7775bfe-320d-49d5-9ec8-1218ecfdeafb', {
    implicit: true
  })

  xumm.on("error", (error) => {
    console.log("error", error)
  })

  xumm.on("success", async () => {
    const state = await xumm.state() // state.sdk = instance of https://www.npmjs.com/package/xumm-sdk
    window.accounts = state?.me?.sub
    console.log('User info', state?.me?.sub)
    if(state.sdk){
      sdk = state.sdk;
      xrplClient = new xrpl.Client(state.me.networkEndpoint)
      console.log(state.me.networkEndpoint)
      await xrplClient.connect()
      sdk.ping().then(pong => console.log({pong}))
      myGameInstance.SendMessage("RTS_Camera", "onConnect");
      setTimeout(()=>{
        myGameInstance.SendMessage('RTS_Camera','onNewUser');
      },1500)
    }
  })

  xumm.authorize().catch(e => console.log('e', e))
};

window.openMarketPlace = () => {
  window.open("https://xrempire-market.b-cdn.net");
};

window.startgame = async function () {
  window.userdata()
};

let graphkey = {
  0: "townhall",
  1: "miner",
  2: "cannon",
  3: "xbow",
  4: "tesla",
  5: "archer",
  6: "robot",
  7: "valkyriee",
};
const keys = Object.keys(graphkey);
keys.forEach((item, i) => {
  window[graphkey[item]] = 0;
});

window.collectwin = async function (buildingamount) {
  //Button_AD
  //showData
  //changeScene

  setTimeout(async ()=>{
    myGameInstance.SendMessage("Button_AD", "showData");
  },1500)
};



let index_map_rev = {
  4: 0,
  0: 1,
  1: 2,
  2: 3,
  3: 4
}

window.savegame = async function (str) {
  console.log(str)
  myGameInstance.SendMessage("syncButton", "onSave");
};

let index_map = {
  0: 4,
  1: 0,
  2: 1,
  3: 2,
  4: 3
}

window.fetchWar = async function () {
  let building_data = {"address":null,"buil":[{"buildingIndex":4,"position":[45,0,55],"rotation":89.99999},{"buildingIndex":3,"position":[75,0,25],"rotation":0.0},{"buildingIndex":3,"position":[75,0,95],"rotation":0.0},{"buildingIndex":2,"position":[25,0,95],"rotation":0.0},{"buildingIndex":2,"position":[15,0,25],"rotation":180.0},{"buildingIndex":1,"position":[85,0,65],"rotation":89.99999}]}
  myGameInstance.SendMessage("WarManager", "onWarData", JSON.stringify(building_data));
}

window.userdata = async function () {
  try{
    const response = await xrplClient.request({
      "command": "account_info",
      "account": window.accounts,
      "ledger_index": "validated"
    })
    console.log(response)
    window.aureus = response.result.account_data.Balance/(10**6)
  }catch(e){
    console.error(e)
    window.aureus = 0
  }

  window["townhall"] = 1
  window["miner"] = 1
  window["cannon"] = 2
  window["xbow"] = 3
  window["tesla"] = 2
  window["archer"] = 5
  window["robot"] = 2
  window["valkyriee"] = 4



  let building_data = { address: "", buil: [] }
  window.building_data = JSON.stringify(building_data)
  myGameInstance.SendMessage("RTS_Camera", "onDone");
};
