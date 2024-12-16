import React from 'react'
import style from '../../Style/Pages/loader.module.scss'
const Loader = () => {
  return (
    <div className={style.loaderMain}>
        <div className={style.loader}>
  <svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50"></circle>
  </svg>
  <svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50"></circle>
  </svg>
  <svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50"></circle>
  </svg>
</div>
    </div>
  )
}

export default Loader