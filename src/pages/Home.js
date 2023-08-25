import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import toast from 'react-hot-toast'
import styles from './Home.css'
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast'
import { useNavigate } from 'react-router'
import Loading from '../components/Loading'
import MyModal from '../components/DialogModal'
import { apiMock } from '../lib/axios.mock'
import Card from '../components/Card'
import SearchBox from '../components/SearchBox'

export default function Home() {
  const [data, setData] = useState()
  const [isloading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [endpoint, setEndpoint] = useState(null)
  const [cursorPos, setCursorPos] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [datas, setDatas] = useState(data)


  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const filteredData = data?.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDatas(filteredData);
  }, [searchText, cursorPos]);

  async function getData() {
    try {
      const response = await apiMock.get(`/fetchRules`)
      setData(response.data.details)
      setDatas(response.data.details)
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
      apiMock.delete(`/deleteRuleSet?ruleSetName=${endpoint}`).then(() => {
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
            className={`border p-2 rounded-md bg-blue-400 text-white`}
            onClick={() => navigate('/addruleset')}
          >
            tambah data
          </button>
        )}

        {isloading ? (
          <Loading />
        ) : data ? (
          <>

            <div className=' flex justify-between'>
              <SearchBox searchText={searchText} setSearchText={setSearchText} />
              <button
                className={`border p-2 rounded-md bg-blue-400 hover:bg-blue-600 text-white`}
                onClick={() => navigate('/addruleset')}
              >
                tambah data
              </button>

            </div>
            <ul className={`space-y-5`}>
              {datas?.map((item, index) => (
                <Card key={index} data={item} onDelete={handleOndelete} onDetail={handleOnclick} onEdit={handleOnedit} />
                // <li
                //   key={index}
                //   className={`border shadow-md p-4 rounded-md flex `}
                // >
                //   <div className='w-3/4'>
                //     <p className='h3'>{item.name}</p>
                //     <p>
                //       Endpoint: {`//execInput?ruleSetName=${item.endpoint}`}
                //     </p>
                //     <p className='h3'>Body</p>
                //     {item.bodies.map((body, idx) => (
                //       <div key={idx} className={`flex ${styles.dataItem}`}>
                //         <p>{body.name} : </p>
                //         <p>{body.type}</p>
                //       </div>
                //     ))}
                //   </div>
                //   <div
                //     className={`flex space-x-10 w-full ${styles.buttonGroup}`}
                //   ></div>
                //   <button
                //     className='ml-[8px] bg-blue-400 rounded-md hover:bg-blue-600 text-white cursor-pointer p-1'
                //     onClick={() => handleOnclick(item.endpoint)}
                //   >
                //     detail
                //   </button>
                //   <button
                //     onClick={() => handleOnedit(item.endpoint)}
                //     className={`${styles.delete} ml-[8px] bg-blue-400 hover:bg-blue-600 rounded-md text-white cursor-pointer p-1`}
                //   >
                //     edit
                //   </button>
                //   <button
                //     onClick={() => handleOndelete(item.endpoint)}
                //     className={`${styles.delete} ml-[8px] bg-red-400 hover:bg-red-600 rounded-md text-white cursor-pointer p-1`}
                //   >
                //     delete
                //   </button>
                // </li>
              ))}
            </ul>
          </>
        ) : (
          <div className='h-screen flex justify-center items-center'>
            <div className='h-28 animate-bounce'>
              <p>You don't have rules yet</p>
            </div>
          </div>
        )}

        <MyModal isOpen={isOpen} onClick={handleOndelete} onDelete={onDelete} />
      </section>
    </Layout>
  )
}
