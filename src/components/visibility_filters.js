import React from 'react';
import FilterLink from '../containers/filter_link';

const VisibilityFilter = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="romance">
      Romance
    </FilterLink>
    {", "}
    <FilterLink filter="family">
      Family
    </FilterLink>
    {", "}
    <FilterLink filter="friends">
      Friends
    </FilterLink>
    {", "}
    <FilterLink filter="career">
      Career
    </FilterLink>
  </p>
)


export default VisibilityFilter;
