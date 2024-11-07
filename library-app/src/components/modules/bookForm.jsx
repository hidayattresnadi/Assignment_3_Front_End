import { useState, useEffect, useRef } from 'react';
import InputField from '../widgets/inputField';
import SelectField from '../widgets/selectField';
import Button from '../elements/button';
import { useNavigate } from 'react-router-dom';
import CheckboxGroup from '../widgets/checkboxGroup';

const BookForm = ({ addBook, updateBook, editingBook, categories, isFormOpen, setIsFormOpen,errors }) => {
    const navigate = useNavigate();
    const titleInputRef = useRef();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        bookCategory: '',
        publicationYear: '',
        isbn: '',
        availability: []
    });

    useEffect(() => {
        if (editingBook) {
            setFormData({
                title: editingBook.title,
                author: editingBook.author,
                bookCategory: editingBook.bookCategory,
                publicationYear: editingBook.publicationYear,
                isbn: editingBook.isbn,
                availability: editingBook.availability
            });
        } else {
            setFormData({
                title: '',
                author: '',
                bookCategory: '',
                publicationYear: '',
                isbn: '',
                availability: []
            });
        }
    }, [editingBook]);

    useEffect(() => {
        if (isFormOpen && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isFormOpen]);

    const handleInputChange = (e, id) => {
    const { type, checked } = e.target;

    setFormData((prevData) => {
        if (type === "checkbox") {
            // For checkbox inputs, handle the `availability` array
            let updatedAvailability = [...prevData.availability];

            if (checked) {
                // Add to the array if checked
                updatedAvailability = [...updatedAvailability, id];
            } else {
                // Remove from the array if unchecked
                updatedAvailability = updatedAvailability.filter(item => item !== id);
            }

            return {
                ...prevData,
                availability: updatedAvailability, // Update the availability array
            };
        } else {
            // For text inputs or other fields, update them normally
            return {
                ...prevData,
                [id]: e.target.value, // Update the value based on the field id
            };
        }
    });
};

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingBook) {
            const result = updateBook(formData);
            if(Object.keys(result).length === 0){
                navigate('/books')
                setFormData({
                    title: '',
                    author: '',
                    bookCategory: '',
                    publicationYear: '',
                    isbn: '',
                    availability: []
                });
                setIsFormOpen(false);
            }
            
        } else {
            const result = addBook(formData);
            if(Object.keys(result).length === 0){
                setFormData({
                    title: '',
                    author: '',
                    bookCategory: '',
                    publicationYear: '',
                    isbn: '',
                    availability: []
                });
                setIsFormOpen(false);
            }
        }
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const optionss = [
        { id: true, label: 'Is Available' },
    ];

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Title"
                    type="text"
                    ref={titleInputRef}
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange(e,'title')}
                />
                {errors?.title ? <h6 className='text-start'>{errors.title}</h6> : ''}
                <InputField
                    label="Author"
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange(e,'author')}
                />
                {errors?.author ? <h6 className='text-start'>{errors.author}</h6> : ''}
                <InputField
                    label="Publication Year"
                    type="text"
                    placeholder="Example: 2023"
                    pattern="\d*"
                    id="publicationYear"
                    value={formData.publicationYear}
                    onChange={(e) => handleInputChange(e,'publicationYear')}
                />
                {errors?.publicationYear ? <h6 className='text-start'>{errors.publicationYear}</h6> : ''}
                <InputField
                    label="ISBN"
                    type="text"
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => handleInputChange(e,'isbn')}
                />
                {errors?.isbn ? <h6 className='text-start'>{errors.isbn}</h6> : ''}
                <SelectField
                    label="Book Category"
                    id="bookCategory"
                    options={categories}
                    value={formData.bookCategory}
                    onChange={(e) => handleInputChange(e,'bookCategory')}
                    className="form-select"
                />
                {errors?.bookCategory ? <h6 className='text-start'>{errors.bookCategory}</h6> : ''}

                <CheckboxGroup
                    options={optionss}
                    checked={formData.availability}
                    onChange={handleInputChange}
                />
                <Button onClick={openForm} type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default BookForm;
