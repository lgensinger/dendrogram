import test from "ava";

import { configurationDimension } from "../src/configuration.js";
import { Dendrogram } from "../src/index.js";

let testData = [{id: "some|path", value: 1}, {id: "some", value: 3}];

/******************** EMPTY VARIABLES ********************/

// TEST INIT //
test("init", t => {

    // initialize
    let dg = new Dendrogram();

    t.true(dg.height === configurationDimension.height);
    t.true(dg.width === configurationDimension.width);

});

// TEST get DATA //
test("get_data", t => {

    // initialize
    let dg = new Dendrogram();

    // data formatting
    let result = dg.data;

    t.true(typeof(result) == "object");

});

// TEST get LAYOUT //
test("get_layout", t => {

    // initialize
    let dg = new Dendrogram();

    // layout formatting
    let result = dg.layout;
    t.true(typeof(result) == "function");

});

// TEST EXTRACTLABEL //
test("extractLabel", t => {

    // initialize
    let dg = new Dendrogram();

    // pull node label from id
    let result = dg.extractLabel(testData[0]);

    t.true(typeof(result) == "string");
    t.true(testData[0].id.includes(result));

});

// TEST RENDER //
test("render", t => {

    // clear document
    document.body.innerHTML = "";

    // initialize
    let dg = new Dendrogram();

    // render to dom
    dg.render(document.body);

    // get generated element
    let artboard = document.querySelector(".lgv-dendrogram");

    t.true(artboard !== undefined);
    t.true(artboard.nodeName == "svg");
    t.true(artboard.getAttribute("viewBox").split(" ")[3] == configurationDimension.height);
    t.true(artboard.getAttribute("viewBox").split(" ")[2] == configurationDimension.width);

});

/******************** DECLARED PARAMS ********************/

let testWidth = 300;
let testHeight = 500;
let testPadding = 5;

// TEST INIT //
test("init_params", t => {

    // initialize
    let dg = new Dendrogram(testData, testWidth, testHeight);

    t.true(dg.height === testHeight);
    t.true(dg.width === testWidth);

});

// TEST get DATA //
test("get_data_params", t => {

    // initialize
    let dg = new Dendrogram(testData, testWidth, testHeight);

    // data formatting
    let result = dg.data;

    t.true(typeof(result) == "object");

});

// TEST get LAYOUT //
test("get_layout_params", t => {

    // initialize
    let dg = new Dendrogram(testData, testWidth, testHeight);

    // layout formatting
    let result = dg.layout;

    t.true(typeof(result) == "function");

});

// TEST EXTRACTLABEL //
test("extractLabel_params", t => {

    // initialize
    let dg = new Dendrogram(testData, testWidth, testHeight);

    // pull node label from id
    let result = dg.extractLabel(testData[0]);

    t.true(typeof(result) == "string");
    t.true(testData[0].id.includes(result));

});

// TEST RENDER //
test("render_params", t => {

    // clear document
    document.body.innerHTML = "";

    // initialize
    let dg = new Dendrogram(testData, testWidth, testHeight);

    // render to dom
    dg.render(document.body);

    // get generated element
    let artboard = document.querySelector(".lgv-dendrogram");

    t.true(artboard !== undefined);
    t.true(artboard.nodeName == "svg");
    t.true(artboard.getAttribute("viewBox").split(" ")[3] == testHeight);
    t.true(artboard.getAttribute("viewBox").split(" ")[2] == testWidth);

});
