import React from 'react';

//Load images based off their VoteValue descending
const DownvotedImages = (props) => {
  const newList = props.data.sort((a, b) => a.votevalue - b.votevalue)

  return (
    <div className='upvoted-image-column'>
      {newList.map(item => {
        return <img className='upvoted-image' key={item.id} src={item.image} />
      })}
    </div>
  )
}

export default DownvotedImages