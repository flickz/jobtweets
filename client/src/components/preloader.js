import React from 'react';

export default ()=>{
  return(
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s5">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}