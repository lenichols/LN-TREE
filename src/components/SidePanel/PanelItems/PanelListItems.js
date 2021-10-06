import React, { useContext, useState } from 'react';
import { DirectoryContext } from './../../../App';
import Icons from './../../../assets/icons/index';

const PanelListItems = ({ item, itemindex }) => {
  // utilizing reacts context api from app.js
  const { itemToDelete }  = useContext(DirectoryContext);
  const [ toggleChildState, setToggleChildState ] = useState([]);

  // save selected dropdowns in array to keep their state
  // remove items to toggle  the  dropdown folders
  const showContainingElements = (event, id) => {
    event.preventDefault();
    if(toggleChildState.includes(itemindex)) {
      const removeitem = toggleChildState.filter((toggleitem) => toggleitem !== id);
      setToggleChildState(removeitem);
    } else {
      setToggleChildState([...toggleChildState, id]);
    }
  }

  // return inner item icons based on file type and text name
  // including the X icon
  return (
    <div className='Line--row' key={itemindex} >
      <div onClick={(event) => showContainingElements(event, item.id)}>
        {item.type === 'folder'  &&  toggleChildState.includes(itemindex) === false ? (
          <Icons.ArrowRight />
        ) : item.type === 'folder'  &&  toggleChildState.includes(itemindex) ? (
          <Icons.ArrowDown />
        ) : item.name.includes('.js') ? (
          <Icons.JsFile />
          ) : item.name.includes('git') ? (
            <Icons.GitFile />
            ) : item.name.includes('.json') ? (
            <Icons.JsonFile />
          ) : item.name.includes('.svg') ? (
          <Icons.ImageFile />
          ) : item.name.includes('.css') ? (
            <Icons.CssFile />
          ) : item.name === 'README.md' ? (
          <Icons.ReadmeFile />
          ) : item.name.includes('.json') ? (
          <Icons.JsonFile />
          ) : item.name === 'yarn.lock' ? (
          <Icons.YarnFile />
          ) : <Icons.DefaultFile />
      }
      {item.name}<span className="Listing--span" onClick={(event) => itemToDelete(event, item.id)}><Icons.X /></span></div>
      {item.type === 'folder' && toggleChildState.includes(itemindex) === true ? (
          <ul className="Inner-Items--pane">
            {item.children.map((childitem, childindex) => <PanelListItems key={childitem.id} item={childitem} itemindex={childitem.id} />)}
          </ul>) : null
        }
    </div>
  )
}

export default PanelListItems
