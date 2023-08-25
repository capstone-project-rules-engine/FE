import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { apiMock } from '../lib/axios.mock'
import toast from 'react-hot-toast'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Button from '../components/Button'
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast';

const RuleDetail = () => {
  const [data, setData] = useState(null)
  const [key, setKey] = useState()
  const param = useParams()
  const navigate = useNavigate()

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
    reset,
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
    // console.log(temp);
    if (temp.length == 0) {
      return toast.error("Tidak boleh kosong")
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
      condition.label
    ))
    setKey(key)
  }

  function handleDelete(params) {
    data?.rules.splice(params, 1)
    console.log(data);
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="font-bold text-center " colSpan={key?.length}>
                condition
              </th>
              <th className="font-bold text-center " colSpan={1}>
                action
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
                            {data?.conditions?.[isi] ?? <p> </p>}
                          </td>
                        )
                      })
                    }
                    <td className='px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center'>
                      {data?.action ?? <p> </p>}
                    </td>
                    <td>
                      <button onClick={() => handleDelete(index)}>
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
            <label>Tambah Rules </label>
            <ul>

              {rulessFields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <div className="input-row">
                      {
                        key?.map((data, num) => {
                          return (
                            <>
                              <p>Conditions {num + 1}</p>
                              <input key={num}
                                {...register(`rules.${index}.conditions.${data}`)}
                                placeholder="Isi Field"
                              />
                            </>
                          )
                        })
                      }
                      <p>Action</p>
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
