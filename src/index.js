import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            tags: "",
            content: "",
            data: [],
            display: []
        };
    }

    reloadData = () => {
        fetch("/notes").then(res => res.json())
        .then(data => this.setState({data}));
    }

    componentDidMount() {
        this.reloadData();
    }
    componentDidUpdate() {}

    handleSubmit = e => {
        e.preventDefault();

        fetch(
            "/notes",
            {
                method: "post",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(this.state)
            }
        ).then(res => res.json()).then(data => {
            if (data.msg) {
                this.setState({
                    title: "",
                    tags: "",
                    content: ""
                });
                this.reloadData();
            } else { alert("An error occurred"); }
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    searchDataSet = e => {
        let terms = e.target.value.toLowerCase();

        if (terms == "") {
            this.setState({ display: [] });
            return;
        }

        let regex = "";

        terms.split(" ").forEach(
            word => {
                regex += `(?=.*${word})`;
            }
        );

        let display = this.state.data.filter(entry => {
            let line = `${entry.title} ${entry.tags} ${entry.content}`;
            return line.toLowerCase().match(regex);
        });

        this.setState({display});
    }

    render() {

        const results = line => {
            return (
                <div>
                    <h4>{line.title}</h4>
                    <p>{line.content}</p>
                </div>
            );
        };

        return (
            <div>
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

            <input type="text" name="search" onChange={this.searchDataSet} />
                            
            {this.state.display.map(results)}
            </div>
        );
    }
}

const element = (
    <div>
        <App />
    </div>
);

ReactDOM.render(element, document.getElementById("root"));