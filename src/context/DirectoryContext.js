import React from "react";

const defaultState = {
    industry: null,
    category: null,
    onIndustryChange: () => {},
    onCategoryChange: () => {}
}

const DirectoryContext = React.createContext(defaultState);

class DirectoryContextProvider extends React.Component {
    state = {
        industry: null,
        category: null
    }

    onIndustryChange = (val) => {
        localStorage.setItem("industry", JSON.stringify(val));
        this.setState({ industry: val });
    }

    onCategoryChange = (val) => {
        localStorage.setItem("category", JSON.stringify(val));
        this.setState({ category: val });
    }

    componentDidMount() {
        const selectedIndustry = JSON.parse(localStorage.getItem("industry"));
        const selectedCategory = JSON.parse(localStorage.getItem("category"));
        if (selectedIndustry) {
            this.setState({ industry: selectedIndustry });
        }
        if (selectedCategory) {
            this.setState({ category: selectedCategory });
        }
    }

    render() {
        const { children } = this.props;
        const { industry, category } = this.state;

        return (
            <DirectoryContext.Provider
                value = {{ industry, category, onIndustryChange: this.onIndustryChange, onCategoryChange: this.onCategoryChange }}
            >
                {children}
            </DirectoryContext.Provider>
        )
    }
}

export default DirectoryContext;

export { DirectoryContextProvider };