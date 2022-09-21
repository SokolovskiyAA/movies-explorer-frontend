import './Burger.css';

export default function Burger(props) {

  const handleOnClick = () => {
    props.onMenuOpen(props.isOpen);
  }

  return (
    <div className={`burger ${props.isOpen && 'burger__type_opened'}`} onClick={handleOnClick}>
      <div className={`burger__box ${props.isOpen ? 'burger__close' : 'burger__menu'}`}>
      </div>
    </div>
  )
}