interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <input className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" {...props} />
  </div>
);
