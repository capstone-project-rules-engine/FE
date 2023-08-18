
import clsx from "clsx";
import React  from "react";


const Input = React.forwardRef (({
  label,
  id,
  register,
  required,
  type="text",
  disabled,
  ...rest
},ref) => {
  return ( 
    <div>
      <label 
        htmlFor={id} 
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          name={id}
          disabled={disabled}
          ref={ref}
          {...rest}
          className={clsx(`
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5
            px-2 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6`, 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
      </div>
    </div>
   );
}
)
 
export default Input;