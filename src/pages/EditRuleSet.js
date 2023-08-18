import axios from 'axios'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Input from '../components/Input';
import { Layout } from '../components/Layout';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { DEFAULT_TOAST_MESSAGE } from '../constant/toast';

const EditRuleSet = () => {
    const [data, setData] = React.useState()
    const [isLoading, setIsloading] = React.useState(false)
    const param = useParams()
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {
            errors,
        }
    } = useForm({
        mode: "onBlur"
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
        // toast.promise(
        //     axios.post(`api/static`, data)
        //       .then((res) => {
        //       }),
        //     {
        //       ...DEFAULT_TOAST_MESSAGE,
        //       success: 'Ruleset Successfully Created',
        //     }
        //   );

    }

    React.useEffect(() => {
        getdata()
    }, [])

    React.useEffect(() => {
        if (data) {
            console.log(data[0].action);
            reset({
                name: data[0].name,
                body: data[0].body,
                conditions:data[0].conditions,
                action:[data[0].action]
            })
        }
    }, [data])
    const getdata = async (params) => {
        const respon = await axios.get(`${process.env.REACT_APP_URL}/api/rule/${param.ruleid}`)
        console.log(respon.data);
        setData(respon.data)
    }


    return (
        <Layout>
            <section className='layout'>

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
                                conditionsAppend({ attribute: "", operator: "", label: "" });
                            }}
                        >
                            Tambah conditions
                        </button>
                    </div>

                    <div>
                        <label>
                            Tmabah Action
                        </label>
                        
                        
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

export default EditRuleSet