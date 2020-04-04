import React from 'react';

import { Header } from "semantic-ui-react";

import styles from "./PageHeader.module.css";

export default function PageHeader({ name }) {
    return (
        <div className={styles.pageHeaderContainer} >
            <Header as='h1' textAlign="center" className={styles.pageHeader} icon>
                {name}
            </Header>
        </div>
    )
}
