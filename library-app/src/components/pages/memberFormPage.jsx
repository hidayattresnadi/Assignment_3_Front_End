import MemberForm from '../modules/memberForm'
import FormLayout from '../templates/FormLayout';

function MemberFormPage({ addMember, updateMember, editingMember, isFormOpen, setIsFormOpen, errors }) {
    return (
        <FormLayout title={editingMember ? "Form to Update Member" : "Form to Add Member"}>
            <MemberForm 
                addMember={addMember} 
                updateMember={updateMember} 
                editingMember={editingMember}  
                isFormOpen={isFormOpen} 
                setIsFormOpen={setIsFormOpen}
                errors={errors} 
            />
        </FormLayout>
    )
}

export default MemberFormPage;