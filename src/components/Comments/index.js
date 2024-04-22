import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const commentList = []

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentListItems: commentList,
    likedImageid: '',
  }

  onclickLikebtn = id => {
    this.setState({likedImageid: id})
  }

  updateListItem = id => {
    const {commentListItems} = this.state
    const updateItems = commentListItems.filter(eachItem => eachItem.id !== id)
    this.setState({commentListItems: updateItems})
  }

  onsumbitFormInputs = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialClass =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newList = {
      id: uuidv4(),
      name,
      comment,
      intialColor: initialClass,
      date: new Date(),
    }

    this.setState(prevState => ({
      commentListItems: [...prevState.commentListItems, newList],
      name: '',
      comment: '',
    }))
  }

  onChangeInputName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {name, comment, commentListItems, likedImageid} = this.state

    return (
      <div className="bg-container">
        <div className="comment-input-img-container">
          <div className="comment-input-container">
            <h1 className="header">Comments</h1>
            <p className="title-paragraph">
              Say Something about 4.0 Teachnologies
            </p>
            <form onSubmit={this.onsumbitFormInputs}>
              <input
                className="input"
                onChange={this.onChangeInputName}
                placeholder="Your Name"
                value={name}
              />
              <textarea
                className="input-comments"
                name="postContent"
                rows={9}
                cols={200}
                onChange={this.onChangeComment}
                placeholder="Your Comments"
                value={comment}
              />

              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
        </div>
        <div className="comment-container">
          <div className="commentlength-container">
            <p className="comment-count">{commentListItems.length}</p>
            <p className="comment-head">Comments</p>
          </div>
          <ul className="comment-list-container">
            {commentListItems.map(eachItem => (
              <CommentItem
                commentItemDetails={eachItem}
                key={eachItem.id}
                updateListItem={this.updateListItem}
                onclickLikebtn={this.onclickLikebtn}
                isLike={likedImageid === eachItem.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
