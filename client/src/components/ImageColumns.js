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
        <NewImages handleClick={this._upvoteImage} downClick={this._downvoteImage} data={this.state.list} />
        <UpvotedImages handleClick={this._upvoteImage} downClick={this._downvoteImage} data={this.state.list} />
        <DownvotedImages handleClick={this._upvoteImage} downClick={this._downvoteImage} data={this.state.list} />
      </div>

    )
  }
  // function to pass into components to allow users 
  //to increase vote value by 1 through a POST req
  _upvoteImage = (id) => {
    console.log(`the child said it was ${id}`)
    fetch('/api/upvoteimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  }
  // function to pass into components to allow users 
  //to decrease vote value by 1 through a POST req
  _downvoteImage = (id) => {
    console.log(`the child said it was ${id}`)
    fetch('/api/downvoteimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  }

}

export default ImageColumns;