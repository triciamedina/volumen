import React from "react";

const defaultState = {
    industry: null,
    onIndustryChange: () => {}
}

const IndustryContext = React.createContext(defaultState);

class IndustryProvider extends React.Component {
    state = {
        industry: null
    }

    onIndustryChange = (val) => {
        localStorage.setItem("industry", JSON.stringify(val));
        this.setState({ industry: val });
    }

    componentDidMount() {
        const selectedIndustry = JSON.parse(localStorage.getItem("industry"));
        if (selectedIndustry) {
            this.setState({ industry: selectedIndustry });
        }
    }

    render() {
        const { children } = this.props;
        const { industry } = this.state;

        return (
            <IndustryContext.Provider
                value = {{ industry, onIndustryChange: this.onIndustryChange }}
            >
                {children}
            </IndustryContext.Provider>
        )
    }
}

export default IndustryContext;

export { IndustryProvider };