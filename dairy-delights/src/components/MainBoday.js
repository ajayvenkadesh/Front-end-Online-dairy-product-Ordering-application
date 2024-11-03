//MainBoday

import * as React from 'react';

import ItemList from "./ItemList";

export default function MainBoday({ allData}) {
  

  return (
    <section className="MainBody">
      
      
      <section className="itemCss">
        <ItemList Dairydata={allData}/>
      </section>
    </section>
  );
}
