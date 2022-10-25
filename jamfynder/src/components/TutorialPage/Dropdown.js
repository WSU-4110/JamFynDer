import React from 'react';

const Dropdown = props => {    

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }    

    return (
        <div >     
                 
            <select value={props.selectedValue} onChange={dropdownChanged}>
                
                {props.options.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>)}
            </select>            
        </div>
    );
}

export default Dropdown;