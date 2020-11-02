import React, {useState} from "react";
import axios from 'axios';

class GetValue extends React.Component {
    constructor() {
        super();
        this.state = {
            GetValue: {}
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API + "/GetSymbols").then(response => {
            console.log(response.data);
            this.setState({
                GetValue: response.data
            });
        });
    }

    

    render() {
        const lists = () => {
            var r = null;
            if (this.state.GetValue.lists != null) {
                r = this.state.GetValue.lists.map(list => {
                return <ul>{renderItems(list)}</ul>
                });
            }
            return r;
            
        }

        const renderItems = (list) => {
            return list.map(item => {
                return <li>{item.value}</li>
            });
        }




    return  lists()
        
    }
}

export default GetValue