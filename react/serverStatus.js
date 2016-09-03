'use strict';

var ServerStatus = React.createClass({
    getInitialState: function() {
        return {
            status: ''
        };
    },

    initialize: function() {
        this.serverRequest = $.post('/command', 
        {command: 'info'},
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
            let pair = line.split(':');
            let obj = [];
            obj.push(pair[0]);
            obj.push(pair[1]);
            table.push(obj);
        }
    });
    
    return table;

}

module.exports = ServerStatus;
