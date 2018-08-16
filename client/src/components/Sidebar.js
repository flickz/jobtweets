import React from 'react'
import './styles/sidebar.css'
import {categoriesData} from '../util/categories'

export default ({onCheck}) => {
  const categories = categoriesData.map((category, index) => {
    return (
      <div key={index} className="form-check">
        <label className="form-check-label">
          <input className="form-check-input" onChange={(e) => onCheck(category.acronym)} name={category.acronym} type="checkbox" value="" />
          {category.fullMeaning}
        </label>
      </div>
    )
  })

  return (
    <div className="col-sm-4 col-xs-12 col-md-4">
      <aside className="filter-sidebar">
        <p>Filter</p>
        <form className="filter-form" action="">
          {categories}
        </form>
      </aside>
    </div>
  )
}
