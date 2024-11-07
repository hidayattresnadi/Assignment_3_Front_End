import Form from '../modules/bookForm'
import FormLayout from '../templates/FormLayout';

function BookFormPage({ addBook, updateBook, editingBook, categories, isFormOpen, setIsFormOpen,errors={errors}  }) {
    return (
        <FormLayout title={editingBook ? "Form to Update Book" : "Form to Add Book"}>
            <Form 
                addBook={addBook} 
                updateBook={updateBook} 
                editingBook={editingBook} 
                categories={categories} 
                isFormOpen={isFormOpen} 
                setIsFormOpen={setIsFormOpen}
                errors={errors}
            />
        </FormLayout>
    )
}

export default BookFormPage;