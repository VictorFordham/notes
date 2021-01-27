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
        e.preventDefault();
        console.log(this.state);

        fetch(
            "/notes",
            {
                method: "post",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(this.state)
            }
        ).then(res => res.json()).then(data => {
            if (data.msg)
                this.setState({
                    title: "",
                    tags: "",
                    content: ""
                });
            console.log(data);
        });
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
                    <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                </label>
                <label>
                    Tags:
                    <input type="text" name="tags" onChange={this.handleChange} value={this.state.tags} />
                </label>
                <label>
                    Text:
                    <textarea name="content" rows="4" cols="50" onChange={this.handleChange} value={this.state.content} ></textarea>
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