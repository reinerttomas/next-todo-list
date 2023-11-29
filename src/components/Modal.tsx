import React from 'react'

interface ModalProps {
  isModalOpen: boolean
  setModalOpen: (open: boolean) => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, setModalOpen, children }) => {
  return (
    <dialog className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
