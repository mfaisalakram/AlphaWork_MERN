import React from 'react'

const Model = ({action,title,content,modelID}) => {
    return (
         
      <div
      className="modal "
      id={modelID}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              style={{ display: "inline-block" }}
              className="modal-title"
              id="exampleModalLabel"
            >
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
              {content}
            
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={action}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>

      

    )
}

export default Model
