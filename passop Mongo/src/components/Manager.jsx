import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getpasswords = async () => {
      let req = await fetch("http://localhost:3000/")
      let passwords = await req.json();
      setPasswordArray(passwords)
    }
    

    useEffect(() => {
        getpasswords()
        
    }, [])

    const showpassword = () => {

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }
    }

    const savePasssword = async () => {
        if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){

            await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-type": "application/json"},body: JSON.stringify({id: form.id})});

            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
             await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-type": "application/json"},body: JSON.stringify({...form, id: uuidv4()})});

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))

            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('🦄 Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
             toast('🦄 Password Not Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletepasssword = async (id) => {
        console.log("Deleting the Password of id:", id)
        let c = confirm("Do you really want to Delete This Password ");
        if (c) {
            
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
             let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-type": "application/json"},body: JSON.stringify({id})});
            //     console.log([...passwordArray, form])
            toast('🦄 Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        }
    }

    const editpasssword = (id) => {
        console.log("Editing the Password of id:", id)
        setform({...passwordArray.filter(i=>i.id===id)[0], id:id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    //     localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    //     console.log([...passwordArray, form])
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('🦄 Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }




    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            <div className=" px-4 md:px-40">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

                <div className=' flex flex-col  p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='bg-white border border-green-900 rounded-full text-black p-4 py-1 w-full' type="text" name='site' id='site' />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white border border-green-900 rounded-full text-black p-4 py-1 w-full' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white border border-green-900 rounded-full text-black p-4 py-1 w-full' type="password" name='password' id='password' />
                            <span className='absolute right-2 top-1 cursor-pointer' onClick={showpassword}><img ref={ref} className='' width={26} src="icons/eye.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePasssword} className='flex justify-center items-center bg-green-600 px-5 py-2 rounded-full w-fit border-2 border-green-900 hover:bg-green-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-1">
                            <thead className='bg-green-900 text-white'>
                                <tr>
                                    <th className='py-1.5'>Websits</th>
                                    <th className='py-1.5'>Usernames</th>
                                    <th className='py-1.5'>Passwords</th>
                                    <th className='py-1.5'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>

                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className='flex items-center justify-center '>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }} >
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className='flex justify-center items-center'>
                                                <span>{item.username}</span>
                                                <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <div className='flex justify-center items-center'>
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center w-32'>
                                            <span className='cursor-pointer mx-2' onClick={() => {editpasssword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-2' onClick={() => {deletepasssword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                </div>
            </div>


        </>
    )
}

export default Manager
