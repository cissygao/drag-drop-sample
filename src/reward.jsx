import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.isDragging ? 'lightgreen' : 'white'};

  display: flex;
`
const Clone = styled(Container)`
  + div {
    display: none!important;
  }
`

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.reward.id} index={this.props.index}>
        {(provided, snapshot) => (
          <React.Fragment>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              {this.props.reward.content}
            </Container>
            {this.props.clonable && snapshot.isDragging && (
			        <Clone>{this.props.reward.content}</Clone>
		        )}
          </React.Fragment>
        )}
      </Draggable>
    )
  }
}
