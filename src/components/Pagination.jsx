import { useEffect, useMemo, useState } from "react"
import TodoEmpty from "./TodoEmpty"
import Toast from "../toast"

export default function Pagination({ children, isEmtpy, todolist, filter }) {
    const { msg } = Toast()
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem('currentPage') || 
        1
        )

    const pageItemLimit = 10
    const pageButtonLimit = 7


    const rebuild = useMemo(() => {
        const arr = []
        todolist.map((item, index) => {
            if (item === undefined) return
            arr.push(item)
        })
        // console.log(arr)
        return arr.map((item, index) => {
            if (index >= (currentPage - 1) * pageItemLimit && index < currentPage * pageItemLimit) {
                return item
            }
        })

    }, [todolist, currentPage])





    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(rebuild.length / pageItemLimit); i++) {
        pageNumbers.push(i)
    }

   





    const slectedStyle = `px-4 text-[.8rem] py-2 mx-2 bg-blue-500 text-white rounded-md`
    const unSelectedStyle = `px-4 text-[.8rem] py-2 mx-2 bg-gray-500 text-white rounded-md`

    

    const buttonStyle =  useMemo(()=>{
        return (number) => {
            if (currentPage === number) {
                return slectedStyle
            } else {
                return unSelectedStyle
            }
        }
    },[currentPage,setCurrentPage,todolist]) 
    

    const handlePage = (number) => {
        setCurrentPage(number)
    }


    const pageButton = useMemo(() => {
        let lastPage = pageNumbers.length
        return pageNumbers.map((number) => {
            if(currentPage > lastPage   ){ setCurrentPage(1)}
            if (number > currentPage + pageButtonLimit - 1 - 2) return
            if (number < currentPage - pageButtonLimit + 1 + 2) return

            if (number === currentPage + pageButtonLimit - 1 - 2) {
                return <button key={number} className={unSelectedStyle}
                    onClick={() => handlePage(lastPage)}
                >Last-{lastPage}</button>
            }
            if (number === currentPage - pageButtonLimit + 1 + 2) {
                return <button key={number} className={unSelectedStyle}
                    onClick={() => handlePage(1)}
                >Top</button>
            }

            return (
                <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={buttonStyle(number)}
                >
                    {number}
                </button>
            )
        })
    }, [pageNumbers, filter, pageButtonLimit, currentPage])

    const handleNext = () => {
        if (currentPage === Math.ceil(rebuild.length / pageItemLimit)) {
            msg().warning('最后一页啦傻逼')
            return
        }
        setCurrentPage((prev) => prev + 1)
    }
    const handlePrev = () => {
        if (currentPage === 1) {

            msg().warning('前面没有啦')
            return

        }


        setCurrentPage((prev) => prev - 1)
    }



    useEffect(() => {
        // console.log('set page')
        // const page = localStorage.getItem('currentPage')
        localStorage.setItem('currentPage', currentPage)
        
        // setCurrentPage(localStorage.getItem('currentPage'))
    }, [todolist,currentPage])


    return (
        <>
            <div className=" min-h-[500px]">
                {isEmtpy === true ? <TodoEmpty /> : rebuild}

            </div>
            <div className=" text-center">
                {currentPage} / {Math.ceil(rebuild.length / pageItemLimit)}
            </div>
            <div className="w-full grid grid-cols-12 justify-center items-center mt-2 ">
                <div className=" col-span-1 flex justify-center " >
                    <button className={slectedStyle}
                        onClick={handlePrev}
                    > prev</button>
                </div>
                <div className=" col-span-10 flex justify-center">
                    {pageButton}

                </div>
                <div className=" col-span-1  flex justify-center">
                    <button className={slectedStyle}
                        onClick={handleNext}
                    > next</button>
                </div>

            </div>
        </>

    )
}