import React, { Component } from 'react';
import { Header, Segment, Divider, Dimmer, Image, Button, Icon, Input, Modal } from 'semantic-ui-react';
import { connect } from "react-redux";

import { profileActions } from "../../_actions";
import { imageService } from "../../_services";

import ImageDragNDrop from "../ImageDragnDrop";

class ProfileRegularInfo extends Component {
    state = {
        bio: "",
        propicUrl: "",
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
        imageService.profilePicUpload(image).then(({ image, thumbnail }) => {
            this.setState({
                propicUrl: thumbnail
            });
        });
    }

    cancelPropicChange = () => {
        this.setState({
            propicUrl: "",
            proPicEditable: false,
        })
    }

    confirmPropicChange = () => {
        const { propicUrl } = this.state;

        if (propicUrl) {
            this.props.updatePropic(propicUrl);
        }

        this.setState({
            propicUrl: "",
            proPicEditable: false,
        })
    }

    render() {
        const { profileDimmerActive, editBio, proPicEditable } = this.state;
        const { own } = this.props;
        const { username, email, date_joined } = this.props.profileUserDetails;
        const { profile_picture } = this.props.profileDetails;

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let d = new Date(date_joined);
        let join_month = monthNames[d.getMonth()];
        let join_year = d.getFullYear();

        const profileImageDimmerContent = (
            <div>
                <Button primary size="tiny" onClick={this.enableProPicEdit}>Change</Button>
            </div>

        );

        return (
            <div>
                <Segment textAlign="center">

                    {own ? <Dimmer.Dimmable
                        as={Image}
                        dimmed={profileDimmerActive}
                        dimmer={{ active: profileDimmerActive, content: profileImageDimmerContent }}
                        onMouseEnter={this.handleDimmerShow}
                        onMouseLeave={this.handleDimmerHide}
                        src={profile_picture || '/Logo.png'}
                        circular
                        size="small"
                    /> : <Image src={profile_picture || '/Logo.png'} size="small" circular centered />
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
                        content={username}
                    />

                    <p>
                        {this.props.profileDetails.bio || "Hello World!"}
                        {own &&
                            <span onClick={this.handleBioPenClick}>
                                <Icon name="pencil alternate" />
                            </span>}
                    </p>

                    {editBio && <Input
                        icon={{ name: 'angle right', circular: true, link: true, onClick: this.handleSubmit }}
                        value={this.state.bio}
                        onChange={this.handleBioEdit}
                        placeholder='Single line about you..'
                    />}

                    <Divider />

                    <div style={{ textAlign: "left" }}>
                        <p>Email: {email || "No email"}</p>
                        <p>Member Since: {join_month} {join_year}</p>
                    </div>

                    <Divider />
                </Segment>

                <Segment>
                    <Header as="h3" dividing content="Your Badges" />
                    <p>No badges yet</p>

                </Segment>

                <Segment>
                    <Header as="h3" dividing content="Specialized in" />
                    <p>No specialties added</p>
                    <Header as="h3" dividing content="Software Skills" />
                    <p>No skills added</p>
                </Segment>
            </div>
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
        updatePropic: (propicUrl) => dispatch(profileActions.updatePropic(propicUrl)),
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(ProfileRegularInfo);