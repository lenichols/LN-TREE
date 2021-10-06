import React, { useContext, useState } from 'react';
import './SidePanel.scss';
import { DirectoryContext } from './../../App';
import Icons from './../../assets/icons/index';
import PanelListItems from './PanelItems/PanelListItems';

const SidePanel = () => {
  
  const { itemToDelete }  = useContext(DirectoryContext);
  const { listings }  = useContext(DirectoryContext);
  const [ getListings ] = listings;
  const [ toggleState, setToggleState ] = useState([]);
  
  const listContents = [getListings].map((item, index) => {
    return <div key={index} >
        {item.name ? (<div className="Project--name">{ item.name }</div>) : null }
        {item.children ? (<div className='Panel--items'>
            {item.children.map((child, cindex) => {
              return <div key={cindex} className='Top-level--item' >
              {child.type === 'folder' && toggleState.includes(cindex) === true ? (
                <ul className="Inner-Items--pane">{child.children.map((childitem, childindex) => <PanelListItems key={childitem.id} item={childitem} itemindex={childindex} />)}</ul>) : <PanelListItems key={child.id} item={child} itemindex={child.id} />
              }</div>
            })}</div>
        ) : null } </div>
  })

  return (
    <div className="App--columns">
      {listContents}
    </div>
  )
}

export default SidePanel
