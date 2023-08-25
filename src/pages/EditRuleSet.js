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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('name')} id='name' />
          <Input {...register('description.condition')} id='condition' />
          <Input {...register('description.action')} id='action' />

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
                            Pilih
                          </option>
                          <option value='number'>Number</option>
                          <option value='string'>String</option>
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
              Tambah body
            </button>
          </div>

          <div>
            <label>Conditions</label>
            <ul>
              {conditionsFields.map((item, index) => {
                return (
                  <li key={item.id} className='flex flex-wrap'>
                    <div className='input-col'>
                      <input
                        {...register(`conditions.${index}.attribute`, {
                          required: true,
                        })}
                        placeholder='Atribute'
                      />
                    </div>
                    <div className='input-col'>
                      <Controller
                        render={({ field }) => (
                          <select {...field} required>
                            <option value='' disabled>
                              Pilih
                            </option>
                            <option value='>'>lebih</option>
                            <option value='<'>kurang</option>
                          </select>
                        )}
                        name={`conditions.${index}.operator`}
                        control={control}
                      />
                    </div>
                    <div className='input-col'>
                      <input
                        {...register(`conditions.${index}.label`, {
                          required: true,
                        })}
                        placeholder='Label'
                      />
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
              Tambah Conditions
            </button>
          </div>

          <div>
            <label></label>
          </div>

          <div className='form-section'>
            <label> Action</label>
            <div>
              <label>Atribute</label>
              <Input {...register('action.attribute')} id='name' />
            </div>
            <div>
              <label>Label</label>
              <Input {...register('action.label')} id='condition' />
            </div>
            <div>
              <label>Type</label>
              <Input {...register('action.type')} id='action' />
            </div>
          </div>

          <Button disabled={isLoading} fullWidth type='submit'>
            Submit
          </Button>
        </form>
      </section>
    </Layout>
  )
}

export default EditRuleSet
