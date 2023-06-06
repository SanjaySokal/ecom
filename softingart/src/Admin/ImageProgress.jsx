import React from 'react'

const ImageProgress = (props) => <div className='upload-image'><div className="progress" style={{ width: (props.progress + "%"), background: props.color }}>{props.progress}%</div></div>

export default ImageProgress
