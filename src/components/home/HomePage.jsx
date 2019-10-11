import React from "react";
import Intro from "./Intro";
import Description from "./Description";
import ScrollToTopOnMount from "../common/ScrollToTopOnMount";

const HomePage = () => (
    <React.Fragment>
        <ScrollToTopOnMount />
        <Intro />
        <Description />
    </React.Fragment>
)

export default HomePage;
