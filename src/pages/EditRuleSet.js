import axios from 'axios'
import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import Input from '../components/Input'
import { Layout } from '../components/Layout'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast'
import { apiMock } from '../lib/axios.mock'

const EditRuleSet = () => {
  const [data, setData] = React.useState()
  const [isLoading, setIsloading] = React.useState(false)
  const param = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })
  const {
    fields: bodyFields,
    append: bodyAppend,
    remove: bodyRemove,
  } = useFieldArray({
    control,
    name: 'bodies',
  })
  const {
    fields: conditionsFields,
    append: conditionsAppend,
    remove: conditionsRemove,
  } = useFieldArray({
    control,
    name: 'conditions',
  })

  const {
    fields: actionFields,
    append: actionAppend,
    remove: actionRemove,
  } = useFieldArray({
    control,
    name: 'action',
  })

  const onSubmit = (data) => {
    setIsloading(true)
    toast.promise(
      apiMock
        .put(`/updateRuleSet?ruleSetName=${data.endpoint}`, data)
        .then(() => {
          setTimeout(() => {
            setIsloading(false)
            navigate('/')
          }, 1000)
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Ruleset Successfully Edited',
      },
    )
  }

  React.useEffect(() => {
    getdata(param.endpoint)
  }, [param.endpoint])

  React.useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        description: data.description,
        bodies: data.bodies,
        conditions: data.conditions,
        action: data.action,
        rules: data.rules,
        endpoint: data.endpoint,
      })
    }
  }, [data, reset])
  const getdata = async (params) => {
    const respon = await axios.get(
      `${process.env.REACT_APP_URL}/fetchSpecificRuleSet?ruleSetName=${params}`,
    )
    console.log(respon.data.details)
    setData(respon.data.details)
  }

  return (
    <Layout>
      <section className='layout'>
        <button onClick={() => navigate(-1)} className="border shadow-md rounded-md p-2 w-28 mb-5">
          Back
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name</label>
            <Input {...register("name", { required: true })} id="name" />
            {errors.name?.type === 'required' && <p role="alert" className='text-rose-500'>Name is required</p>}
          </div>
          <div>
            <label>Description Condition</label>
            <Input {...register("description.condition", { required: true })} id="condition" />
            {errors.description?.condition?.type === 'required' && <p role="alert" className='text-rose-500'>Description is required</p>}
          </div>
          <div>
            <label>Description Action</label>
            <Input {...register("description.action", { required: true })} id="action" />
            {errors.description?.action?.type === 'required' && <p role="alert" className='text-rose-500'>Description is required</p>}
          </div>

          <div>
            <label>Body</label>
            <ul>
              {bodyFields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <input
                      {...register(`bodies.${index}.name`, { required: true })}
                    />

                    <Controller
                      render={({ field }) => (
                        <select {...field} required>
                          <option value='' disabled>
                            Choose
                          </option>
                          <option value='number'>Number</option>
                          <option value='string'>String</option>
                          <option value='bool'>Boolean</option>
                        </select>
                      )}
                      name={`bodies.${index}.type`}
                      control={control}
                    />
                    <button type='button' onClick={() => bodyRemove(index)}>
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>

            <button
              type='button'
              onClick={() => {
                bodyAppend({ name: '', type: '' })
              }}
            >
              Add body
            </button>
          </div>

          <div>
            <label>Conditions</label>
            <ul>
              {conditionsFields.map((item, index) => {
                return (
                  <li key={item.id} className='flex flex-wrap'>
                    <div className='input-col'>
                      <label>Atribute</label>
                      <input
                        {...register(`conditions.${index}.attribute`, {
                          required: true,
                        })}
                        placeholder='Atribute'
                      />
                      {errors.conditions?.[index].attribute?.type === 'required' && <p role="alert" className='text-rose-500'>Atribute is required</p>}
                    </div>
                    <div className='input-col'>
                      <label>Operator</label>
                      <Controller
                        render={({ field }) => (
                          <select {...field} required>
                            <option value='' disabled>
                              Choose
                            </option>
                            <option value='>'>Greater than</option>
                            <option value='>='>Greater than equal</option>
                            <option value='<'>Less than</option>
                            <option value='<='>Less than equal</option>
                            <option value='='>Equal</option>
                            <option value='!='>Not equal</option>
                          </select>
                        )}
                        name={`conditions.${index}.operator`}
                        control={control}
                      />
                      {errors.conditions?.[index].operator?.type === 'required' && <p role="alert" className='text-rose-500'>Operator is required</p>}
                    </div>
                    <div className='input-col'>
                      <label>
                        Label
                      </label>
                      <input
                        {...register(`conditions.${index}.label`, {
                          required: true,
                        })}
                        placeholder='Label'
                      />
                      {errors.conditions?.[index].label?.type === 'required' && <p role="alert" className='text-rose-500'>Label is required</p>}
                    </div>
                    <button
                      type='button'
                      onClick={() => conditionsRemove(index)}
                    >
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>

            <button
              type='button'
              onClick={() => {
                conditionsAppend({ attribute: '', operator: '', label: '' })
              }}
            >
              Add Conditions
            </button>
          </div>

          <div>
            <label></label>
          </div>

          <div className='form-section'>
            <label className="h2"> Action</label>
            <div>
              <label>Atribute</label>
              <Input {...register("action.attribute", { required: true })} id="atrribute" />
              {errors.action?.attribute?.type === 'required' && <p role="alert" className='text-rose-500'>attribute is required</p>}
            </div>
            <div>
              <label>Label</label>
              <Input {...register("action.label", { required: true })} id="label" />
              {errors.action?.label?.type === 'required' && <p role="alert" className='text-rose-500'>label is required</p>}
            </div>
            <div>
              <label>Type</label>
              {/* <Input {...register("action.type", { required: true })} id="type" /> */}
              <Controller
                render={({ field }) => (
                  <select {...field} required>
                    <option value='' disabled>
                      Choose
                    </option>
                    <option value='number'>Number</option>
                    <option value='string'>String</option>
                    <option value='bool'>Boolean</option>
                  </select>
                )}
                name={`action.type`}
                control={control}
              />
              {errors.action?.type?.type === 'required' && <p role="alert" className='text-rose-500'>Type is required</p>}
            </div>
          </div>
          <Button disabled={isLoading} fullWidth type="submit">
            Submit
          </Button>
        </form>
      </section>
    </Layout>
  )
}

export default EditRuleSet
