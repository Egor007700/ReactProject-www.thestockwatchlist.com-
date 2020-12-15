import Select, { components } from "react-select";
import React, { useLayoutEffect, useState, useEffect }  from 'react';

const CustomSelect = (props) => {
    const { type, options, defaultValue, onChange ,...rest } = props;
    const customStyles = {
        control: (base, state) => {
            const { menuIsOpen } = state.selectProps;
            const { isFocused } = state
            const border_str = menuIsOpen ? '2px solid #214d9a' : '2px solid #0f1e35';
            const borderRadius = menuIsOpen ? { borderTopLeftRadius : 10} : {};
            return {
            ...base,
            boxShadow: 'none',
            background: "#0f1e35",
            color: '#354964',
            height: '30px',
            // height: '100%',
            minHeight: '26px',            
            padding: 0,
            paddingBottom: 1,
            '&:hover': {borderLeft: menuIsOpen ? '2px solid #214d9a' : '2px solid #0f1e35', 
                borderTop: menuIsOpen ? '2px solid #214d9a' : '2px solid #0f1e35', 
                borderRight: menuIsOpen ? '2px solid #214d9a' : '2px solid #0f1e35', 
                borderBottom: '0px solid #0f1e35'
            },
            //border: state.selectProps.menuIsOpen ? '1px solid lightgray' : '' // default border color
            borderLeft: border_str,
            borderBottom: '0px solid #0f1e35',
            borderTop: border_str,
            borderRight: border_str,
            borderTopLeftRadius : menuIsOpen ? 10 : 0,
            borderTopRightRadius: menuIsOpen ? 10 : 0,
            }
          },
          singleValue: base => ({
            ...base,
            color: "#8eb4df",
            fontSize: 11,
            fontFamily: 'Roboto-Regular'
          }),
          dropdownIndicator: base => ({
            ...base,
            color: "#8eb4df",
            height: '26px',
            minHeight: '26px',     
            padding: 0,
            display: 'flex',
            paddingRight: '3px',
            alignItems: 'center'
          }),
          menu: base => ({
            ...base,
            // override border radius to match the box
            background: '#0f1e35',
            color: "#8eb4df",
            fontSize: 11,
            fontFamily: 'Roboto-Regular',
            marginBottom: 0,
            marginTop: 0,
            borderLeft: '2px solid #0f1e35',
            borderLeft: '2px solid #214d9a',
            borderBottom: '2px solid #214d9a',
            borderRight: '2px solid #214d9a',
            borderBottomLeftRadius : 10, borderBottomRightRadius: 10
          }),
          menuList: base => ({
              ...base,
              padding: 0,
              
          }),
          input: base => ({
            ...base,
            color: "#8eb4df",
            fontSize: 11,
            fontFamily: 'Roboto-Regular',
          })
        // option: (provided, state) => ({
        //   ...provided,
        //   borderBottom: '1px dotted pink',
        //   color: state.isSelected ? 'red' : 'blue',
        //   padding: 10,
        // }),
        // control: () => ({
        //   // none of react-select's styles are passed to <Control />
        //   //width: 100,
        // }),
        // singleValue: (provided, state) => {
        //   const opacity = state.isDisabled ? 0.5 : 1;
        //   const transition = 'opacity 300ms';
        //   return { ...provided, opacity, transition };
        // }
    };
    return (<Select options={options} 
        onChange={onChange}
        components={{
        IndicatorSeparator: () => null
        }} styles={customStyles}
        defaultValue={options[0]}
        isSearchable ={false}
        theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
            ...theme.colors,
              text: 'red',
              primary25: 'transparent',
              primary: '#15244c',
            },
          })}
      />);
};

export default CustomSelect;