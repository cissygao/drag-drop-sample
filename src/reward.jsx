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
  justify-content: space-between;
`

const Button = styled.button`
  border: none;
  color: red;
  background-color: white;

  display: flex;
  justify-content: flex-end;
`;


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
              {this.props.removable ?
                <Button
                  onClick={() => {
                    console.log(`need remove ${this.props.reward.id} from ${this.props.category}`)
                    this.props.onRemoveReward(this.props.category, this.props.index)
                  }}
                >
                  X
                </Button> : null
              }
            </Container>
          </React.Fragment>
        )}
      </Draggable>
    )
  }
}
