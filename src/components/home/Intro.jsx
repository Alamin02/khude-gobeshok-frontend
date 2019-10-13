import React from 'react';
import { Container, Image, Button, Responsive } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Particles from 'react-particles-js';
import Typist from 'react-typist';

import styles from "./Intro.module.css";
import "react-typist/dist/Typist.css";

const particleParams = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#504848"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#000000",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
}

const MobileIntro = () => (
    <div className={styles.introContainer}>
        <Container fluid textAlign="center">
            <Particles className={styles.particleContainer} params={particleParams} />
            <Image src="/img/khude gobeshok2.png" size="medium" centered />

            <Typist className={styles.introHeaderMobile}>
                <h1 className={styles.introHeaderText}>OpenSource Platform for Tiny Curious Minds</h1>
            </Typist>

            <Link to="/projects">
                <Button size="medium" color="blue">EXPLORE</Button>
            </Link>
        </Container>
    </div>
)

const DesktopIntro = () => (
    <div className={styles.introContainer}>
        <Container fluid textAlign="center">
            <Particles className={styles.particleContainer} params={
                particleParams
            } />
            <Image src="/img/khude gobeshok2.png" size="large" centered />

            <Typist className={styles.introHeader}>
                <h1 className={styles.introHeaderText}>OpenSource Platform for Tiny Curious Minds</h1>
            </Typist>
            <Link to="/projects">
                <Button size="big" color="blue">EXPLORE</Button>
            </Link>
        </Container>
    </div>
)

export default function Intro() {
    return (
        <React.Fragment>
            <Responsive {...Responsive.onlyMobile}>
                <MobileIntro />
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <DesktopIntro />
            </Responsive>
        </React.Fragment>
    )
}
