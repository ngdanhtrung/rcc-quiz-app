import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default class GameOver extends Component {
    render() {
        const style = {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
        };
        return (
            <div
                style={{
                    padding: "1rem",
                    border: "1px solid grey",
                    borderRadius: "4px",
                    maxWidth: 400,
                    margin: "3rem auto",
                }}
            >
                <div style={style}>
                    <h1>GAME OVER</h1>
                </div>
                <div style={style}>
                    <h2> Continue ?</h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <Button maxWidth='30%'>
                        <Link to={this.props.location.state.id}>YES</Link>
                    </Button>
                    <Button maxWidth='30%' disabled='true'>
                        NO
                    </Button>
                </div>
            </div>
        );
    }
}
