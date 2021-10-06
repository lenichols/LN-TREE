import React, { useEffect, useState, createContext } from "react";
import getDirectoryTree from "./api";
import "./App.scss";
import Editor from "./components/Editor/Editor";
import SidePanel from "./components/SidePanel/SidePanel";

// create a state provider using the context api
export const DirectoryContext = createContext({});

export default function App() {
  // create state in react to store reacts direectory tree directory listings
  const [ directoryTreeList, setDirectoryTreeList ] = useState({});

  useEffect(() => {
    // call the api and get the DirectoryTree
    // try to retreieve directory results else catch and log the error
    const callDirectoryList = async () => {
      try {
        await getDirectoryTree.getDirectoryTree().then((listresult, i) => {
          setDirectoryTreeList(listresult)
        })
      } catch (error) {
        console.log(error);
      }
    };
    callDirectoryList();
  }, [directoryTreeList])

  // initiate delete from child context api
  const itemToDelete = async (event, itemId) => {
    event.preventDefault();
    try {
      await getDirectoryTree.deleteById(itemId).then((listresult, i) => {
        setDirectoryTreeList(listresult)
      })
    } catch (error) {
      console.log(error);
    }
  }

  // in the eveent there aree other children to pass state off to
  // useContext state provider
  return (
    <div className="App--items">
      <DirectoryContext.Provider value={{ listings: [ directoryTreeList, setDirectoryTreeList ], itemToDelete }} >
        <SidePanel></SidePanel>
        <Editor></Editor>
      </DirectoryContext.Provider>
    </div>
  );
}
