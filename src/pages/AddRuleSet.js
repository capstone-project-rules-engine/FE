
import * as React from "react";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import toast from "react-hot-toast";
import axios from "axios"
import Input from "../components/Input";
import Button from "../components/Button";
import { Layout } from "../components/Layout";
import { DEFAULT_TOAST_MESSAGE } from "../constant/toast";

export default function AddRuleSet() {

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }
    ];
    

    const [isLoading, setIsloading] = React.useState(false)
    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            name: '',
            body: [],
            conditions: [],
            action: {
                atribute: '',
                label: '',
                type: ''
            },
            description: {
                condition: '',
                action: ''
            },
            rules: [],
        }
    })

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
            axios.post(`api/static`, data)
              .then((res) => {
              }),
            {
              ...DEFAULT_TOAST_MESSAGE,
              success: 'Ruleset Successfully Created',
            }
          );

    }
    return (
        <Layout>
            <section className="layout">
             
                <form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("name")} id="name" />
                    
                    <div>
                        <label>
                            Body
                        </label>
                        <ul>
                            {bodyFields.map((item, index) => {
                                return (
                                    <li key={item.id}>
                                        <input
                                            {...register(`body.${index}.name`, { required: true })}
                                        />

                                        <Controller
                                            render={({ field }) => <select {...field}>
                                                <option value="" disabled>pilih</option>
                                                <option value="volvo">Volvo</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>}
                                            name={`body.${index}.type`}
                                            control={control}
                                        />
                                        <button type="button" onClick={() => bodyRemove(index)}>
                                            Delete
                                        </button>
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

                    <div>
                        <label>
                            conditions
                        </label>
                        <ul>
                            {conditionsFields.map((item, index) => {
                                return (
                                    <li key={item.id} className="flex flex-wrap">
                                        <div className="flex flex-col">
                                        <label>
                                            Atribute
                                        </label>
                                        <input
                                            {...register(`conditions.${index}.attribute`, { required: true })}
                                        />
                                        </div>
                                        <div className="flex flex-col">
                                        <label>
                                            operator
                                        </label>
                                        <input
                                            {...register(`conditions.${index}.operator`, { required: true })}
                                        />
                                        </div>
                                        <div className="flex flex-col">
                                        <label>
                                            label
                                        </label>
                                        <input
                                            {...register(`conditions.${index}.label`, { required: true })}
                                        />
                                        </div>
                                        <button type="button" onClick={() => conditionsRemove(index)}>
                                            Delete
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <button
                            type="button"
                            onClick={() => {
                                conditionsAppend({ atribute: "", operator: "", label: "" });
                            }}
                        >
                            Tambah conditions
                        </button>
                    </div>

                    <div>
                        <label>
                            Body
                        </label>
                        <ul>
                            {actionFields.map((item, index) => {
                                return (
                                    <li key={item.id}>
                                        <input
                                            {...register(`action.${index}.attribute`, { required: true })}
                                        />

                                        <Controller
                                            render={({ field }) => <select {...field}>
                                                <option value="" disabled>pilih</option>
                                                <option value="volvo">Volvo</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>}
                                            name={`action.${index}.type`}
                                            control={control}
                                        />
                                        <div className="flex flex-col">
                                        <label>
                                            label
                                        </label>
                                        <input
                                            {...register(`action.${index}.label`, { required: true })}
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
                                actionAppend({ attibute: "", type: "",label:"" });
                            }}
                        >
                            Tambah action
                        </button>
                    </div>
                    <Button disabled={isLoading} fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </section>
        </Layout>
    )
}