import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import HomePage from "../components/pages/homepage";
import Layout from "../components/templates/layout";
import Swal from "sweetalert2";
import { successSwal } from "../helper";
import BookFormPage from "../components/pages/bookFormPage";
import BooksPage from "../components/pages/booksPage";
import MembersPage from "../components/pages/membersPage";
import MemberFormPage from "../components/pages/memberFormPage";
import BookDetailPage from "../components/pages/bookDetailPage";
import MemberDetailPage from "../components/pages/memberDetailPage";

// Initial data and functions for book management
const columnsTableBooks = ["Title", "Author", "Category", "Publication Year", "ISBN","Available", "Edit", "Delete", "Detail"];
const columnsTableMembers = ["Id", "Full Name", "Email", "Gender", "Phone", "Address", "Edit", "Delete", "Detail"];

const AppRouter = () => {
    const getBooksFromLocalStorage = () => {
        const savedBooks = localStorage.getItem('books');
        return savedBooks ? JSON.parse(savedBooks) : [
            { title: "Naruto", author: "Masashi Kishimoto", bookCategory: "Comic", publicationYear: 2020, isbn: "xxxiiixooo", availability: [true] },
            { title: "One Piece", author: "Eiichiro Oda", bookCategory: "Comic", publicationYear: 2020, isbn: "yyyzzzooo", availability: [true] },
            { title: "Dragonball", author: "Akira Toriyama", bookCategory: "Comic", publicationYear: 2020, isbn: "aaabbbooo", availability: [true] }
        ];
    };

    const getMembersFromLocalStorage = () => {
        const savedMembers = localStorage.getItem('members');
        return savedMembers ? JSON.parse(savedMembers) : [
            { id: 1, fullName: "Masashi Kishimoto", email: "test1@gmail.com", gender: "Male", phone: "+6281234567890", address:"Bandung" },
            { id: 2, fullName: "Eiichiro Oda", email: "test2@gmail.com", gender: "Male", phone: "+6281398765432", address:"Jakarta" },
            { id: 3, fullName: "Akira Toriyama", email: "test3@gmail.com", gender: "Male", phone: "+6281398765222", address:"Bogor" }
        ];
    };

    const [books, setBooks] = useState(getBooksFromLocalStorage());
    const [members, setMembers] = useState(getMembersFromLocalStorage());
    const[errors,setErrors] = useState(null);

    useEffect(() => {
        // Save the books to local storage whenever the books state changes
        localStorage.setItem('books', JSON.stringify(books));
    }, [books]);

    useEffect(() => {
        localStorage.setItem('members', JSON.stringify(members));
    }, [members]);

    const categories = [
        { name: 'Comic' },
        { name: 'Novel' },
        { name: 'Biography' }
    ];

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedBookIndex, setSelectedBookIndex] = useState(null);
    const [editingBook, setEditingBook] = useState(null);
    const [detailBook, setDetailBook] = useState(null);
    const [detailMember, setDetailMember] = useState(null);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [editingMember, setEditingMember] = useState(null);

    const handleDetailBook = (index) => {
        const bookDetail = books[index];
        setDetailBook(bookDetail);
    };

    const handleDetailMember = (index) => {
        const memberDetail = members[index];
        setDetailMember(memberDetail);
    };

    const handleEditBook = (index) => {
        setIsFormOpen(false);
        setSelectedBookIndex(index);
        const bookToEdit = books[index];
        setEditingBook(bookToEdit);
        setTimeout(() => {
            setIsFormOpen(true);
        }, 100);
    };

    const handleEditMember = (id) => {
        setIsFormOpen(false);
        setSelectedMemberId(id);
        const memberToEdit = members.find((member)=>member.id === id);
        setEditingMember(memberToEdit);
        setTimeout(() => {
            setIsFormOpen(true);
        }, 100);
    };

    const updateBook = (book) => {
        const updatedBooks = [...books];
        updatedBooks[selectedBookIndex] = book;
        setBooks(updatedBooks);
        successSwal('Book Edited successfully');
        setSelectedBookIndex(null);
        setEditingBook(null);
    };

    const updateMember = (member) => {
        const updatedMembers = [...members];
        member.id = selectedMemberId
        const indexMember = members.findIndex((member)=> member);
        updatedMembers[indexMember] = member;
        setMembers(updatedMembers);
        successSwal('Member Edited successfully');
        setSelectedMemberId(null);
        setEditingMember(null);
    };

    const addBook = (book) => {
        const date = new Date();
        const newErrors = {};
        const isbn = book.isbn;
        const dupplicateIsbn = books.filter((book)=>book.isbn == isbn);

        if(dupplicateIsbn.length > 0) {
            newErrors.isbn = 'Isbn dupplicate detected'
        }
        if(book.isbn < 13) {
            newErrors.isbn = 'Isbn must be at least 13 characters'
        }
        if(!book.title || book.title.length < 3){
            newErrors.title = 'title must be at least 3 characters'
        }
        if(!book.author){
            newErrors.author = 'author is required'
        }
        if(book.publicationYear > date.getFullYear()){
            newErrors.publicationYear = 'year is exceeded from this year'
        }
        if(!book.publicationYear){
            newErrors.publicationYear = 'year is required'
        }
        if(!book.bookCategory){
            newErrors.bookCategory = 'please choose category'
        }
        setErrors(newErrors);

        if(Object.keys(errors).length === 0){
            setBooks([...books, book]);
            successSwal('Book Added successfully');
        }
    };

    const addMember = (member) => {
        const id = uuidv4();
        member.id = id;
        setMembers([...members, member]);
        successSwal('Member Added successfully');
    };

    const handleDeleteBook = (index) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedBooks = books.filter((_, i) => i !== index);
                setBooks(updatedBooks);
                setSelectedBookIndex(null);
                setEditingBook(null);
                successSwal('Book Deleted successfully');
            }
        });
    };

    const handleDeleteMember = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedMembers = members.filter((member) => member.id !== id );
                setMembers(updatedMembers);
                setSelectedMemberId(null);
                setEditingMember(null);
                successSwal('Member Deleted successfully');
            }
        });
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: (
                        <HomePage 
                            totalBooks = {books.length}
                            totalMembers = {members.length}
                        />
                    )
                },
                {
                    path: "/books",
                    element: (
                        <BooksPage
                            books={books}
                            onEdit={handleEditBook}
                            onDelete={handleDeleteBook}
                            onDetail={handleDetailBook}
                            columns={columnsTableBooks}
                        />
                    )
                },
                {
                    path: "/books/add",
                    element: (
                        <BookFormPage 
                            addBook={addBook} 
                            updateBook={updateBook} 
                            editingBook={editingBook} 
                            categories={categories} 
                            isFormOpen={isFormOpen} 
                            setIsFormOpen ={setIsFormOpen}
                            errors = {errors} 
                         />
                    ),
                },
                {
                    path: "/books/edit/:id",
                    element: (
                        <BookFormPage 
                            addBook={addBook} 
                            updateBook={updateBook} 
                            editingBook={editingBook} 
                            categories={categories} 
                            isFormOpen={isFormOpen} 
                            setIsFormOpen ={setIsFormOpen} 
                         />
                    ),
                },
                {
                    path: "/books/:id",
                    element: (
                        <BookDetailPage
                            books={books}
                         />
                    ),
                },
                {
                    path: "/members",
                    element: (
                        <MembersPage
                            members={members}
                            onEdit={handleEditMember}
                            onDelete={handleDeleteMember}
                            onDetail={handleDetailMember}
                            columns={columnsTableMembers}
                        />
                    )
                },
                {
                    path: "/members/add",
                    element: (
                        <MemberFormPage 
                            addMember={addMember} 
                            updateMember={updateMember} 
                            editingMember={editingMember}  
                            isFormOpen={isFormOpen} 
                            setIsFormOpen ={setIsFormOpen} 
                         />
                    ),
                },
                {
                    path: "/members/edit/:id",
                    element: (
                        <MemberFormPage 
                            addMember={addMember} 
                            updateMember={updateMember} 
                            editingMember={editingMember}  
                            isFormOpen={isFormOpen} 
                            setIsFormOpen ={setIsFormOpen} 
                         />
                    ),
                },
                {
                    path: "/members/:id",
                    element: (
                        <MemberDetailPage
                            members={members}
                         />
                    ),
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
