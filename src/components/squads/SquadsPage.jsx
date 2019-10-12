import React, { Component } from 'react'
import { Header } from "semantic-ui-react";
import { connect } from "react-redux";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";
import styles from "./SquadsPage.module.css";

class SquadsPage extends Component {
    render() {
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
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquadsPage);
