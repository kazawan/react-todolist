function svg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    )
}

function emptyIcon() {
    return (

        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 5h2v2H5zm4 4H7V7h2zm2 2H9V9h2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2zm2-2v2h-2V9zm2-2v2h-2V7zm0 0V5h2v2z" /></svg>
    )
}

function emptyIcon2() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h14v2H5zm0 16H3V5h2zm14 0v2H5v-2zm0 0h2V5h-2zM10 8H8v2h2zm4 0h2v2h-2zm-5 8v-2h6v2h2v-2h-2v-2H9v2H7v2z" /></svg>
    )
}


export default function TodoEmpty() {
    return (
        <div className=" w-full bg-gray-400/30 mt-2 rounded-md px-2 flex flex-col justify-center items-center text-gray-800 h-32">
            <div className=" rounded-md px-2 flex flex-col justify-center items-center border-dotted border-white/30 border-2 ">
                <h2>Todo Empty</h2>
                <div  className=" flex text-red-400">
                    {emptyIcon2()}
                    {emptyIcon()}
                </div>

            </div>

        </div>
    )
}