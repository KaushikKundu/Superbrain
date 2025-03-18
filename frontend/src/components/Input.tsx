interface InputProps {
    placeholder: string;
    reference?: any;
    onChange?:()=> void;
    name?:string;
}

const Input = ({placeholder,reference,onChange,name}:InputProps) => {
    return (
        <div className="mb-6">
            <input type="text" ref={reference} placeholder={placeholder} name={name} className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500" onChange={onChange} />
        </div>
      );
}
export default Input;