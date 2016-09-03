'use strict';

var ServerStatus = React.createClass({
    displayName: 'ServerStatus',

    getInitialState: function getInitialState() {
        return {
            status: ''
        };
    },

    initialize: function initialize() {
        this.serverRequest = $.post('/command', { command: 'info' }, function (result) {
            this.setState({
                status: result
            });
        }.bind(this));
    },

    render: function render() {
        if (this.state.status) {
            var table = _renderStatus(this.state.status);
            return React.createElement(
                'table',
                null,
                React.createElement(
                    'tbody',
                    null,
                    table.map(function (row, i) {
                        return React.createElement(
                            'tr',
                            { key: i },
                            row.map(function (col, j) {
                                return React.createElement(
                                    'td',
                                    { key: j },
                                    col
                                );
                            })
                        );
                    })
                )
            );
        } else {
            return React.createElement(
                'div',
                null,
                'Results will be displayed here'
            );
        }
    }
});

function _renderStatus(status) {
    var lines = status.split('\n');
    var table = [];
    lines.forEach(function (line) {
        if (line) {
            var pair = line.split(':');
            var obj = [];
            obj.push(pair[0]);
            obj.push(pair[1]);
            table.push(obj);
        }
    });

    return table;
}

module.exports = ServerStatus;