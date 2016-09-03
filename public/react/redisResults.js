"use strict";

var resultsStyle = {
    "height": "200px",
    "fontFamily": "monospace"
};

var RedisResults = React.createClass({
    displayName: "RedisResults",

    getInitialState: function getInitialState() {
        return {
            text: ''
        };
    },

    setText: function setText(text) {
        this.setState({
            text: text
        });
    },

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement("pre", { style: resultsStyle, dangerouslySetInnerHTML: { __html: this.state.text } })
        );
    }
});

module.exports = RedisResults;