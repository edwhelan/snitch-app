import React, { Component } from 'react';



//Import children components
import UpvotedImages from './UpvotedImages';
import DownvotedImages from './DownvotedImages';
import NewImages from './NewImages';

class ImageColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
  }
  //load image data from backend and display in column format
  componentDidMount() {
    console.log('fetching data')
    const getAllData = () => {
      fetch(`/api/getList`)
        .then(r => {
          return (r.json())
        }).then(data => {
          data.filter(item => {
            return this.state.list.filter(i => {
              return i.id === item.id
            }).length === 0
          })
            .map(item => {
              this.setState({
                list: [...this.state.list, item]
              })
            })
          data.filter(item => {
            return this.state.list.filter(i => {
              return i.id === item.id
            }).length !== 0
          }).forEach(item => {
            this.setState({
              list: this.state.list.map(i => {
                if (i.id === item.id) {
                  return item;
                } else {
                  return i
                }
              })
            })
          })
        })
    }

    this.interval = setInterval(() => getAllData(), 10000);
  }

  render() {
    return (
      <div className='image-container'>
        <NewImages data={this.state.list} />
        <UpvotedImages handleClick={this._upvoteImage} data={this.state.list} />
        <DownvotedImages data={this.state.list} />
      </div>

    )
  }
  _upvoteImage = (id) => {
    console.log(`the child said it was ${id}`)
  }

}

export default ImageColumns;