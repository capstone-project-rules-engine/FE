import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import { Layout } from "../components/Layout";
import { DEFAULT_TOAST_MESSAGE } from "../constant/toast";
import "./AddRuleSet.css";
import { useNavigate } from "react-router";
import { apiMock } from "../lib/axios.mock";

export default function AddRuleSet() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      bodies: [{
        name: '',
        type: ''
      }],
      conditions: [
        {
          label: "",
          attribute: "",
          operator: ""
        },
      ],
      action: {
        attribute: "",
        label: "",
        type: "",
      },
      description: {
        condition: "",
        action: "",
      },
      rules: [],
    },
  });

  const {
    fields: bodyFields,
    append: bodyAppend,
    remove: bodyRemove,
  } = useFieldArray({
    control,
    name: "bodies",
  });
  const {
    fields: conditionsFields,
    append: conditionsAppend,
    remove: conditionsRemove,
  } = useFieldArray({
    control,
    name: "conditions",
  });

  const onSubmit = (data) => {
    data.endpoint = data.name.split(" ").join("")
    if (data.bodies == '') {
      return toast.error("body cannot be empty")
    } if (data.conditions == '') {
      return toast.error("condition cannot be empty")
    }
    setIsLoading(true)
    toast.promise(
      apiMock.post(`/insertRuleTemplate`, data)
        .then(() => {
          setTimeout(() => {
            setIsLoading(false)
            navigate('/')
          }, 1000);
        }).finally(() => {
          setIsLoading(false)
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: "Ruleset Successfully Created",
      }
    );
  };

  return (
    <Layout>
      <section className="layout">
        <button onClick={() => navigate('/')} className="border shadow-md rounded-md p-2 w-28 mb-5">
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

          <div className="form-section">
            <label>Body</label>
            <ul>
              {bodyFields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <div className="input-row space-x-2">
                      <div>
                        <label>Body name</label>
                        <input
                          {...register(`bodies.${index}.name`, { required: true })}
                          placeholder="Isi Field"
                        />
                        {errors.bodies?.[index].name?.type === 'required' && <p role="alert" className='text-rose-500'>Name is required</p>}
                      </div>

                      <div>
                        <label>Type</label>
                        <Controller
                          render={({ field }) => (
                            <select {...field} required>
                              <option value="" disabled>
                                Choose
                              </option>
                              <option value="number">Number</option>
                              <option value="string">String</option>
                              <option value='bool'>Boolean</option>
                            </select>
                          )}
                          name={`bodies.${index}.type`}
                          control={control}
                        />
                        {errors.bodies?.[index].type?.type === 'required' && <p role="alert" className='text-rose-500'>Type is required</p>}
                      </div>

                      <button className="mt-8" type="button" onClick={() => bodyRemove(index)}>
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
                bodyAppend({ name: "", type: "" });
              }}
            >
              Add body
            </button>
          </div>

          <div className="form-section">
            <label>Conditions</label>
            <ul>
              {conditionsFields.map((item, index) => {
                return (
                  <li key={item.id} className="flex flex-wrap items-center">

                    <div className="input-col">
                      <label>Atribute</label>
                      <input
                        {...register(`conditions.${index}.attribute`, {
                          required: true,
                        })}
                        placeholder="Atribute"
                      />
                      {errors.conditions?.[index].attribute?.type === 'required' && <p role="alert" className='text-rose-500'>Atribute is required</p>}
                    </div>

                    <div className="input-col">
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

                    <div className="input-col">
                      <label>
                        Label
                      </label>
                      <input
                        {...register(`conditions.${index}.label`, {
                          required: true,
                        })}
                        placeholder="Label"
                      />
                      {errors.conditions?.[index].label?.type === 'required' && <p role="alert" className='text-rose-500'>Label is required</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => conditionsRemove(index)}
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => {
                conditionsAppend({ attribute: "", operator: "", label: "" });
              }}
            >
              Add Conditions
            </button>
          </div>




          <div className="form-section">
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
  );
}
