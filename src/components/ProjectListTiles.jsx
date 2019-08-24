import React from 'react';
import { Card, Image } from 'semantic-ui-react';


const ProjectListTiles = ({ projects }) => {
    const projectList = projects.map((project, key) =>
        <Card key={key} href={`/projects/` + project.id}>
            <Image src={project.thumbnail} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{project.title}</Card.Header>
                <Card.Meta>Author: {project.author}</Card.Meta>
                <Card.Description>Created at: {project.created_at}</Card.Description>
            </Card.Content>
        </Card>
    );
    return (
        <div style={{ paddingTop: "3em" }}>
            <Card.Group centered >
                {projectList}
            </Card.Group>
        </div>
    )
}

export default ProjectListTiles;