import { useState, useEffect, useRef } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';
import RadioGroup from './radioGroup';

const MemberForm = ({ addMember, updateMember, editingMember, isFormOpen, setIsFormOpen }) => {
    const navigate = useNavigate();
    const fullNameInputRef = useRef();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        if (editingMember) {
            setFormData({
                fullName: editingMember.fullName,
                email: editingMember.email,
                gender: editingMember.gender,
                address: editingMember.address,
                phone: editingMember.phone
            });
        } else {
            setFormData({
                fullName: '',
                email: '',
                gender: '',
                address: '',
                phone: ''
            });
        }
    }, [editingMember]);

    useEffect(() => {
        if (isFormOpen && fullNameInputRef.current) {
            fullNameInputRef.current.focus();
        }
    }, [isFormOpen]);

    const handleInputChange = (e) => {
        const { id, name ,value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingMember) {
            updateMember(formData);
            navigate('/members')
        } else {
            addMember(formData);
        }

        setFormData({
            fullName: '',
            email: '',
            gender: '',
            address: '',
            phone: ''
        });
        setIsFormOpen(false);
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const options = [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" }
    ];

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Full Name"
                    type="text"
                    required
                    ref={fullNameInputRef}
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Email"
                    type="email"
                    required
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Address"
                    type="text"
                    required
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                <InputField
                    label="Phone Number"
                    type="text"
                    required
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <RadioGroup
                    options={options}
                    name="gender"
                    selectedValue={formData.gender}
                    onChange={handleInputChange}
                />
                <Button onClick={openForm} type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default MemberForm;
