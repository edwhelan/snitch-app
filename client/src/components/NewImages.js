import React from 'react';

const NewImages = (props) => {
  const newImages = props.data.sort((a, b) => a.id - b.id);

  return (
    <div className='upvoted-image-column'>
      {newImages.map(item => {
        return (
          <div>
            <img className='upvoted-image' key={item.id} src={item.image} />
            <button
              onClick={() => {
                props.handleClick(item.id);
              }
              }>
              <i class="fas fa-arrow-up"></i>
            </button>
            {item.votevalue} <i class="fas fa-arrow-down"></i>
          </div>
        )
      })}
    </div>
  )
}

export default NewImages;