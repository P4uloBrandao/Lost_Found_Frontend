import React from 'react';
import CreateDeleteCategoryComponent from './CreateDeleteCategoryComponent/index';
 import CreateDeleteSubCategoryComponent from './CreateDeleteSubCategoryComponent/index';
import CreateDeleteSubSubCategoryComponent from './CreateDeleteSubSubCategoryComponent/index';

const ParentComponent = () => {
  return (
    <div>
      <h1>Add  or delete Categories</h1>
      <CreateDeleteCategoryComponent />
      <h1>Add  or delete Sub Categories</h1>
       <CreateDeleteSubCategoryComponent />
       <h1>Add  or delete Sub Categories labels</h1>
      <CreateDeleteSubSubCategoryComponent /> 
    </div>
  );
};

export default ParentComponent;
