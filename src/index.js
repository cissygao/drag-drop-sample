import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './column'

const Container = styled.div`
  display: flex;
`

class App extends Component {
  state = initialData

  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newRewardIds = Array.from(start.rewardIds)
      newRewardIds.splice(source.index, 1)
      newRewardIds.splice(destination.index, 0, draggableId)
  
      const newColumn = {
        ...start,
        rewardIds: newRewardIds
      }
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        }
      }
  
      this.setState(newState)
    } else {
      const startRewardIds = Array.from(start.rewardIds)

      if (source.droppableId !== 'category-0') {
        startRewardIds.splice(source.index, 1)
      }

      const newStart = {
        ...start,
        rewardIds: startRewardIds,
      }

      const finishRewardIds = Array.from(finish.rewardIds)
      finishRewardIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        rewardIds: finishRewardIds,
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        }
      }

      this.setState(newState)
    }
    return
  }

  onDragStart = start => {
    // TODO
  }
  
  onDragUpdate = update => {
    // TODO
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId]
            const rewards = column.rewardIds.map(rewardId => this.state.rewards[rewardId])

            return <Column key={column.id} column={column} rewards={rewards} />
          })}
        </Container>
      </DragDropContext>
    )
  }
}
  

ReactDOM.render(<App />, document.getElementById('root'));
