import React from 'react'
import styles from '../pages/Home.css'
const Card = ({ data, onDetail, onEdit, onDelete }) => {
  return (
    <>
      <div
        className={`border shadow-md p-4 rounded-md flex `}
      >
        <div className='w-3/4'>
          <p className='h3'>{data.name}</p>
          <p>
            Endpoint: {`${process.env.REACT_APP_URL}/execInput?ruleSetName=${data.endpoint}`}
          </p>
          <p className='h3'>Body</p>
          {data.bodies.map((body, idx) => (
            <div key={idx} className={`flex `}>
              <p>{body.name} : </p>
              <p>{body.type}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center'>
          <button
            className='ml-[8px] h-10 bg-blue-400 rounded-md hover:bg-blue-600 text-white cursor-pointer p-1'
            onClick={() => onDetail(data.endpoint)}
          >
            Detail
          </button>
          <button
            onClick={() => onEdit(data.endpoint)}
            className={` ml-[8px] h-10 bg-blue-400 hover:bg-blue-600 rounded-md text-white cursor-pointer p-1`}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(data.endpoint)}
            className={` ml-[8px] h-10 bg-red-400 hover:bg-red-600 rounded-md text-white cursor-pointer p-1`}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default Card