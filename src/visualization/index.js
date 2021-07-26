import { stratify, tree } from "d3-hierarchy";
import { select } from "d3-selection";
import { linkRadial, pointRadial } from "d3-shape";

import { configurationDimension, configurationParse } from "../configuration.js";
import { mouseOverIds } from "../utilities.js";

/**
 * Dendrogram is a hierarchy visualization.
 * @param {array} data - objects where each represents a path in the hierarchy
 * @param {integer} height - artboard height
 * @param {integer} width - artboard width
 * @param {integer} paddingCircles - space between packed circles
 */
class Dendrogram {
    constructor(data, width=configurationDimension.width, height=configurationDimension.height) {

        // update self
        this.dataSource = data;
        this.height = height;
        this.width = width;

    }

    /**
     * Condition data for visualization requirements.
     * @returns A xx.
     */
    get data() {

        let result = null;

        // verify valid source provided
        if (this.dataSource && this.dataSource.length > 0) {

            // build hierarchy from flat data
            let hierarchy = stratify()
                .parentId(d => d.id.substring(0, d.id.lastIndexOf(configurationParse.delimeter)));

            // build nest
            let nestedData = hierarchy(this.dataSource)
                .sort((a,b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));

            // calculate layout leaves
            let hierarchyData = nestedData
                .sum(d => d.value)
                .sort((a,b) => a.id.toLowerCase().localeCompare(b.id.toLowerCase()));

            // process for layout
            result = this.layout(hierarchyData);

        }

        return result;

    }

    /**
     * Construct layout.
     * @returns A d3 tree layout function.
     */
    get layout() {
        return tree()
            .size([2 * Math.PI, this.width * 0.3])
            .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);
    }

    /**
     * Extract label from full hierarchy path.
     * @param {object} d - datum inside d3 data
     * @returns A string which represents the label for a node.
     */
    extractLabel(d) {
        return d.id.split(configurationParse.delimeter)[d.id.split(configurationParse.delimeter).length - 1];
    }

    /**
     * Render visualization.
     * @param {node} domNode - HTML node
     */
    render(domNode) {

        let root = this.data;

        // generate svg artboard
        let artboard = select(domNode)
            .append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr("class", "lgv-dendrogram");

        // generate group to transform entire visualization to be centered on the artboard
        let g = artboard
            .append("g")
            .attr("transform", `translate(${this.width / 2},${this.height / 2})`);

        // draw links
        let link = g.selectAll(".lgv-link")
            .data(root ? root.links() : [])
            .enter()
            .append("path")
            .attr("class", "lgv-link")
            .attr("d", linkRadial().angle(d => d.x).radius(d => d.y));

        // draw nodes
        let node = g.selectAll(".lgv-node")
            .data(root ? root.descendants() : [])
            .enter()
            .append("g")
            .attr("class", d => "lgv-node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", d => `translate(${pointRadial(d.x, d.y)})`);

        // set node attributes
        node.append("circle")
            .attr("r", 2.5);

        // add text
        node.append("text")
            .attr("id", d => d.id)
            .attr("class", "lgv-label")
            .attr("dy", "0.31em")
            .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
            .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
            .attr("transform", d => `rotate(${(d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI})`)
            .text(d => this.extractLabel(d))
            .on("mouseover", e => {
                // set node
                node.attr("opacity", x =>  mouseOverIds(e.target.id, this.dataSource).includes(x.id) ? 1 : 0.15);
                // set labels
                link.attr("opacity", x => mouseOverIds(e.target.id, this.dataSource).includes(x.id) ? 1 : 0.15);
            })
            .on("mouseout", e => {
                // reset nodes
                node.attr("opacity", 1);
                // reset labels
                link.attr("opacity", 1);
            });

    }

};

export { Dendrogram };
export default Dendrogram;
