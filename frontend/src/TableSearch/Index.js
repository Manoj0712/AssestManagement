import React, { useEffect, useState } from 'react';
import { InputTag } from '../Common/InputTag.js'
import { Button } from '../Common/Button.js'
export default function Index() {
    const [totalPosts, setTotalPosts] = useState([])
    const [totalPostsEntryCopy, setTotalPostsEntryCopy] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [startCount, setStartCount] = useState("")
    const [endCount, setEndCount] = useState("")
    const [dataLoadingCount, setDataLoadingCount] = useState()
    const [id, setId] = useState()
    const [body, setBody] = useState()
    const [title, setTitle] = useState()
    let setCountChange = (tot) => {
        setDataLoadingCount(10)
        setStartCount(1)
        if (tot.length > 10) {
            if (Math.floor(tot.length / 10) >= 5) {
                setEndCount(5)
            } else {
                let cot = Math.floor(tot.length / 10) + 1
                setEndCount(cot)
            }
        } else {
            setEndCount(1)
        }
    }
    useEffect(() => {
        const fectchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const jsonResponse = await response.json()
            if (response.ok) {
                setIsLoading(false)
                let tot = jsonResponse
                setTotalPostsEntryCopy(tot)
                setTotalPosts(tot)
                setCountChange(tot)
            }
        }
        fectchPosts()
    }, [])

    useEffect(() => {
        let post = totalPostsEntryCopy.slice(dataLoadingCount - 10, dataLoadingCount)
        setPosts(post)
    }, [dataLoadingCount, totalPostsEntryCopy])

    useEffect(() => {
        let fillterDataFromTotalList = totalPosts
        if (id || title || body) {
            if (id) {
                fillterDataFromTotalList = fillterDataFromTotalList.filter((obj) => {
                    return obj.id === Number(id)
                })
            }
            if (title) {
                fillterDataFromTotalList = fillterDataFromTotalList.filter((obj) => {
                    return obj.title.includes(title)
                })
            }
            if (body) {
                fillterDataFromTotalList = fillterDataFromTotalList.filter((obj) => {
                    return obj.body.includes(body)
                })
            }
            setCountChange(fillterDataFromTotalList)
            let post = fillterDataFromTotalList.slice(dataLoadingCount - 10, dataLoadingCount)
            setPosts(post)
            setTotalPostsEntryCopy(fillterDataFromTotalList)
        } else {
            let post = totalPosts.slice(dataLoadingCount - 10, dataLoadingCount)
            setPosts(post)
            setDataLoadingCount(10)
            setTotalPostsEntryCopy(totalPosts)
        }
    }, [id, body, title])
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    //intermadiate
    // form handling,data Handling,reconciliation process,Hooks,custom hooks,context
    //css
    //basic selectors,pseudo-Classes,Box-model,flexbox,grid,positioning,units
    //javascript
    //variable Declaration,template literals,functions and arrow functions,object destructuring,spread and rest Operators,map,foreach,promises and Async,import and export.
    //Advanced
    //lazy loading,portals,Routing,Theming,paterterns.    
    function indexCount(type, pos) {
        if (type === "increase") {
            if (pos.length > 10) {
                if (Math.floor(pos.length / 10) > 5) {
                    let lengthCal
                    if ((pos.length) % 10 === 0) {
                        lengthCal = (Math.floor(pos.length / 10))
                    } else {
                        lengthCal = ((Math.floor(pos.length / 10)) + 1)
                    }
                    if ((startCount + 5) <= lengthCal) {
                        setStartCount(startCount + 1)
                        setEndCount(endCount + 1)
                    }
                } else {
                    setStartCount(1)
                    let cot = Math.floor(pos.length / 10) + 1
                    setEndCount(cot)
                }
                if (dataLoadingCount < pos.length) {
                    setDataLoadingCount(dataLoadingCount + 10)
                }
            } else {
                setStartCount(1)
                setEndCount(1)
            }
        } else if (type === "decrease") {
            if (pos.length > 10) {
                if (Math.floor(pos.length / 10) > 5) {
                    if ((endCount - 5) >= 1) {
                        setStartCount(startCount - 1)
                        setEndCount(endCount - 1)
                    }
                } else {
                    setStartCount(1)
                    let cot = Math.floor(pos.length / 10) + 1
                    setEndCount(cot)
                }
                if (dataLoadingCount > 10) {
                    setDataLoadingCount(dataLoadingCount - 10)
                }
            } else {
                setStartCount(1)
                setEndCount(1)
            }
        }
    }
    let datashow = (count) => {
        setDataLoadingCount(count * 10)
    }
    function fun() {
        var list = []
        list.push(<Button key={19} value={`>`} clickEvent={() => { indexCount("increase", totalPostsEntryCopy) }} />)
        for (let i = startCount; i <= endCount; i++) {
            list.push(<Button key={i} value={i} clickEvent={() => { datashow(i) }} />)
        }
        list.push(<Button value={`<`} key={20} clickEvent={() => { indexCount("decrease", totalPostsEntryCopy) }} />)
        return list
    }
    let filterDataLoading = (event, countId) => {
        if (countId === "id") {
            setId(event.target.value)
        } else if (countId === "title") {
            setTitle(event.target.value)
        } else if (countId === "body") {
            setBody(event.target.value)
        }
    }
    return (
        <div className='flex flex-col p-5'>
            <div className="flex items-center justify-center">
                <table>
                    <tbody>
                        <tr className='border-2 border-blue-800'>
                            <th className='border-2 border-blue-800'>CODE OR ID</th>
                            <th className='border-2 border-blue-800'>TITLE</th>
                            <th className='border-2 border-blue-800'>BODY</th>
                        </tr>
                        <tr className='border-2 border-blue-800'>
                            <td width="20%" className='p-2 border-2 border-blue-800'><InputTag name="code" placeholder="Enter Code" onchange={(event) => { filterDataLoading(event, "id") }} fillterValue={id} /></td>
                            <td width="30%" className='p-2 border-2 border-blue-800'><InputTag name="title" placeholder="Enter Title" onchange={(event) => { filterDataLoading(event, "title") }} fillterValue={title} /></td>
                            <td width="50%" className='p-2 border-2 border-blue-800'><InputTag name="body" placeholder="Enter Body" onchange={(event) => { filterDataLoading(event, "body") }} fillterValue={body} /></td>
                        </tr>
                        {posts.map((obj) => {
                            return (
                                <tr key={obj.id}>
                                    <td width="20%" className='border-2 border-blue-800'>{obj.id}</td>
                                    <td width="30%" className='border-2 border-blue-800'>{obj.title}</td>
                                    <td width="50%" className='border-2 border-blue-800'>{obj.body}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <div className='flex justify-end'>
                                    {
                                        fun()
                                    }
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    );
}