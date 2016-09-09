'use strict';
let ServerSelector = require('./serverSelector');

var ServerStatus = React.createClass({
    getInitialState: function() {
        this.getStatus(this.props.hosts[0]);

        return {
            status: ''
        };
    },

    selectorChanged: function(field) {
        this.getStatus(field);
    },

    getStatus: function(host) {
        var options = {
            url: this.props.path + '/info',
            dataType: 'json', 
            type: 'POST',
            data: { host: host },
        }

        this.serverRequest = $.ajax(options).always((result) => {
            this.setState({
                status: result.responseText
            });
        });
    },

    render: function() {
        var Selector = <ServerSelector onChange={this.selectorChanged.bind(this)} hosts={this.props.hosts}/>

        if (this.state.status) {
            let table = _renderStatus(this.state.status);
            return (
                <div>
                    {Selector}
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
                </div>
            );
        }
        else {
            return (
                <div>
                    {Selector}
                    <div>Results will be displayed here</div>
                </div>
            );
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
