import React, { Component } from "react";
import { Input, Button, Progress, Divider } from "antd";
import { level1 } from "../data";
import { Link, Redirect } from "react-router-dom";

const Clock = ({ time }) => {
    return <h2>time left: {time > 0 ? time : 0}</h2>;
};

export default class Level1 extends Component {
    state = {
        value: "",
        timeOut: false,
        round: 0,
        timer: 11,
        randomTense: "",
        wrongAnswer: "",
        wrongAnswers: [],
    };
    handleClick = () => {};
    handleRestart = () => {
        this.setState({ timer: 11, timeOut: false, wrongAnswer: "" });
        this.startTimeOut();
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    };
    componentDidMount() {
        this.randomTenseFunction();
        this.startTimeOut();
    }
    startTimeOut = () => {
        this.timeOut = setTimeout(() => {
            this.setState({ timeOut: true });
        }, 11000);
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            this.setState({ timer: this.state.timer - 1 });
        }, 1000);
    };

    randomTenseFunction = async () => {
        const TenseArray = ["simple", "past"];
        const randomTenseValue = await TenseArray[
            Math.floor(Math.random() * TenseArray.length)
        ];
        console.log(randomTenseValue);
        this.setState({ randomTense: randomTenseValue });
    };
    checkMatched = () => {
        const { randomTense, round, value, wrongAnswers } = this.state;
        if (
            (randomTense === "simple"
                ? level1[round].simple
                : level1[round].past) === value
        ) {
            this.setState(
                { round: round + 1, timer: 11, wrongAnswer: "" },
                () => {
                    this.randomTenseFunction();
                    clearTimeout(this.timeOut);
                    this.timeOut = setTimeout(() => {
                        this.setState({ timeOut: true });
                    }, 11000);
                }
            );
        } else {
            this.setState(
                {
                    wrongAnswer:
                        randomTense === "simple"
                            ? level1[round].simple
                            : level1[round].past,
                },
                () => {
                    this.setState({
                        round: round + 1,
                        timer: 11,
                        wrongAnswers: wrongAnswers.concat(level1[round].voca),
                    });
                    this.randomTenseFunction();
                    clearTimeout(this.timeOut);
                    this.timeOut = setTimeout(() => {
                        this.setState({ timeOut: true });
                    }, 11000);
                }
            );
        }
    };
    handleRedirect = () => {
        setTimeout(() => {
            window.location.reload();
        }, 11);
    };
    handleSubmit = (event) => {
        const { timeOut, value } = this.state;
        event.preventDefault();
        if (timeOut) return alert("Please click restart");

        if (!value.trim()) return alert("Please type something");

        this.setState({ value: "", wrongAnswer: "" });
        this.checkMatched();
    };
    render() {
        const {
            value,
            timeOut,
            round,
            timer,
            randomTense,
            wrongAnswer,
            wrongAnswers,
        } = this.state;
        if (timeOut)
            return (
                <Redirect to={{ pathname: "/GameOver", state: { id: "/" } }} />
            );
        else
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
                    {round < level1.length ? (
                        <>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h1>Quiz Game</h1>
                                <Clock time={timer - 1} />
                            </div>
                            <Progress
                                percent={(round / level1.length) * 100}
                                status='active'
                            />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <h2>LEVEL 1</h2>
                                <h2> {round}</h2>
                            </div>

                            <span style={{ marginBottom: 0, color: "grey" }}>
                                {" "}
                                Infinitive
                            </span>
                            <h2>{level1[round].voca}</h2>
                            <div style={{ fontSize: "1rem" }}>
                                Answer the voca's{" "}
                                <span style={{ color: "red" }}>
                                    {randomTense === "simple"
                                        ? "simple past"
                                        : "past participle"}
                                </span>
                            </div>
                            <form style={{ padding: "1rem 0" }}>
                                <div style={{ display: "flex" }}>
                                    <Input
                                        name='value'
                                        id='voca'
                                        type='text'
                                        value={value}
                                        onChange={this.handleChange}
                                    />
                                    <Button
                                        type='submit'
                                        onClick={this.handleSubmit}
                                        className
                                    >
                                        {" "}
                                        Submit{" "}
                                    </Button>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Button
                                        className={`${
                                            timer <= 8
                                        } && 'disabled'`}
                                        maxWidth='20%'
                                    >
                                        5
                                    </Button>
                                    <Button
                                        className={`${timer <= 6} && 'disabled`}
                                    >
                                        4
                                    </Button>
                                    <Button
                                        className={`${timer <= 4} && 'disabled`}
                                    >
                                        3
                                    </Button>
                                    <Button
                                        className={`${timer <= 2} && 'disabled`}
                                    >
                                        2
                                    </Button>
                                    <Button
                                        className={`${timer <= 0} && 'disabled`}
                                    >
                                        1
                                    </Button>
                                    <Button
                                        onClick={this.handleRestart}
                                        style={{
                                            display: timeOut ? "block" : "none",
                                        }}
                                    >
                                        Click to Restart!
                                    </Button>
                                </div>
                                {wrongAnswer && (
                                    <>
                                        <Divider />
                                        <h3> Wrong ! Correct Answer: </h3>
                                        <div>
                                            <li style={{ display: "block" }}>
                                                <p>{wrongAnswer}</p>
                                            </li>
                                        </div>
                                    </>
                                )}
                            </form>
                        </>
                    ) : (
                        <>
                            <h1> Reviews the wrong answers</h1>
                            {wrongAnswers.map((answer, index) => {
                                return (
                                    <div key={index}>
                                        <ul>
                                            <li>{answer}</li>
                                        </ul>
                                    </div>
                                );
                            })}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                }}
                            >
                                <Button onClick={this.handleRedirect}>
                                    Retry
                                </Button>
                                <Button>
                                    <Link to='/test2'>Level2</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            );
    }
}
