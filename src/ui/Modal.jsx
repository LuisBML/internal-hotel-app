import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(3px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// Steps for Compound Component Pattern
// 1) Create context
const ModalContext = createContext();

// 2) Create parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  // provide state to child components
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

// 3) Create child components
function Open({ children, opensWindowName }) {
  const { open } = useContext(ModalContext);
  // e.g. return <Button onClick={() => setOpenName('cabin-form')}>
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  // const modalRef = useOutsideClick(close);

  if (name !== openName) return null;

  // createPortal: select a container/DOM element (second argument) to be the parent element
  // of whatever we want to render
  return createPortal(
    <Overlay>
      {/* <StyledModal ref={modalRef}> */}
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {/* cloneElement: to add props to the children (e.g. CreateCabinForm or ConfirmDelete) and return it as a new element */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// 4) Add child components as properties to the parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
