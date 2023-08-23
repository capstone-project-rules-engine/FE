import { Layout } from "../components/Layout";
import axios from "axios";
import * as React from "react"
import toast from "react-hot-toast";
import styles from './Home.css';
import { DEFAULT_TOAST_MESSAGE } from "../constant/toast";
import { useNavigate } from "react-router";

export default function Home(props) {
  const [data, setData] = React.useState()

  const navigate = useNavigate()

  React.useState(() => {
    getData()
  }, [])


  async function getData() {
    const res = await axios.get(`${process.env.REACT_APP_URL}/fetchRules`)
    console.log(res.data.details);
    setData(res.data.details)
  }
  function handleOnclick(params) {
    navigate(`/rule/${params}`);
  }

  function handleOndelete(params) {
    toast.promise(
      axios.delete(`${process.env.REACT_APP_URL}/deleteRuleSet?ruleSetName=${params}`)
        .then((res) => {
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Rule Successfully Deleted',
      }
    );
  }

  function handleOnedit(params){
    navigate(`/editruleset/${params}`)
  }



  return (
    <Layout>
      <section className={styles.layout}>
        {
          data ?
            <>
              <button onClick={() => navigate('/addrule')}>
                tambah data
              </button>
              <ul className={`space-y-5 ${styles.myCustomList}`}>
                {data?.map((data, index) => {
                  return (
                    <li key={index} className={`border shadow-md p-4 rounded-md flex justify-between ${styles.listItem}`}>
                      <div>
                        <p>
                          {data.name}
                        </p>
                        <p>Endpoint: {`/ruleengine/?rule=${data.endpoint}`}</p>
                        <p>Body</p>
                        {/* {data.body.map((data, index) => {
                    return (
                      <div key={index} className={`flex ${styles.dataItem}`}>
                        <p>{data.name} : </p>
                        <p>{data.type}</p>
                      </div>
                    )
                  })} */}
                      </div>
                      <div className={`flex space-x-10 w-full ${styles.buttonGroup}`}>
                        <button onClick={() => handleOnclick(data.endpoint)} className={`${styles.detail} ${styles.button}`}>
                          detail
                        </button>
                        <button onClick={() => handleOnedit(data.endpoint)} className={`${styles.delete} ${styles.button}`}>
                          edit
                        </button>
                        <button onClick={() => handleOndelete(data.endpoint)} className={`${styles.delete} ${styles.button}`}>
                          delete
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
            :
            <p>loading</p>
        }


      </section>
    </Layout>
  )
}
