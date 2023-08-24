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
  // const {
  //   fields: actionFields,
  //   append: actionAppend,
  //   remove: actionRemove,
  // } = useFieldArray({
  //   control,
  //   name: "action",
  // });

  const onSubmit = (data) => {
    data.endpoint = data.name.split(" ").join("")
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name</label>
            <Input {...register("name", { required: true })} id="name" />
            {errors.name?.type === 'required' && <p role="alert" className='text-rose-500'>Name is required</p>}
          </div>
          <div>
            <label>Deskripsi Kondisi</label>
            <Input {...register("description.condition", { required: true })} id="condition" />
            {errors.description?.condition.type === 'required' && <p role="alert" className='text-rose-500'>Deskripsi is required</p>}
          </div>
          <div>
            <label>Deskripsi Aksi</label>
            <Input {...register("description.action", { required: true })} id="action" />
            {errors.description?.action.type === 'required' && <p role="alert" className='text-rose-500'>Deskripsi is required</p>}
          </div>



          <div className="form-section">
            <label>Body</label>
            <ul>
              {bodyFields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <div className="input-row">
                      <input
                        {...register(`bodies.${index}.name`, { required: true })}
                        placeholder="Isi Field"
                      />
                      <Controller
                        render={({ field }) => (
                          <select {...field} required>
                            <option value="" disabled>
                              Pilih
                            </option>
                            <option value="number">Number</option>
                            <option value="string">String</option>
                          </select>
                        )}
                        name={`bodies.${index}.type`}
                        control={control}
                      />
                      <button type="button" onClick={() => bodyRemove(index)}>
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
              Tambah body
            </button>
          </div>

          <div className="form-section">
            <label>Conditions</label>
            <ul>
              {conditionsFields.map((item, index) => {
                return (
                  <li key={item.id} className="flex flex-wrap">
                    <div className="input-col">
                      <input
                        {...register(`conditions.${index}.attribute`, {
                          required: true,
                        })}
                        placeholder="Atribute"
                      />
                    </div>
                    <div className="input-col">
                      <Controller
                        render={({ field }) => (
                          <select {...field} required>
                            <option value="" disabled>
                              Pilih
                            </option>
                            <option value=">">lebih</option>
                            <option value="<">kurang</option>
                          </select>
                        )}
                        name={`conditions.${index}.operator`}
                        control={control}
                      />
                    </div>
                    <div className="input-col">
                      <input
                        {...register(`conditions.${index}.label`, {
                          required: true,
                        })}
                        placeholder="Label"
                      />
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
              Tambah conditions
            </button>
          </div>




          <div className="form-section">
            <label> Action</label>
            <div>
              <label>Atribute</label>
              <Input {...register("action.attribute")} id="name" />
            </div>
            <div>
              <label>Label</label>
              <Input {...register("action.label")} id="condition" />
            </div>
            <div>
              <label>Type</label>
              <Input {...register("action.type")} id="action" />
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
