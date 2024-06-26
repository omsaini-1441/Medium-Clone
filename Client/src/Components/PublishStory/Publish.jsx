import React, { useEffect, useState } from 'react'
import Navbar from "../HomePage/Navbar"
import { ArrowRight } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

const Publish=()=>{
    const [email, setEmail] = useState("");
    const [check, set] = useState(false);
    const [storyData, setData] = useState([]);

    const showStory = async (em) => {

        const res = await fetch("/MyStory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: em
            })
        })
        const data = await res.json();

        if (data.message == 'error') {

        }
        else {
            const arr = [];
            //  console.log(data.message)
            data.message.map((ele, id) => {
                arr.push(ele)
            })
            setData([arr[arr.length - 1]]);
            set(true);
        }
    }
    useEffect(() => {
        const email = sessionStorage.getItem("email");

        setEmail(email);
        showStory(email);
    }, [])

    return (
        <div className='w-100'>
            <Navbar />
            {check == false ? <div className='text-center mt-5'>You have Nothing in your story</div> :

                <div  className="container-fluid w-75 " style={{overflow:"hidden"}}>
                    {storyData.map((ele, id) => {
                        return <div key={id} className="mt-4 p-1 w-75 mx-auto  container-fluid"> 
                         <h1>{ele.title}</h1>
                         <h6 style={{ marginLeft: "25px" }}><span style={{fontSize:"20px"}}>@</span><span className='text-danger' style={{fontWeight:"bold"}}>{ele.name}</span>  <NavLink  key={"/InfoSection"}
                         to="/InfoSection"
                         state={{ story:ele}}
                         ><ArrowRight color="royalblue" size={30} style={{marginLeft:"40%"}}/></NavLink></h6><h5 style={{ marginLeft: "40px" }}>{ele.desc.substring(0,100)}....</h5><p style={{ fontSize: "15px" ,marginLeft: "50%" }}>{ele.date}</p></div>
                    })}

                </div>

            }
        </div>
    )
}

export default Publish