import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./componentsStyle.css"
import { useNavigate } from "react-router-dom";
import {logoutUser} from "../redux/slices/userSlice"
import Modal from 'react-modal';
import "./Navbar.css"

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    padding: '40px 20px',
  }
};

function Navbar() {
    const userVal = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('user', null);
        dispatch(logoutUser())
        navigate("/login")
        console.log("logout click")
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }

  return (
    <div className='navbar' >
      <div className="title">
        <img src="logo.png" alt="" />
      </div>
        <h3>User : {userVal.email}</h3>

        <div>
          <a onClick={openModal} href="#" className='rules-btn'>Rules</a>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
            
            <div className='modal-content' >
              <div>

            <button onClick={closeModal}>X</button>
              </div>
              <h2> Instructions – </h2>
              <p>👉 If the card drawn from the deck is a cat card, then the card is removed from the deck.</p><br />
              <p>👉 If the card is exploding kitten (bomb) then the player loses the game.</p><br />
              <p>👉 If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</p><br />
              <p>👉 If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</p>
            </div>
          </Modal>
          <button className='show-btn logout-btn' onClick={handleLogout} >LOGOUT</button>
        </div>

    </div>
  )
}

export default Navbar