import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';

const SelectField = ({ label, options, id, value, onChange, className }) => (
    <div className="mb-3">
        <Label htmlFor={id} className="form-label">{label}</Label>
        <select id={id} className={className} value={value} onChange={onChange}>
            <SelectOption value="" disabled>Choose Book Category</SelectOption>
            {options.map((option, index) => (
                <SelectOption key={index} value={option.name}>{option.name}</SelectOption>
            ))}
        </select>
    </div>
);

export default SelectField;
