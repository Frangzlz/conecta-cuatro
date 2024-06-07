export const Modal = ({ children }) => {
  return (
    <div className='modal'>
      <div className='modal-text'>
        {children}
      </div>
    </div>
  )
}
