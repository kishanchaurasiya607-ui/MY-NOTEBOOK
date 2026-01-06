import axios from "axios";
import { useContext, useState } from "react";
import { BaseUrl } from "../BaseUrls";
import authContext from "../context/authContext";
import { useNotes } from "../context/NoteState";
import { Link } from "react-router-dom";

const CreateNote = () => {

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
        image: ""
    })
    const [isPublic, setIsPublic] = useState(false);

    const { token } = useContext(authContext)
    const { createNotes } = useNotes()

    const submitHandlers = (e) => {
        e.preventDefault()
        createNotes(note, isPublic, setNote)
    }

    console.log(token)


    const changeHandler = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="flex px-6 flex-col items-center pb-16 bg-gray-100">
            <div className="mx-auto pt-12 max-w-xl text-center">
                <h1 className="text-3xl capitalize font-bold dark:text-gray-800 sm:text-5xl">
                    Create note with
                    <strong className="font-bold text-red-700 py-3 sm:block">
                        {" "}
                        - safe and secure{" "}
                    </strong>
                </h1>
            </div>
            <form className="mt-6 w-1/2 max-lg:w-full mb-0 space-y-4 rounded-lg p-4 shadow-sm sm:p-6 lg:p-8" onSubmit={submitHandlers}>
                <div>
                    <label htmlFor="title" className="">
                        Title<span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="title"
                            name="title"
                            value={note.title}
                            onChange={changeHandler}
                            type="text"
                            className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
                            placeholder="Enter notes title"
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <label htmlFor="description" className="">
                        Description <span className="text-rose-500">*</span>
                    </label>

                    <div className="relative">
                        <textarea
                            id="description"
                            name="description"
                            rows={5}
                            value={note.description}
                            onChange={changeHandler}
                            cols={100}
                            type="description"
                            className="w-full mt-2 border-2 outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                            placeholder="Enter notes description"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="tag" className="">
                        Tag(optional)
                    </label>
                    <div className="relative">
                        <input
                            id="tag"
                            value={note.tag}
                            onChange={changeHandler}
                            name="tag"
                            type="text"
                            className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
                            placeholder="Enter notes tag"
                        />
                    </div>
                </div>
                {/* <fieldset className="w-full space-y-1 dark:text-gray-800">
                    <label htmlFor="files" className="block text-sm font-medium">
                        Attachments
                    </label>
                    <div className="flex">
                        <input
                            type="file"
                            name="files"
                            id="files"
                            className="px-3 py-6 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100"
                        />
                    </div>
                </fieldset> */}
                <div>
                    <label htmlFor="image" className="">
                        Image(optional)
                    </label>
                    <div className="relative">
                        <input
                            id="image"
                            value={note.image}
                            onChange={changeHandler}
                            name="image"
                            type="text"
                            className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
                            placeholder="Enter image source URL"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="tag" className="">
                        Public
                    </label>
                    <label for="AcceptConditions" class="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] has-checked:bg-green-500">
                        <input type="checkbox" id="AcceptConditions" className="peer sr-only" onChange={(e) => {
                            setIsPublic(e.target.checked);
                        }} />

                        <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                            </svg>
                        </span>
                    </label>
                </div>

                <div className="flex mt-5 justify-between  gap-5">
                    <button
                        type="submit"
                        className="block max-sm:w-32 rounded-lg bg-rose-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Add Notes
                    </button>
                    <Link
                        to="/notes"
                        type="submit"
                        className="block max-sm:w-32 rounded-lg bg-rose-900 px-5 py-3 text-sm font-medium text-white"
                    >
                        Your Notes
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default CreateNote;
