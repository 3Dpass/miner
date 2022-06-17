## About
Simple CPU miner app for [Proof of Scan](https://3dpass.org/proof_of_scan.html). It generates random-shaped 3D models and sends them to the 
[local node](https://github.com/3Dpass/3DP) via [mining RPC](https://github.com/3Dpass/3DP/blob/dev/nodes/poscan-consensus/src/mining_rpc.rs) like this: 

```
{
    "jsonrpc":"2.0",
    "id":1",
    "method":"push_mining_object",
    "params": [
        1,
        "o\n
v 0.05508197844028473 0.7671535015106201 -0.14178061485290527\n
v 0.05349433422088623 0.764365017414093 -0.10946107655763626\n
v 0.04743874818086624 0.7608485817909241 -0.07884219288825989\n
            ]
}
```
Where as one of the parameters is the content of 3D model in .obj format, but with `\n` added at the end of each line. 
```
v 0.05508197844028473 0.7671535015106201 -0.14178061485290527\n
v 0.05349433422088623 0.764365017414093 -0.10946107655763626\n
v 0.04743874818086624 0.7608485817909241 -0.07884219288825989\n
```

## Install
You have to have [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) installed on your computer. 
If you have, use this command to install miner: 

```bash
yarn
```

## Start Mining:

1. Start [3DP local node](https://github.com/3Dpass/3DP)
2. Run miner:

```bash
yarn miner
```
### Save 3D model:
```bash
yarn miner --save
```
3D model generated will be saved in the project folder as rock.obj file
