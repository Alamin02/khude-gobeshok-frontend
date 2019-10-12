import React from 'react';
import { Card, Image } from 'semantic-ui-react';


const ProjectListTiles = ({ projects, itemsPerRow }) => {
    const projectList = projects.map((project, key) =>
        <Card key={key} href={`/projects/` + project.id}>
            <Image src={project.thumbnail} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{project.title}</Card.Header>
                <Card.Meta>Shared by <i>{project.author}</i>  </Card.Meta>
            </Card.Content>
        </Card>
    );

    return (
        <div>
            <Card.Group itemsPerRow={itemsPerRow} stackable >
                {projectList}
            </Card.Group>
        </div>
    )
}

export default ProjectListTiles;
