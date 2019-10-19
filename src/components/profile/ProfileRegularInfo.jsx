import React, { Component } from 'react';
import { Header, Segment, Divider, Dimmer, Image, Button, Icon, Input, Modal, } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { profileActions } from "../../_actions";
import { imageService } from "../../_services";

import ImageDragNDrop from "../common/ImageDragnDrop";
import Skills from "./Skills";

import styles from "./ProfileRegularInfo.module.css";

class ProfileRegularInfo extends Component {
    state = {
        bio: "",
        propicUrl: "",
        propicId: null,
        editBio: false,
        proPicEditable: false,
        propic: {}
    }

    handleDimmerShow = () => {
        this.setState({ profileDimmerActive: true })
    }
    handleDimmerHide = () => {
        this.setState({ profileDimmerActive: false })
    }

    handleBioPenClick = () => {
        this.setState({ editBio: !this.state.editBio });
    }

    handleBioEdit = (e) => {
        const { value } = e.target;
        this.setState({ bio: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateBio(this.state.bio);

        this.setState({
            bio: "",
            editBio: !this.state.editBio
        });
    }

    enableProPicEdit = () => {
        this.setState({ proPicEditable: true });
    }

    disableProPicEdit = () => {
        this.setState({ proPicEditable: false });
    }

    handlePropicUpload = (image) => {
        imageService.profilePicUpload(image).then((propic) => {
            this.setState({
                propicUrl: propic.thumbnail,
                propicId: propic.id,
                propic: propic
            });
        });
    }

    cancelPropicChange = () => {
        this.setState({
            propicUrl: "",
            propicId: null,
            proPicEditable: false,
            propic: {},
        })
    }

    confirmPropicChange = () => {
        const { propicId, propic } = this.state;

        if (propicId) {
            this.props.updatePropic(propicId, propic);
        }

        this.setState({
            propicUrl: "",
            propicId: null,
            proPicEditable: false,
        })
    }


    render() {
        const {
            profileDimmerActive,
            editBio,
            proPicEditable,
        } = this.state;

        const { own } = this.props;
        const { username, email, date_joined } = this.props.profileUserDetails;
        const { avatar } = this.props.profileDetails;
        let formattedJoinDate = moment(date_joined).format("MMM D, YYYY")

        const profileImageDimmerContent = (
            <div>
                <Button primary size="tiny" onClick={this.enableProPicEdit}>Change</Button>
            </div>
        );

        let avatarThumbnailUrl = '/Logo.png';
        if (avatar) avatarThumbnailUrl = avatar.thumbnail;

        return (
            <div>
                <Segment textAlign="center">

                    {own ? <Dimmer.Dimmable
                        as={Image}
                        dimmed={profileDimmerActive}
                        dimmer={{ active: profileDimmerActive, content: profileImageDimmerContent }}
                        onMouseEnter={this.handleDimmerShow}
                        onMouseLeave={this.handleDimmerHide}
                        src={avatarThumbnailUrl}
                        circular
                        size="small"
                    /> : <Image src={avatarThumbnailUrl} size="small" circular centered />
                    }

                    <Modal size='tiny' open={proPicEditable} onClose={this.disableProPicEdit}>
                        <Modal.Header>Update Profile Photo</Modal.Header>
                        <Modal.Content>
                            <ImageDragNDrop imageChange={this.handlePropicUpload} url={this.state.propicUrl} />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={this.cancelPropicChange}>Cancel</Button>
                            <Button
                                positive
                                onClick={this.confirmPropicChange}
                                icon='checkmark'
                                labelPosition='right'
                                content='Yes'
                            />
                        </Modal.Actions>
                    </Modal>

                    <Header
                        as="h3"
                        className={styles.username}
                        content={username}
                    />

                    <p>
                        {this.props.profileDetails.bio || "Hello World!"} &nbsp;
                        {own &&
                            <span onClick={this.handleBioPenClick}>
                                <Icon circular name="pencil alternate" />
                            </span>
                        }
                    </p>

                    {editBio && <Input
                        icon={{ name: 'angle right', circular: true, link: true, onClick: this.handleSubmit }}
                        value={this.state.bio}
                        onChange={this.handleBioEdit}
                        placeholder='Single line about you..'
                    />}
                    <Divider />

                    <p className={styles.metaInfoContainer}>
                        <b>Email:</b> <span className={styles.rightFloatedText}>{email || "No email"}</span> <br />
                        <b>Member Since:</b> <span className={styles.rightFloatedText}>{formattedJoinDate}</span>
                    </p>
                    <Divider />

                    {own || <Button fluid as={Link} to={`/messages/` + username} color="blue" size="small">MESSAGE</Button>}
                </Segment>

                <Segment>
                    <Header as="h3" dividing content="Badges" />
                    <p>No badges yet</p>
                </Segment>


                <Skills own={own} />

            </div >
        )
    }
}

function mapStateToProps(state) {
    const { profileUserDetails, profileDetails } = state.profile;
    return {
        profileUserDetails,
        profileDetails,
    }
}
function mapDipatchToProps(dispatch) {
    return {
        updateBio: (bio) => dispatch(profileActions.updateBio(bio)),
        updatePropic: (propicId, propic) => dispatch(profileActions.updatePropic(propicId, propic)),
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProfileRegularInfo);