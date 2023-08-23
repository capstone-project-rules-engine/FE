import { Layout } from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react"
import toast from "react-hot-toast";
import useSWR from "swr";
import styles from './Home.module.css';
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";

export default function Home(props: any) {
  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/static', fetcher);
  
  if (!data) return <div>Loading...</div>;

  function handleOnclick(params: number) {
    router.push(`/rule/${params}`);
  }

  function handleOndelete(params: number) {
    toast.promise(
      axios.delete(`/api/rule/${params}`)
      .then((res)=>{
        setTimeout(() => {
          router.reload()
        }, 1000);
      }),
      {
         ...DEFAULT_TOAST_MESSAGE,
       success: 'Rule Successfully Deleted',
      }
    );
  }

  function handleReset(){
    toast.promise(
      axios.get(`/api/reset`)
      .then((res)=>{
        setTimeout(() => {
          router.reload()
        }, 1000);
      }),
      {
         ...DEFAULT_TOAST_MESSAGE,
       success: 'Rule Successfully Reset',
      }
    );
  }

  return (
    <Layout>
      <section className={styles.layout}>
        <button onClick={() => router.push('/addrule')}>
          tambah data
        </button>
        <button onClick={handleReset}>
          reset data
        </button>
        <ul className={`space-y-5 ${styles.myCustomList}`}>
          {data.db.map((data: any, index: any) => {
            return (
              <li key={index} className={`border shadow-md p-4 rounded-md flex justify-between ${styles.listItem}`}>
                <div>
                  <p>
                    {data.name}
                  </p>
                  <p>Endpoint: {`/ruleengine/?rule=${data.endpoint}`}</p>
                  <p>Body</p>
                  {data.body.map((data: any, index: any) => {
                    return (
                      <div key={index} className={`flex ${styles.dataItem}`}>
                        <p>{data.name} : </p>
                        <p>{data.type}</p>
                      </div>
                    )
                  })}
                </div>
                <div className={`flex space-x-10 w-full ${styles.buttonGroup}`}>
                  <button onClick={() => handleOnclick(data.id)} className={`${styles.detail} ${styles.button}`}>
                    detail
                  </button>
                  <button onClick={() => handleOndelete(data.id)} className={`${styles.delete} ${styles.button}`}>
                    delete
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}
