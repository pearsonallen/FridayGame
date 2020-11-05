import React from 'react';

class ListScreen extends React.Component {
  state = {};

  render() {
    return (
      <div className="ListScreen">
        {
          this.props.lists
            .map((list) => 
              <ul className='listScreenList'> {
                list.map((listItem) => <li>{listItem}</li>)
                } </ul>
            )
        }
      </div>
    )
  }
}

export default ListScreen;