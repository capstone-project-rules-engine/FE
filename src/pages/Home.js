import { Layout } from '../components/Layout';
import axios from 'axios';
import * as React from 'react';
import toast from 'react-hot-toast';
import styles from './Home.css';
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast';
import { useNavigate } from 'react-router';
import Loading from '../components/Loading';
import MyModal from '../components/DialogModal';

export default function Home(props) {
  const [data, setData] = React.useState();
  const [isloading, setIsloading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false)
  const [endpoint, setEndpoint] = React.useState()

  const navigate = useNavigate();

  React.useState(() => {
    getData();
  }, []);



  async function getData() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/fetchRules`);
      setData(res.data.details);
      setIsloading(false);
    } catch (error) {
      toast.error(error);
      setIsloading(false);
    }
  }
  function handleOnclick(params) {
    navigate(`/rule/${params}`);
  }

  function handleOndelete(params) {

    setIsOpen(!isOpen)
    setEndpoint(params)
  }

  function onDelete() {
    toast.promise(
      axios
        .delete(
          `${process.env.REACT_APP_URL}/deleteRuleSet?ruleSetName=${endpoint}`,
        )
        .then((res) => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Rule Successfully Deleted',
      },
    );
  }

  function handleOnedit(params) {
    navigate(`/editruleset/${params}`);
  }


  return (
    <Layout>
      <section className="layout min-h-screen flex flex-col">

        {
          !data && <button className={`border p-2 rounded-md`}
            onClick={() => navigate('/addruleset')}
          >
            tambah data
          </button>
        }

        {isloading ? (
          <Loading />
        ) : data ? (
          <>
            <div className=' flex justify-end'>
              <button className={`border p-2 rounded-md mb-2`}
                onClick={() => navigate('/addruleset')}
              >
                tambah data
              </button>
            </div>
            <ul className={`space-y-5`}>
              {data?.map((data, index) => {
                return (
                  <li
                    key={index}
                    className={`border shadow-md p-4 rounded-md flex `}
                  >
                    <div className=' w-1/2'>
                      <p className='h3'>{data.name}</p>
                      <p>Endpoint: {`/ruleengine/?rule=${data.endpoint}`}</p>
                      <p>Body</p>
                      {data?.bodies?.map((data, index) => {
                        return (
                          <div key={index} className={`flex ${styles.dataItem}`}>
                            <p>{data.name} : </p>
                            <p>{data.type}</p>
                          </div>
                        )
                      })}
                    </div>
                    <div
                      className={`flex space-x-10 w-full ${styles.buttonGroup}`}
                    ></div>
                    <button onClick={() => handleOnclick(data.endpoint)}>
                      detail
                    </button>
                    <button
                      onClick={() => handleOnedit(data.endpoint)}
                      className={`${styles.delete} ${styles.button}`}
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleOndelete(data.endpoint)}
                      className={`${styles.delete} ${styles.button}`}
                    >
                      delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className='h-screen flex justify-center items-center'>
            <div className='h-28 animate-bounce'>
              <p>
                Oopssiii kamu belum punya rule nichh...
              </p>
            </div>

          </div>
        )}

        <MyModal isOpen={isOpen} onClick={handleOndelete} onDelete={onDelete} />
      </section>
    </Layout>
  );
}
