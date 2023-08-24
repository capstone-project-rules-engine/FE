import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import styles from './Home.css'
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast'
import { useNavigate } from 'react-router'
import Loading from '../components/Loading'
import MyModal from '../components/DialogModal'
import { apiMock } from '../lib/axios.mock'

export default function Home() {
  const [data, setData] = useState(null)
  const [isloading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [endpoint, setEndpoint] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const response = await apiMock.get(
        `/fetchRules`,
      )
      setData(response.data.details)
      setIsLoading(false)
    } catch (error) {
      toast.error(error)
      setIsLoading(false)
    }
  }

  function handleOnclick(params) {
    navigate(`/rule/${params}`)
  }

  function handleOndelete(params) {
    setIsOpen(!isOpen)
    setEndpoint(params)
  }

  function onDelete() {
    toast.promise(
      apiMock.delete(
        `/deleteRuleSet?ruleSetName=${endpoint}`,
      ).then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Rule Successfully Deleted',
      },
    )

  }

  function handleOnedit(params) {
    navigate(`/editruleset/${params}`)
  }

  return (
    <Layout>
      <section className='layout min-h-screen flex flex-col'>
        {!data && (
          <button
            className={`border p-2 rounded-md`}
            onClick={() => navigate('/addruleset')}
          >
            tambah data
          </button>
        )}

        {isloading ? (
          <Loading />
        ) : data ? (
          <>
            <div className=' flex justify-end'>
              <button
                className={`border p-2 rounded-md mb-2`}
                onClick={() => navigate('/addruleset')}
              >
                tambah data
              </button>
            </div>
            <ul className={`space-y-5`}>
              {data.map((item, index) => (
                <li
                  key={index}
                  className={`border shadow-md p-4 rounded-md flex `}
                >
                  <div className='w-3/4'>
                    <p className='h3'>{item.name}</p>
                    <p>Endpoint: {`//execInput?ruleSetName=${item.endpoint}`}</p>
                    <p className='h3'>Body</p>
                    {item.bodies.map((body, idx) => (
                      <div key={idx} className={`flex ${styles.dataItem}`}>
                        <p>{body.name} : </p>
                        <p>{body.type}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`flex space-x-10 w-full ${styles.buttonGroup}`}
                  ></div>
                  <button className='ml-[8px] bg-blue-400 rounded-md text-white cursor-pointer p-1' onClick={() => handleOnclick(item.endpoint)}>
                    detail
                  </button>
                  <button
                    onClick={() => handleOnedit(item.endpoint)}
                    className={`${styles.delete} ml-[8px] bg-blue-400 rounded-md text-white cursor-pointer p-1`}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => handleOndelete(item.endpoint)}
                    className={`${styles.delete} ml-[8px] bg-red-400 rounded-md text-white cursor-pointer p-1`}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className='h-screen flex justify-center items-center'>
            <div className='h-28 animate-bounce'>
              <p>Oopssiii kamu belum punya rule nichh...</p>
            </div>
          </div>
        )}

        <MyModal isOpen={isOpen} onClick={handleOndelete} onDelete={onDelete} />
      </section>
    </Layout>
  )
}
