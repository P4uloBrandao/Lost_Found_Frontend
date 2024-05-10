import React, { Component } from 'react';
import styled from 'styled-components';

/**EM CONSTRUCAO */

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Adicionando sombra */
  margin: 20vh auto 0; /* Adicionando margem ao redor do menu, auto para centralizar */
`;

const MenuItem = styled.div`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SelectedBar = styled.div`
  position: absolute;
  bottom: 0;
  border-radius: 20px;
  height: 5px;
  background: linear-gradient(90deg, #039BAF, #F7DB61); /* Gradient color */
  transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
`;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      barPosition: 0,
      barWidth: 0,
    };
  }

  handleClick = (item, index) => {
    const menuItemWidth = this.menuRef.children[index].clientWidth;
    const menuItemLeft = this.menuRef.children[index].offsetLeft;
    this.setState({
      selectedItem: item,
      barPosition: menuItemLeft,
      barWidth: menuItemWidth,
    });
    item.callback();
  };

  render() {
    const { selectedItem, barPosition, barWidth } = this.state;
    const itemSet = new Set([
      { label: 'MY ACCOUNT', callback: () => console.log('MY ACCOUNT clicked') },
      { label: 'PAYMENTS DETAILS', callback: () => console.log('PAYMENTS DETAILS clicked') },
      { label: 'PRIVACY SETTINGS', callback: () => console.log('PRIVACY SETTINGS clicked') },
      { label: 'MY AUCTIONS', callback: () => console.log('MY AUCTIONS clicked') },
      { label: 'MY LOST OBJECTS', callback: () => console.log('MY LOST OBJECTS clicked') },
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white' }}> 
        <MenuContainer ref={(ref) => (this.menuRef = ref)}>
          {[...itemSet].map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => this.handleClick(item, index)}
              style={{ backgroundColor: selectedItem === item ? '#ddd' : 'transparent' }}
            >
              {item.label}
            </MenuItem>
          ))}
          {selectedItem && (
            <SelectedBar style={{ width: barWidth, left: barPosition }} />
          )}
        </MenuContainer>
      </div>
    );
  }
}

export default Menu;
