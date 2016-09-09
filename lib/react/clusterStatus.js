'use strict';

var ClusterStatus = React.createClass({
    getInitialState: function() {
        return {
            status: ''
        };
    },

    initialize: function() {
        var options = {
            url: this.props.path + '/command',
            dataType: 'json', 
            type: 'POST',
            data: {command: 'cluster nodes'},
        }

        this.serverRequest = $.ajax(options).always((result) => {
            this.setState({
                status: result.responseText
            });
        });    
    },

    render: function() {
        if (this.state.status) {
            let cluster = _renderStatus(this.state.status);
            let tables = [];
            let i=0;

            Object.keys(cluster).forEach((key) => {
                tables.push(
                    <div>
                        
                        <h3>Hash slot: {cluster[key][0][8]}</h3>
                        <table id={i++}>
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
                                </tr>
                            </thead>
                            <tbody>
                                {cluster[key].map((row, i) => {
                                    return (
                                        <tr key={i}>
                                            {row.map(function(col, j) {
                                                if (j < 8) {
                                                    let style = {};
                                                    if (col == 'connected') {
                                                        style.backgroundColor = '#90EE90';
                                                    } 
                                                    else if (col == 'disconnected') {
                                                        style.backgroundColor = '#FFC1C1';                                            
                                                    }

                                                    return <td style={style} key={j}>{col}</td>;
                                                }
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <br/>
                    </div>
                );
            });

            console.log(tables);

            return <div>{tables}</div>;
        }
        else {
            return <div>Results will be displayed here</div>;
        }
    }
});

function _renderStatus(status) {
    let array = status.split('\n');
    let table = [];
    // put everything in an array
    array.forEach((line) => {
        if (line) {
            table.push(line.split(' '));
        }
    });
    
    // organize into sets, grouped by the master
    let clusters = {};
    table.forEach((row) => {
        let master = row[3] == '-' ? row[0] : row[3];

        if (!clusters[master]) {
            clusters[master] = [];
        }

        clusters[master].push(row);
    });

    // order items in each set
    Object.keys(clusters).forEach((key) => {
        clusters[key] = clusters[key].sort((a,b) => {
            if (a[[3] > b[3]]) {
                return -1
            }
            else if (a[3] > b[3]) {
                return 1;
            }
            return 0;
        }); 
    });



    return clusters;

}

module.exports = ClusterStatus;
