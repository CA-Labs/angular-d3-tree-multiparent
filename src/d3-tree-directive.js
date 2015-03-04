/**
 * Angular D3 tree chart multi parent directive
 * @description: directive is displaying a tree chart without main parent, starting the chart from the dept 1 onwards
 * it eliminates all the duplicated children and plots the connection back to the single child object
 * @author: Jacek Dominiak
 * @copyright: Jacek Dominiak
 * @created: 04/03/15
 */

class AngularD3multiParentDirective {

    constructor($interval) {

        this.restrict = 'E';
        this.scope = {
            data: '='
        };
    }

    compile() {
        return this.link;
    }

    link(scope, element, attr) {

        // specify graph defaults with fallbacks
        var graph = {
            width: attr.width || 1000,
            height: attr.height || 900
        };

        // extend d3 with moveToFront function
        // this function redraws the elements in order to put them always in the front
        d3.selection.prototype.moveToFront = function () {
            return this.each(function () {
                this.parentNode.appendChild(this);
            });
        };

        // draw the svg container for the full graph
        var svg = d3.select(element).append('svg:svg')
            .attr('width', graph.width)
            .attr('height', graph.height)
            .append('svg:g')
            .attr('transform', 'translate(-' + graph.width*.2 + ', 0)');

        // specify the diagonal path link draw function
        var diagonal = d3.svg.diagonal().projection((d) => [d.y, d.x]);

        // define the tree and leave some space for the text
        var tree = d3.layout.tree().size([graph.height,graph.width/2]);

        // calculate nodes
        var nodes = tree.nodes(scope.data);

        //make nodes unique by id
        nodes = _.uniq(nodes, 'id');

        // recalculate the x poition of each of then node after the removal
        _.each(nodes, function (o, i) {
            var itemsOfTheSameDepth = _.where(nodes, {depth: o.depth});
            var indexOfTheCurrentItem = _.indexOf(itemsOfTheSameDepth, o);
            var intervalPerDepth = graph.height / itemsOfTheSameDepth.length;
            nodes[i].x = intervalPerDepth / 2 + (intervalPerDepth * indexOfTheCurrentItem);
        });

        // calculate links
        var links = tree.links(nodes);

        // remap the links to the appropriate targets
        _.each(links, function (o, i) {
            links[i].target = _.find(nodes, {id: o.target.id});
        });

        // draw links
        var link = svg.selectAll('path')
            .data(links)
            .enter()
            .append('svg:path')
            .attr('class', (d) => !!d.source ? d.source.id : 'root')
            .classed('link', ture)
            .attr('d', diagonal);

        // draw nodes
        var node = svg.selectAll('g.node')
            .data(nodes)
            .enter()
            .attr('transform', (d) => 'translate(' + d.y +', '+ d.x +')')
            .on('mouseover', function (d) {
                d3.selectAll('.' + d.id)
                    .classed('hover', true)
                    .moveToFront();
            })
            .on('mouseout', function (d) {
                d3.selectAll('.' + d.id)
                    .classed('hover', true);
            });

        // append some node visualization
        node.append('svg:circle').attr('r', 3);

        // add text to represent the meaning of the node
        node.append('svg:text')
            .attr('dx', (d) => d.children ? -8 : 8)
            .attr('dy', 3)
            .classed('text', true)
            .attr('text-anchor', (d) => d.children ? 'end' : 'start')
            .text((d) => d.name)
    }
}

angular.module('d3-multi-parent', [])
    .directive('treeMultiParent', AngularD3multiParentDirective);
