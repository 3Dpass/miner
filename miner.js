import RockObj from "./libs/rock_obj.js";
import Rock from "./libs/rock.js";
import randomArray from "random-array";
import * as THREE from "three";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import axios from "axios";

const apiUrl = "http://localhost:9933";

while (true) {
    const rock = create_rock();
    const obj_file = create_obj_file(rock);
    const response = await axios.post(apiUrl, {
        jsonrpc: "2.0",
        id: 1,
        method: "push_mining_object",
        params: [1, obj_file],
    });
    console.log(response.data);
}

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
