'use strict';

var ClusterStatus = React.createClass({
    displayName: 'ClusterStatus',

    getInitialState: function getInitialState() {
        return {
            status: ''
        };
    },

    initialize: function initialize() {
        this.serverRequest = $.post('/command', { command: 'cluster nodes' }, function (result) {
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
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            'id'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'ip:port'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'flags'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'master'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'ping-sent'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'pong-recv'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'config-epoch'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'link-state'
                        ),
                        React.createElement(
                            'td',
                            null,
                            'slot'
                        )
                    )
                ),
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
            table.push(line.split(' '));
        }
    });

    return table;
}

module.exports = ClusterStatus;