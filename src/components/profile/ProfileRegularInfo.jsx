import React, { Component } from 'react';
import { Header, Segment, Divider, Dimmer, Image, Button, Icon, Input, Modal, Grid } from 'semantic-ui-react';
import { connect } from "react-redux";
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
        imageService.profilePicUpload(image).then(({ id, image, thumbnail }) => {
            this.setState({
                propicUrl: thumbnail,
                propicId: id
            });
        });
    }

    cancelPropicChange = () => {
        this.setState({
            propicUrl: "",
            propicId: null,
            proPicEditable: false,
        })
    }

    confirmPropicChange = () => {
        const { propicId } = this.state;

        if (propicId) {
            this.props.updatePropic(propicId);
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
            specializedEditable,
            softwareSkillEditable
        } = this.state;

        const { own } = this.props;
        const { username, email, date_joined } = this.props.profileUserDetails;
        const { avatar } = this.props.profileDetails;
        let formattedJoinDate = moment(date_joined).format("MMM Do YYYY")

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
                        {this.props.profileDetails.bio || "Hello World!"}
                        {own &&
                            <span onClick={this.handleBioPenClick}>
                                <Icon name="pencil alternate" />
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
                    <Grid columns={2}>
                        <Grid.Row className={styles.textRow}>
                            <Grid.Column textAlign="left" >Email:</Grid.Column>
                            <Grid.Column textAlign="right">{email || "No email"}</Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign="left">Member Since:</Grid.Column>
                            <Grid.Column textAlign="right">{formattedJoinDate}</Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider />
                </Segment>

                <Segment>
                    <Header as="h3" dividing content="Your Badges" />
                    <p>No badges yet</p>

                </Segment>

                <Segment>
                    <Skills own={own} />
                </Segment>
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
        updatePropic: (propicId) => dispatch(profileActions.updatePropic(propicId)),
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProfileRegularInfo);