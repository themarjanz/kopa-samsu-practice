
import "./App.css";
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from "./Navbar/Navbar";
import Card from "./Card/Card";
import { BsFillCartFill } from "react-icons/bs";
// recat modal---------------------------
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
// ---------------------------------------

function App() {

  const [guns, setGuns] = useState([]);
  // console.log(guns);
  const [cart, setCart] = useState([]);
  // console.log(cart);

  // modal-----------------------------------------
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // ------------------------------------------------


  const handleAddToCart = (gun) => {
    const newCart = [...cart, gun];
    // setCart(gun);
    setCart(newCart);
  }

  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => setGuns(data))
  }, []);

  return (
    <div>
      <Navbar />

      {/* MOdal------------------------------------------- */}
      <button onClick={openModal}><BsFillCartFill className="icon" /></button>
      {/* ----------------------------------------------- */}

      {/* <div>
        {
          cart.map((item) => (
            <h1 key={item.id}>{item.name}</h1>
          ))
        }
      </div> */}
      <div className="card-container">
        {
          guns.map((gun) => (
            <Card key={gun.id} gunData={gun} handleAddToCart={handleAddToCart} />

          ))}
      </div>

      {/* Modal------------------------------------------ */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}><BsFillCartFill /></button>
        <div>
          {
            cart.map((item) => (
              <h1 key={item.id}>{item.name}</h1>
            ))
          }
        </div>
      </Modal>
      {/* --------------------------------------------------- */}

    </div>
  );
}



export default App;
