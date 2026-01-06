import axios from "axios";
import { createContext, useContext, useState } from "react";
import authContext from "./authContext";
import { BaseUrl } from "../BaseUrls";
import { ErrorEmitter, SuccessEmitter } from "../ToastEmitter";

export const noteContext = createContext()


function NoteState({ children }) {

    const [allNotes, setAllNotes] = useState([])
    const [allMyNotes, setallMyNotes] = useState([])

    const { token } = useContext(authContext)

    const createNotes = async (note, isPublic, setNote) => {
        try {
            const res = await axios.post(`${BaseUrl}/api/v3.2/note/create`, { ...note, isPublic }, {
                headers: { 'token': token }
            })
            if (res.data.success) {
                SuccessEmitter(res.data.message)
                setNote({ title: "", description: "", tag: "" })
                setAllNotes([...allNotes, res.data.note])
            }
            else {
                ErrorEmitter(res.data.message)
            }
        } catch (error) {
            ErrorEmitter("Internal Server Error")
        }
    }

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`${BaseUrl}/api/v3.2/note/public`, {
                headers: { 'token': token }
            })
            setAllNotes(res.data.note)
        } catch (error) {
            ErrorEmitter("Internal Server Error")
        }
    }
    const fetchMyNotes = async () => {
        try {
            const res = await axios.get(`${BaseUrl}/api/v3.2/note/mynotes`, {
                headers: { 'token': token }
            })
            setallMyNotes(res.data.note)
        } catch (error) {
            ErrorEmitter("Internal Server Error")
        }
    }


    const deleteNotes = async (noteId) => {
        console.log(noteId)
        try {
            const res = await axios.delete(`${BaseUrl}/api/v3.2/note/delete/${noteId}`, {
                headers: { 'token': token }
            })
            if (res.data.success) {
                SuccessEmitter(res.data.message)
                const allNewNotes = allNotes.filter((elm) => {
                    return elm._id != noteId
                })
                setAllNotes(allNewNotes)
            }
            else {
                ErrorEmitter(res.data.message)
            }
        } catch (error) {
            ErrorEmitter("Internal Server Error")
        }
    }


    return (
        <noteContext.Provider value={{ allNotes, fetchMyNotes, allMyNotes, deleteNotes, setAllNotes, fetchNotes, createNotes }}>
            {children}
        </noteContext.Provider>
    )
}

export default NoteState


export const useNotes = () => {
    return useContext(noteContext)
}
