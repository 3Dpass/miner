const { ApiPromise, WsProvider } = require("@polkadot/api");
const { encodeAddress } = require("@polkadot/util-crypto");

(async () => {
  // Substrate node we are connected to and listening to remarks
  const provider = new WsProvider("ws://127.0.0.1:9944");
  const api = await ApiPromise.create({ provider });

  // Get general information about the node we are connected to
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);
  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

  // Adjust how many accounts to query at once.
  let limit = 100;
  let balances = [];
  let last_key = "";

  while (true) {
    let query = await api.query.system.account.entriesPaged({
      args: [],
      pageSize: limit,
      startKey: last_key,
    });

    if (query.length === 0) {
      break;
    }

    for (const user of query) {
      let account_id = encodeAddress(user[0].slice(-32), 72);
      let free_balance = user[1].data.free;
      let reserved_balance = user[1].data.reserved;
      balances.push([account_id, free_balance - reserved_balance]);
      last_key = user[0];
    }
  }

  console.log({ balances });
})();
