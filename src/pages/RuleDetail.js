import * as React from 'react'
import { Layout } from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const RuleDetail = () => {
  const [data, setData] = React.useState()
  const [conditions, setConditions] = React.useState()
  const [temp, setTemp] = React.useState()
  const param = useParams()
  
  React.useEffect(() => {
    getdata(param.endpoint)
  }, [])
  // React.useEffect(() => {
  //   if (data) {
  //     getConditions()
  //   }

  // }, [data])
  const getdata = async (params) => {
    const respon = await axios.get(`${process.env.REACT_APP_URL}/fetchSpecificRuleSet?ruleSetName=${params}`)
    setData(respon.data.details)
  }
  // function getConditions() {
  //   if (data) {
  //     const condition .rules.map((data) => {
  //       return data.conditions
  //     })
  //     const temp = condition.map((data) => {
  //       return data
  //     })
  //     const set = temp.map((data)=>{
  //       return data
  //     })
  //     setConditions(condition)
  //     setTemp(set)
  //   }
  // }

console.log(data);





  return (
    <Layout>
      <section className='layout'>
        {
          data ?
            <div>
              <p>{data?.name}</p>
              {/* <button onClick={() => handleOnclick(data[0].id)}>
                delete
              </button> */}
              <div className='flex '>
                {
                  data?.conditions.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        <p>{data.label}</p>
                        
                       

                      </React.Fragment>
                    )
                  })
                }


              </div>
            </div>
            :
            <p>Loading</p>
        }

      </section>
    </Layout>
  )
}

export default RuleDetail