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
      // do nothing
    } else {
      const startRewardIds = Array.from(start.rewardIds)

      if (source.droppableId !== 'category-0') {
        startRewardIds.splice(source.index, 1)
      }

      const newStart = {
        ...start,
        rewardIds: startRewardIds,
      }

      const rewardId = draggableId.split('-')[1]
      if (source.droppableId === 'category-0') {
        let clones = this.state.rewards[draggableId].clones
        const newCloneId = clones.length > 0 ? Math.max(...clones) + 1 : 1
        clones.push(newCloneId)
        const newRewardId = `reward-${rewardId}-${newCloneId}`

        const finishRewardIds = Array.from(finish.rewardIds)
        finishRewardIds.splice(destination.index, 0, newRewardId)
        const newFinish = {
          ...finish,
          rewardIds: finishRewardIds,
        }
        const newState = {
          ...this.state,
          rewards: {
            ...this.state.rewards,
            [draggableId]: {
              ...this.state.rewards[draggableId],
              clones,
            },
            [newRewardId]: {
              id: newRewardId,
              content: this.state.rewards[draggableId].content
            }
          },
          columns: {
            ...this.state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          }
        }

        this.setState(newState)
      } else {
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
    }
    return
  }

  onDragStart = start => {
    // TODO
  }
  
  onDragUpdate = update => {
    // TODO
  }

  onRemoveReward = (category, index) => {
    const current = this.state.columns[category]
    const currentRewardIds = Array.from(current.rewardIds)
    currentRewardIds.splice(index, 1)
    const newCurrent = {
      ...current,
      rewardIds: currentRewardIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [category]: newCurrent
      }
    }

    this.setState(newState)
    return
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

            return <Column key={column.id} column={column} rewards={rewards} onRemoveReward={this.onRemoveReward} />
          })}
        </Container>
      </DragDropContext>
    )
  }
}
  

ReactDOM.render(<App />, document.getElementById('root'));
