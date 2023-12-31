import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { apiMock } from '../lib/axios.mock'
import toast from 'react-hot-toast'
import { useForm, useFieldArray } from "react-hook-form";
import Button from '../components/Button'
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast';
import Loading from '../components/Loading'
import MyModal from '../components/DialogModal'

const RuleDetail = () => {
  const [data, setData] = useState(null)
  const [key, setKey] = useState()
  const [condition, setCondition] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const param = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState()
  const navigate = useNavigate()



  useEffect(() => {
    const getData = async (endpoint) => {
      try {
        setData(null)
        const response = await apiMock.get(
          `/fetchSpecificRuleSet?ruleSetName=${endpoint}`,
        )
        setData(response.data.details)
        getkey(response.data.details)
        setIsLoading(false)
        // console.log(response.data.details);
      } catch (error) {
        setIsLoading(false)
        toast.error(error)
      }
    }
    getData(param?.endpoint)
  }, [param.endpoint])



  const {
    register,
    handleSubmit,
    control,
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
    console.log(data);
    let newdata = data
    const temp = newdata.rules.map((data) => {
      return data
    })

    temp?.map((data) => {
      return Object.keys(data.conditions).forEach(key => {
        if (data.conditions[key] === "") {
          delete data.conditions[key];
        }
      });
    })
    if (temp.length === 0) {
      return toast.error("cannot be empty")
    }

    toast.promise(
      apiMock.patch(`/insertRuletoRuleSet?ruleSetName=${param.endpoint}`, temp)
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Ruleset Successfully Edited',
      }
    );
  };

  function getkey(params) {
    const key = params.conditions.map((condition) => (
      condition
    ))
    setKey(key)
  }

  function getIndex(params) {
    const res = data?.bodies.map((data) => {
      return data.name
    })
    return res.indexOf(params)
  }

  function handleDelete(params) {
    setIsOpen(!isOpen)
    setIndex(params)

  }

  function onDelete() {
    data?.rules.splice(index, 1)
    toast.promise(
      apiMock.put(`/updateRuleSet?ruleSetName=${data?.endpoint}`, data)
        .then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: "Ruleset Successfully Deleted",
      }
    );
  }




  return (
    <Layout>

      <section className='layout min-h-screen'>
        <button onClick={() => navigate(-1)} className="border shadow-md rounded-md p-2 w-28 mb-5">
          Back
        </button>
        {
          isLoading ? <Loading /> :
            <>
              <div className='mb-6'>
                <div className='flex'>
                  <p className='h4'>Rule Name: </p>
                  <p className='h4'>{data?.name}</p>
                </div>
                <div className='flex'>
                  <p className='h4'>Description Condition: </p>
                  <p className='h4'>{data?.description.condition}</p>
                </div>
                <div className='flex'>
                  <p className='h4'>Description Action: </p>
                  <p className='h4'>{data?.description.action}</p>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-bold text-center " colSpan={key?.length}>
                      Condition
                    </th>
                    <th className="font-bold text-center " colSpan={1}>
                      Action
                    </th>
                    <th className="font-bold text-center " colSpan={1}>
                      Edit
                    </th>
                  </tr>
                  <tr>
                    {data?.conditions?.map((condition, index) => (
                      <th key={index}
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 "
                      >
                        {condition.label}
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 "
                    >
                      {data?.action?.label}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {
                    data?.rules?.map((data, index) => {
                      return (
                        <tr key={index}>
                          {
                            key?.map((isi, num) => {
                              return (
                                <td key={num} className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center'>
                                  {data?.conditions?.[isi.label] ?? <p> </p>}
                                </td>
                              )
                            })
                          }
                          <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center'>
                            {data?.action ?? <p> </p>}
                          </td>
                          <td>
                            <button className='border shadow-md p-1 rounded-md bg-red-400 hover:bg-red-600' onClick={() => handleDelete(index)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>

              </table>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-section">
                  <label>Add Rules </label>
                  <ul>

                    {rulessFields.map((item, index) => {
                      return (
                        <li key={item.id}>
                          <div className="input-row">
                            {
                              key?.map((key, num) => {
                                return (
                                  <React.Fragment key={num}>
                                    <p>{key.label}</p>
                                    {
                                      data?.bodies?.[getIndex(key.attribute)].type === 'bool' ?
                                        <select {...register(`rules.${index}.conditions.${key.label}`)}>
                                          <option value='' disabled>
                                            Choose
                                          </option>
                                          <option value='true'>True</option>
                                          <option value='false'>False</option>
                                        </select>
                                        : <input type={data?.bodies?.[getIndex(key.attribute)].type} key={num}
                                          {...register(`rules.${index}.conditions.${key.label}`)}
                                          placeholder="Isi Field"
                                        />
                                    }

                                  </React.Fragment>
                                )
                              })
                            }
                            <p>{data?.action?.label}</p>
                            {
                              data?.action?.type === "bool" ?
                                <select {...register(`rules.${index}.action`, { required: true })} required>
                                  <option value='' disabled>
                                    Choose
                                  </option>
                                  <option value='true'>True</option>
                                  <option value='false'>False</option>
                                </select> : <input type={data?.action?.type}
                                  {...register(`rules.${index}.action`, { required: true })}
                                  placeholder="Isi Field"
                                />
                            }

                            <button type="button" className='border p-1 rounded-md shadow-md bg-black' onClick={() => rulessRemove(index)}>
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
                    Add body
                  </button>
                </div>
                <Button fullWidth type="submit">
                  Submit
                </Button>
              </form>
            </>
        }

        <MyModal isOpen={isOpen} onClick={handleDelete} onDelete={onDelete} />
      </section>
    </Layout>
  )
}

export default RuleDetail
