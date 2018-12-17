import React, { Component } from 'react';

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
          console.log(r)
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
    this.interval = setInterval(() => getAllData(), 5000);
  }

  render() {
    return (
      <>
        {/* <UpvotedImages data={this.state.list}/> */}
        <div className='upvoted-image-column'>{this.state.list.map((item, index) => {
          return <img className='upvoted-image' key={index} src={item.image} />
        })}</div>
      </>

    )
  }
}

export default ImageColumns;