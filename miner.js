import RockObj from "./libs/rock_obj.js";
import Rock from "./libs/rock.js";
import randomArray from "random-array";
import * as THREE from "three";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import axios from "axios";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;
const interval = argv.interval || 1000;
const host = argv.host || "localhost";
const port = argv.port || "9933";
const apiUrl = `http://${host}:${port}`;

setInterval(() => {
    const rock = create_rock();
    const obj_file = create_obj_file(rock);
    axios
        .post(apiUrl, {
            jsonrpc: "2.0",
            id: 1,
            method: "push_mining_object",
            params: [1, obj_file],
        })
        .catch((e) => {
            console.log("Error connecting to server:", host, port);
        })
        .then((response) => {
            if (!response) {
                return;
            }
            console.log(response.data);
        });
}, interval);

function create_rock() {
    const rock_obj = new RockObj();
    rock_obj.seed = Math.round(randomArray(0, Number.MAX_SAFE_INTEGER).oned(1)[0]);
    rock_obj.scale = [1.0, 1.0, 1.8];
    return new Rock(rock_obj);
}

function create_obj_file(rock) {
    const scene = new THREE.Scene();

    const mesh = new THREE.Mesh(rock.geometry);
    scene.add(mesh);

    const exporter = new OBJExporter();
    return exporter.parse(scene);
}
