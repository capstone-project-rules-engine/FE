import * as React from 'react'
import { Layout } from '../components/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [data, setData] = React.useState([])
    const navigate = useNavigate()

    React.useEffect(() => {
        getRuleset()
    }, [])

    async function getRuleset() {
        const res = await axios.get(`${process.env.REACT_APP_URL}/api/static`)
        setData(res.data)
    }
    return (
        <Layout>
            <section className="layout">
                <button onClick={() => navigate("/addruleset")}>
                    tambah data
                </button>
                <ul className="space-y-5">
                    {
                        data?.db?.map((data, index) => {
                            return (
                                <li key={index}>
                                    <p>
                                        {data.name}
                                    </p>
                                    <p>Endpoint: {`/ruleengine/?rule=${data.endpoint}`}</p>
                                    <p>Body</p>
                                    {
                                        data.body.map((data, index) => {
                                            return (
                                                <div key={index} className="flex ">
                                                    <p>{data.name} : </p>
                                                    <p>{data.type}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="flex space-x-10 w-full">

                                    </div>
                                    <button onClick={() => navigate(`/editruleset/${data.id}`)}>
                                        edit data
                                    </button>
                                    <button onClick={() => navigate(`/rule/${data.id}`)}>
                                        detail 
                                    </button>
                                </li>
                            )
                        })
                    }

                </ul>
                {process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PRO_MODE}


            </section>
        </Layout>
    )
}

export default Home