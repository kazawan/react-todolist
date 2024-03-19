
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client';
import useValidator from '../hooks/useValidator';
import Toast from '../toast';


function ModalBox({ closeAction, updataAction, id, title }) {
    const [text, setText] = useState('')
    const inputer = useRef(null)
    const { validateTitle } = useValidator()
    const { msg } = Toast()
    useEffect(() => {
        inputer.current.focus()
        setText(title)
    }, [])

    function handleChange(e) {
        // console.log(e.target.value)
        setText(e.target.value)
    }



    function handleClose(e) {
        e.preventDefault()
        closeAction()
    }

    function handleClick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (!validateTitle(text)) {
            msg().error('不是！ 你有病吧，填个空？')
            return
        }
        updataAction(e, id, text)
        closeAction()



    }

    function keyboradPress(e) {
        if (e.key === 'Enter') {
            handleClick(e)
        }
    }

    function handleNoClick(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    return (
        <>
            <div className='
                w-full
                h-full
                fixed
                top-0
                left-0                
                bg-black
                bg-opacity-50
                text-white
                text-2xl
                animate-fade-in 
            '
                onClick={(e) => handleClose(e)}
            >
                <div className=' container  mx-auto my-auto flex justify-center items-center  relative'>
                    <div
                        className='
                            w-[60%]
                            min-w-[500px]
                            h-96
                            bg-white
                            rounded-lg
                            shadow-2xl
                            flex
                            flex-col
                            justify-center
                            items-center
                            text-black
                            animate-fade-in-down
                            absolute
                            top-[200px]
                            
                        '
                        onClick={(e) => handleNoClick(e)}
                    >
                        <div className=' w-[80%] text-start'>
                            内容修改
                        </div>
                        <input type="text" onChange={(e) => handleChange(e)}
                            value={text}
                            placeholder={title}
                            className=' bg-gray-200 p-2 rounded-lg w-[80%]  text-black'
                            ref={inputer}
                            onKeyUp={(e) => keyboradPress(e)}
                        />
                        <div className='
                            bg-blue-500
                            text-white
                            p-2
                            rounded-lg
                            w-[80%]
                            mt-2
                            hover:bg-blue-600
                            transition
                            duration-200
                            ease-in-out
                            transform
                            hover:scale-102
                            text-center
                            cursor-pointer
                            text-sm
                       '
                            onClick={(e) => handleClick(e)}
                        >
                            提交
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default function Modal() {
    let div = document.createElement('div')
    let body = document.body

    function closeAction() {
        body.removeChild(div)
        div.remove()

        // document.body.removeChild(div)
    }

    function pop(updataAction, id, title) {

        createRoot(div).render(<ModalBox closeAction={closeAction}
            updataAction={updataAction}
            id={id} title={title}

        />)
        body.append(div)
    }
    return {
        pop
    }
}