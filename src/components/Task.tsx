'use client'

import { ITask } from '@/types/task'
import React, { FormEventHandler, useState } from 'react'
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { deleteTask, updateTask } from '@/api'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()
  const [isOpenModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [isOpenModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [updateTaskValue, setUpdateTaskValue] = useState<string>(task.text)

  const handleSubmitUpdateTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    await updateTask({
      id: task.id,
      text: updateTaskValue
    })

    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id)
    setOpenModalDelete(false)
    router.refresh()
  }

  return (
    <tr>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        {/* update task */}
        <HiOutlinePencilAlt
          onClick={() => setOpenModalEdit(true)}
          className="text-primary"
          cursor="pointer"
          size={20}
        />
        <Modal isModalOpen={isOpenModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitUpdateTask}>
            <h3 className="font-bold text-lg">Update task</h3>
            <div className="modal-action">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Your text..."
                value={updateTaskValue}
                onChange={(e) => setUpdateTaskValue(e.target.value)}
              />
              <button type="submit" className="btn btn-primary uppercase">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        {/* delete task */}
        <HiOutlineTrash
          onClick={() => setOpenModalDelete(true)}
          className="text-error"
          cursor="pointer"
          size={20}
        />
        <Modal isModalOpen={isOpenModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">Are you sure, you want to delete task?</h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn btn-error uppercase">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task
