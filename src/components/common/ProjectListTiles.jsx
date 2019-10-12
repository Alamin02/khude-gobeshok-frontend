import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import moment from "moment";

const ProjectListTiles = ({ projects, itemsPerRow }) => {
    const projectList = projects.map((project, key) => {
        let relative_time = moment(project.created_at).fromNow();

        return (
            <Card key={key} href={`/projects/` + project.id}>
                <Image src={project.thumbnail} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{project.title}</Card.Header>
                    <Card.Meta>Shared by <i>{project.author}</i> {relative_time} </Card.Meta>
                </Card.Content>
            </Card>
        )
    });

    return (
        <Card.Group itemsPerRow={itemsPerRow} stackable >
            {projectList}
        </Card.Group>
    )
}

export default ProjectListTiles;
