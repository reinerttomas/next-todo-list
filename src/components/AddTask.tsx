'use client'

import { HiOutlinePlus } from 'react-icons/hi'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTask } from '@/api'
import { useRouter } from 'next/navigation'

const AddTask = () => {
  const router = useRouter()
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    await addTask({
      id: crypto.randomUUID(),
      text: newTaskValue
    })

    setNewTaskValue('')
    setOpenModal(false)
    router.refresh()
  }

  return (
    <div>
      <button onClick={() => setOpenModal(true)} className="btn btn-primary w-full uppercase">
        Add new task <HiOutlinePlus size={20} />
      </button>

      <Modal isModalOpen={isOpenModal} setModalOpen={setOpenModal}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Your text..."
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
            />
            <button type="submit" className="btn btn-primary uppercase">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask
