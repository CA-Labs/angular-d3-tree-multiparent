# angular-d3-tree-multiparent

Angular 1.x directive to generate multi-parent d3 graph without the depth of root node `depth: 0`. The graph will remove all duplicated children and replot the connections if necessary.

[DEMO](http://rawgit.com/CA-Labs/angular-d3-tree-multiparent/master/demo/index.html)

## Installation
* clone the repository to your project:

`git clone git@github.com:CA-Labs/angular-d3-tree-multiparent.git`
* add the reference to the module to your html and your angular module

`<script src="angular-d3-tree-multiparent/dist/d3-tree-directive.js"></script>`

`angular.module('myApp', ['d3-multi-parent'])`

* use directive to generate the graph

`<tree-multi-parent data="Main.data" width="300" height="300"></tree-multi-parent>`

## Configuration

|Name|Type|Description|Optional|Default|
|----|----|-----------|--------|-------|
|data|scope|data to be represented. Should be in the scope of the controller|N|-|
|width|attr|width of the graph|Y|1000|
|height|attr|height of the graph|Y|900|

### Adding tooltip to the nodes
adding `description` attribute on the node will enable tooltip on the element. Tooltip appearance is controlled by CSS.

Example of the tooltip CSS implementation:
```css
       div.tooltip {
            position: absolute;
            text-align: center;
            max-width: 160px;
            padding: 7px 10px;
            font: 12px sans-serif;
            color: white;
            background: #111;
            border: 0px;
            border-radius: 2px;
            pointer-events: none;
            margin-top: 2px;
        }
       div.tooltip:before {
           content: '';
           position: absolute;
           top: 0%;
           left: 50%;
           margin-left: -8px;
           margin-top: -8px;
           width: 0; height: 0;
           border-bottom: 8px solid #111;
           border-right: 8px solid transparent;
           border-left: 8px solid transparent;
       }
```

## License
Copyright 2014-2015 CA Technologies - CA Labs EMEA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.