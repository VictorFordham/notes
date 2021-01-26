import React from "react";
import ReactDOM from "react-dom";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

/*
    Unfortunately this doesn't play well with form submit
    not really a problem but just wanted to play with it
    not going to remove it from the package dependencies yet ;)
*/

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            tags: "",
            content: ""
        };
    }

    componentDidMount() {}
    componentDidUpdate() {}

    handleSubmit = e => {
        console.log(this.state);

        fetch(
            "/notes",
            {
                method: "post",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(this.state)
            }
        ).then(res => console.log(res.text));
        e.preventDefault();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" onChange={this.handleChange} />
                </label>
                <label>
                    Tags:
                    <input type="text" name="tags" onChange={this.handleChange} />
                </label>
                <label>
                    Text:
                    <textarea name="content" rows="4" cols="50" onChange={this.handleChange} ></textarea>
                </label>
                <input type="submit" name="submit" />
            </form>
        );
    }
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        //this.state = 
    }

    compoentDidMount() {}
    componentDidUpdate() {}

    render() {

    }
}

const NavBar = props => {
    return (
        <nav>

        </nav>
    )
};

const element = (
    <div>
        <Form />
    </div>
);

ReactDOM.render(element, document.getElementById("root"));