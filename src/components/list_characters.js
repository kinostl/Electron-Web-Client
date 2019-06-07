import React from 'react'
import PouchDB from 'pouchdb-browser'
let characters = new PouchDB('characters')

class ListCharacters extends React.Component{
  constructor(){
    super()
    this.state={characters:[]}
  }

  componentDidMount(){
    let self=this
    characters.allDocs({include_docs:true}).then(function(results){
      self.setState({characters:results.rows})
    }).catch(function(err){
      console.log("Error getting characters: ", err)
    })
  }

  render(){
    const characters = []

    for(let row of this.state.characters){
      let character = row['doc']
      characters.push(<li key={character['_id']}>{character['name']}</li>)
    }

    return (
      <ul>
        {characters}
      </ul>
    )
  }
}

export default ListCharacters;
