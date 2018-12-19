import React from 'react';

//Load images based off their VoteValue descending
const UpvotedImages = (props) => {
  const newList = props.data.sort((a, b) => b.votevalue - a.votevalue)

  return (
    <div className='upvoted-image-column'>
      {newList.map(item => {

        return (
          <div className='fancy-border'>
            <img className='upvoted-image' key={item.id} src={item.image} />
            <div className='button-row'>
              <button
                onClick={() => {
                  props.handleClick(item.id);
                }
                }>
                <i class="fas fa-arrow-up"></i>
              </button>
              {item.votevalue}
              <button
                onClick={() => {
                  props.downClick(item.id);
                }
                }>
                <i class="fas fa-arrow-down"></i>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UpvotedImages