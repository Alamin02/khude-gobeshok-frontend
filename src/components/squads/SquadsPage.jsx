import React, { Component } from 'react'
import { Header } from "semantic-ui-react";
import { connect } from "react-redux";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import styles from "./SquadsPage.module.css";

import { squadActions } from "../../_actions";

class SquadsPage extends Component {
    constructor(props) {
        super(props);
        this.props.getPeople();
    }
    render() {
        const { people } = this.props;

        return (
            <React.Fragment>
                <ScrollToTopOnMount />
                <div style={{ minHeight: "85vh" }} >
                    <div className={styles.pageHeaderContainer} >
                        <Header as='h1' textAlign="center" className={styles.pageHeader} icon>
                            <Header.Content>Make Squad</Header.Content>
                        </Header>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { people } = state.squad;
    return {
        people,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPeople: () => dispatch(squadActions.getPeople()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquadsPage);
