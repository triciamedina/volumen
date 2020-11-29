import React from "react";

const defaultState = {
    industry: null,
    tag: null,
    onIndustryChange: () => {},
    onTagChange: () => {}
}

const DirectoryContext = React.createContext(defaultState);

class DirectoryContextProvider extends React.Component {
    state = {
        industry: null,
        tag: null
    }

    onIndustryChange = (val) => {
        localStorage.setItem("industry", JSON.stringify(val));
        this.setState({ industry: val });
    }

    onTagChange = (val) => {
        localStorage.setItem("tag", JSON.stringify(val));
        this.setState({ tag: val });
    }

    componentDidMount() {
        const selectedIndustry = JSON.parse(localStorage.getItem("industry"));
        const selectedTag = JSON.parse(localStorage.getItem("tag"));
        if (selectedIndustry) {
            this.setState({ industry: selectedIndustry });
        }
        if (selectedTag) {
            this.setState({ tag: selectedTag });
        }
    }

    render() {
        const { children } = this.props;
        const { industry, tag } = this.state;

        return (
            <DirectoryContext.Provider
                value = {{ industry, tag, onIndustryChange: this.onIndustryChange, onTagChange: this.onTagChange }}
            >
                {children}
            </DirectoryContext.Provider>
        )
    }
}

export default DirectoryContext;

export { DirectoryContextProvider };