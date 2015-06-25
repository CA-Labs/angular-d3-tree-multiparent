"use strict";

/**
 * Angular D3 tree chart multi parent directive
 * @description: directive is displaying a tree chart without main parent, starting the chart from the dept 1 onwards
 * it eliminates all the duplicated children and plots the connection back to the single child object
 * @author: Jacek Dominiak
 * @copyright: Jacek Dominiak
 * @created: 04/03/15
 */

function AngularD3multiParentDirective() {

    function link(scope, element, attr) {

        // specify graph defaults with fallbacks
        var graph = {
            width: attr.width || 1000,
            height: attr.height || 900
        };

        // Colouring function
        var colors = d3.scale.category20();

        // extend d3 with moveToFront function
        // this function redraws the elements in order to put them always in the front
        d3.selection.prototype.moveToFront = function () {
            return this.each(function () {
                this.parentNode.appendChild(this);
            });
        };

        // draw the svg container for the full graph
        var svg = d3.select(element[0]).append("svg:svg").attr("width", graph.width).attr("height", graph.height).append("svg:g").attr("transform", "translate(-" + graph.width * 0.2 + ", 0)");

        // specify the diagonal path link draw function
        var diagonal = d3.svg.diagonal().projection(function (d) {
            return [d.y, d.x];
        });

        // define the tree and leave some space for the text
        var tree = d3.layout.tree().size([graph.height, graph.width / 2]);

        //tooltip
        var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

        // calculate nodes
        var nodes = tree.nodes(scope.data);

        //make nodes unique by id
        nodes = _.uniq(nodes, "id");

        // recalculate the x poition of each of then node after the removal
        _.each(nodes, function (o, i) {
            var itemsOfTheSameDepth = _.where(nodes, { depth: o.depth });
            var indexOfTheCurrentItem = _.indexOf(itemsOfTheSameDepth, o);
            var intervalPerDepth = graph.height / itemsOfTheSameDepth.length;
            nodes[i].x = intervalPerDepth / 2 + intervalPerDepth * indexOfTheCurrentItem;
        });

        // calculate links
        var links = tree.links(nodes);

        // remap the links to the appropriate targets
        _.each(links, function (o, i) {
            links[i].target = _.find(nodes, { id: o.target.id });
        });

        // draw links
        var link = svg.selectAll("path").data(links).enter().append("svg:path").attr("class", function (d) {
            return !!d.source ? d.source.id : "root";
        }).classed("link", true).attr("d", diagonal);

        // draw nodes
        var node = svg.selectAll("g.node").data(nodes).enter().append("svg:g").attr("transform", function (d) {
            return "translate(" + d.y + ", " + d.x + ")";
        }).on("mouseup", function (d) {
            // clean up hovers
            d3.selectAll("path.link").classed("hover", false);

            // mark paths to hover
            d3.selectAll("." + d.id).classed("hover", true).moveToFront();

            _.pluck(d.children, "id").forEach(function (id) {
                d3.selectAll("." + id).classed("hover", true).moveToFront();
            });

            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }).on("mouseover", function (d) {
            // if description exists ... match it to tooltip
            if (!!d.description) {
                tooltip.transition().duration(200).style("opacity", 0.9);

                tooltip.html(d.description).style("left", d3.event.pageX - 8 + "px").style("top", d3.event.pageY + 8 + "px");
            }
        }).on("mouseout", function (d) {
            tooltip.transition().duration(500).style("opacity", 0);
        });

        // append some node visualization
        node.append("svg:circle").attr("r", 4).attr("fill", function (d) {
            return colors(d.id.split("-")[0]);
        }).attr("stroke", "#333333").attr("stroke-width", "1.5px");

        // add text to represent the meaning of the node
        node.append("svg:text").attr("dx", function (d) {
            return d.children ? -8 : 8;
        }).attr("dy", 3).classed("text", true).attr("text-anchor", function (d) {
            return d.children ? "end" : "start";
        }).text(function (d) {
            return d.name;
        });
    }

    return {
        restrict: "E",
        scope: {
            data: "="
        },
        link: link
    };
}

angular.module("d3-multi-parent", []).directive("treeMultiParent", AngularD3multiParentDirective);