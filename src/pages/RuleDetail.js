import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { apiMock } from '../lib/axios.mock'
import toast from 'react-hot-toast'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Button from '../components/Button'
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast';

const RuleDetail = () => {
  const [data, setData] = useState(null)
  const [key, setKey] = useState()
  const param = useParams()

  useEffect(() => {
    getData(param.endpoint)
  }, [param.endpoint])

  const getData = async (endpoint) => {
    try {
      const response = await apiMock.get(
        `/fetchSpecificRuleSet?ruleSetName=${endpoint}`,
      )
      getkey(response.data.details)
      setData(response.data.details)
      console.log(response.data.details);
    } catch (error) {
      toast.error(error)
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rules: [],
    },
  });

  const {
    fields: rulessFields,
    append: rulessAppend,
    remove: rulessRemove,
  } = useFieldArray({
    control,
    name: "rules",
  });

  const onSubmit = (data) => {

    let newdata = data
    const temp = newdata.rules.map((data) => {
      return data
    })

    temp.map((data) => {
      Object.keys(data.conditions).forEach(key => {
        if (data.conditions[key] === "") {
          delete data.conditions[key];
        }
      });
    })


    // const obj = {
    //   conditions: {
    //     $sasa: "15",
    //     $sasa2: null
    //   },
    //   action: "1000"
    // };

    // Object.keys(obj.conditions).forEach(key => {
    //   if (obj.conditions[key] === null) {
    //     delete obj.conditions[key];
    //   }
    // });

    // console.log(obj)
    // console.log(newData);
    console.log(temp);

    toast.promise(
      apiMock.patch(`/insertRuletoRuleSet?ruleSetName=${param.endpoint}`, temp)
        .then(() => {
          setTimeout(() => {
          }, 1000);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Ruleset Successfully Edited',
      }
    );
  };

  function getkey(params) {
    const key = params.conditions.map((condition) => (
      condition.label
    ))
    setKey(key)
  }




  return (
    <Layout>
      <section className='layout min-h-screen'>
        {data ? (
          <div className='space-x-4'>
            <p>{data.name}</p>
            <div className='flex'>
              {data.conditions.map((condition, index) => (
                <p key={index}>{condition.label}

                </p>
              ))}

              <p>{data.action.label}</p>

            </div>
            <div className='flex'>
              <div>
                {
                  data.rules.map((data, index) => {
                    return (
                      <div className='flex '>
                        {
                          key?.map((isi, num) => {
                            return (
                              <p key={num}>
                                {data?.conditions?.[isi] ?? <p> null</p>}
                              </p>
                            )
                          })
                        }</div>
                    )
                  })
                }
              </div>
              <div>
                {
                  data.rules.map((data, index) => {
                    return (
                      <div className='flex'>
                        <p>{data.action}</p>
                      </div>
                    )
                  })
                }
              </div>

            </div>

          </div>
        ) : (
          <p>Loading</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-section">
            <label>Body</label>
            <ul>

              {rulessFields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <div className="input-row">
                      {
                        key?.map((data, num) => {
                          return (
                            <input key={num}
                              {...register(`rules.${index}.conditions.${data}`)}
                              placeholder="Isi Field"
                            />
                          )
                        })
                      }
                      <input
                        {...register(`rules.${index}.action`, { required: true })}
                        placeholder="Isi Field"
                      />
                      <button type="button" onClick={() => rulessRemove(index)}>
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => {
                rulessAppend({ conditions: "", action: "" });
              }}
            >
              Tambah body
            </button>
          </div>
          <Button fullWidth type="submit">
            Submit
          </Button>
        </form>
      </section>
    </Layout>
  )
}

export default RuleDetail
