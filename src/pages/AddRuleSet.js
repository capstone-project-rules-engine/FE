import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import { Layout } from "../components/Layout";
import { DEFAULT_TOAST_MESSAGE } from "../constant/toast";
import "./AddRuleSet.css";

export default function AddRuleSet() {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      body: [],
      conditions: [],
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
    name: "body",
  });
  const {
    fields: conditionsFields,
    append: conditionsAppend,
    remove: conditionsRemove,
  } = useFieldArray({
    control,
    name: "conditions",
  });
  const {
    fields: actionFields,
    append: actionAppend,
    remove: actionRemove,
  } = useFieldArray({
    control,
    name: "action",
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.promise(
      axios.post(`api/static`, data).then((res) => {}),
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
          <div className="form-section">
            <label>Body</label>
            <ul>
              {bodyFields.map((item, index) => {
                return (
                  <li key={item.id}>
                    <div className="input-row">
                      <input
                        {...register(`body.${index}.name`, { required: true })}
                        placeholder="Isi Field"
                      />
                      <Controller
                        render={({ field }) => (
                          <select {...field}>
                            <option value="" disabled>
                              Pilih
                            </option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                          </select>
                        )}
                        name={`body.${index}.type`}
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
                      <input
                        {...register(`conditions.${index}.operator`, {
                          required: true,
                        })}
                        placeholder="Operator"
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
            <label>Body Action</label>
            <ul>
              {actionFields.map((item, index) => {
                return (
                  <li key={item.id} className="flex flex-wrap">
                    <div className="input-col">
                      <input
                        {...register(`action.${index}.attribute`, {
                          required: true,
                        })}
                        placeholder="Attribute"
                      />
                    </div>
                    <div className="input-col">
                      <Controller
                        render={({ field }) => (
                          <select {...field}>
                            <option value="" disabled>
                              Pilih
                            </option>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                          </select>
                        )}
                        name={`action.${index}.type`}
                        control={control}
                      />
                    </div>
                    <div className="input-col">
                      <input
                        {...register(`action.${index}.label`, {
                          required: true,
                        })}
                        placeholder="Label"
                      />
                    </div>
                    <button type="button" onClick={() => actionRemove(index)}>
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              type="button"
              onClick={() => {
                actionAppend({ attribute: "", type: "", label: "" });
              }}
            >
              Tambah Action
            </button>
          </div>

          <Button disabled={isLoading} fullWidth type="submit">
            Submit
          </Button>
        </form>
      </section>
    </Layout>
  );
}
