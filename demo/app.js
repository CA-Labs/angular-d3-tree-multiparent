/**
 * Demo app
 * @author: Jacek Dominiak
 * @copyright: Jacek Dominiak
 * @created: 04/03/15
 */

function MainController() {

    this.data = {
        name: 'ROOT',
        id: 'root',
        children: [
            {
                name: 'A',
                id: 'A',
                children: [
                    {
                        name: 'AA',
                        id: 'AA'
                    },
                    {
                        name: 'BB',
                        id: 'BB'
                    }
                ]
            },
            {
                name: 'B',
                id: 'B',
                children: [
                    {
                        name: 'AA',
                        id: 'AA'
                    },
                    {
                        name: 'BB',
                        id: 'BB'
                    },
                    {
                        name: 'CC',
                        id: 'CC'
                    }
                ]
            }
        ]
    }
}

angular.module('d3-app', ['d3-multi-parent']).controller('MainController', MainController);