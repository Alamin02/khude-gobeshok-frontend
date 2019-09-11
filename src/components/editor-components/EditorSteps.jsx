import React from 'react'
import { Step, Icon } from 'semantic-ui-react'

export default function EditorSteps({ currentStep }) {
    return (
        <Step.Group widths={3} unstackable>
            <Step active={currentStep === 1}>
                <Icon name='info circle' />
                <Step.Content>
                    <Step.Title>Basics</Step.Title>
                    <Step.Description>Info of Project</Step.Description>
                </Step.Content>
            </Step>
            <Step active={currentStep === 2}>
                <Icon name='edit' />
                <Step.Content>
                    <Step.Title>Details</Step.Title>
                    <Step.Description>Project Draft</Step.Description>
                </Step.Content>
            </Step>
            <Step active={currentStep === 3}>
                <Icon name='file alternate' />
                <Step.Content>
                    <Step.Title>Review</Step.Title>
                    <Step.Description>Final Draft</Step.Description>
                </Step.Content>
            </Step>
        </Step.Group>

    )
}
