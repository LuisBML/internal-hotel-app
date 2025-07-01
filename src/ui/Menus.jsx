import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// Steps for Compound Component Pattern
// 1) Create context
const MenusContext = createContext();

// 2) Create parent component
function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [menuPosition, setMenuPosition] = useState({});

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, menuPosition, setMenuPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// 3) Create child components
function Toggle({ forListId }) {
  const { openId, close, open, setMenuPosition } = useContext(MenusContext);

  const handleClick = function (e) {
    // e.target.closest('button') = closest button parent
    // getBoundingClientRect() = menu button position and size
    const btnRect = e.target.closest('button').getBoundingClientRect();

    setMenuPosition({
      x: window.innerWidth - btnRect.width - btnRect.x,
      y: btnRect.height + btnRect.y + 8,
    });

    openId === '' || openId !== forListId ? open(forListId) : close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ listId, children }) {
  const { openId, menuPosition } = useContext(MenusContext);
  // const { openId, menuPosition, close } = useContext(MenusContext);
  // for closing the menu when clicking outside of it
  // const refElement = useOutsideClick(close, false);

  if (openId !== listId) return null;

  // createPortal: select a container/DOM element (second argument) to be the parent element
  // of whatever we want to render

  // return createPortal(
  //   <StyledList position={menuPosition} ref={refElement}>
  //     {children}
  //   </StyledList>,
  //   document.body
  // );
  return createPortal(
    <StyledList position={menuPosition}>{children}</StyledList>,
    document.body
  );
}

function Button({ icon, onClickProp, children, disabledProp, onClick }) {
  const { close } = useContext(MenusContext);

  const handleClick = function () {
    onClickProp?.();
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabledProp}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// 4) Add child components as properties to the parent component
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
