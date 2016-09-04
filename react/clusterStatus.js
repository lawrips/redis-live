'use strict';

var ClusterStatus = React.createClass({
    getInitialState: function() {
        return {
            status: ''
        };
    },

    initialize: function() {
        this.serverRequest = $.post('/command', 
        {command: 'cluster nodes'},
        function (result) {
            this.setState({
                status: result
            });
        }.bind(this));        
    },

    render: function() {
        if (this.state.status) {
            let table = _renderStatus(this.state.status);
            return (
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>ip:port</td>
                            <td>flags</td>
                            <td>master</td>
                            <td>ping-sent</td>
                            <td>pong-recv</td>
                            <td>config-epoch</td>
                            <td>link-state</td>
                            <td>slot</td>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {row.map(function(col, j) {
                                        return <td key={j}>{col}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            );
        }
        else {
            return <div>Results will be displayed here</div>;
        }
    }
});

function _renderStatus(status) {
    let lines = status.split('\n');
    let table = [];
    lines.forEach((line) => {
        if (line) {
            table.push(line.split(' '));
        }
    });
    
    return table;

}

module.exports = ClusterStatus;
