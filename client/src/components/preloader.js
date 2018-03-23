import React from 'react'
import './preloader.css'
export default () => {
  return (
    <div className="col-sm-6 col-xs-12 col-md-6 offset-md-1">
      <div className="tweet-section">
        <div className="spinner">
          <i className="fa fa-circle-o-notch fa-spin" />
        </div>
      </div>
    </div>
  )
}
