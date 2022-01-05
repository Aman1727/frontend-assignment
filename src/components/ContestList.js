import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'
import Graph from "./Graph"

// Styles
import './ContestList.css'

export default function ContestList({filteredContests, isFav}) {
    // console.log(filteredContests)
    const [currentPage, setCurrentPage] = useState(1)
    const [ContestPerPage, setContestPerPage] = useState("100")
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        setCurrentPage(1)
    }, [filteredContests])

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.textContent))
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    if(isFav){
        filteredContests = favorites
    }


    const indexOfLastContest = currentPage * ContestPerPage
    const indexOfFirstContest = indexOfLastContest - ContestPerPage
    const currentContests = filteredContests.slice(indexOfFirstContest, indexOfLastContest)


    const addFav = (props) => {
        let array = favorites ;
        let addArray = true;
        array.map((item, key) => {
            if (item == props.contest) {
                array.splice (key, 1);
                addArray = false;
            }
        })
        if (addArray){
            array.push (props.contest)
        }
        setFavorites([...array])
    }
    

    
    const renderContests = currentContests.map((contest, index) => {
        var dateTime = new Date(contest.startTimeSeconds * 1000);
        var fullStringDate = dateTime.toLocaleString()
        var date = fullStringDate.slice(0, 10)
        var time = fullStringDate.slice(11, 20)
        return (
              <tr key={contest.id}>
                <td>
                    <Link key={contest.id} to={`contests/${contest.id}`} style={{textDecoration: 'none'}}>
                        {contest.name}
                    </Link>
                </td>
                <td>{contest.type}</td>
                <td>{date} <br /> {time}</td>
                <td>{contest.phase}</td>
                <td>
                {favorites.includes(contest) ?
                    (<AiFillStar
                    onClick={() => addFav({ filteredContests, contest })}
                    style={{ color: '#666' }} 
                    />) :
                    (<AiOutlineStar
                    onClick={() => addFav({ filteredContests, contest })}
                    style={{ color: '#666' }}
                    />)
                }
                </td>
              </tr>
            )
    })

    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(filteredContests.length/ContestPerPage); i++){
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <button
                key={number}
                onClick={handleClick}
                id = {number}
                className={`paginationItem ${currentPage === number ? 'active' : null}`}
            >
            <span>{number}</span>
            </button>
        )
    })

    return (
        <div style={{marginTop: '50px'}}>
            <Graph filteredContests = {filteredContests}/>
            <div className="list">
                <Table style={{border: '1px solid #b9b9b9', borderRadius: '10px'}}>
                    <thead style={{backgroundColor: 'white'}}>
                        <tr>
                            <th style={{width: '15em'}}>Name</th>
                            <th style={{width: '10em'}}>Type</th>
                            <th style={{width: '5em'}}>Start</th>
                            <th style={{width: '10em'}}>Phase</th>
                            <th style={{width: '5em'}}>Fav</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderContests}
                    </tbody>
                </Table>
            </div>
            
            <div className="pagination">
                <button onClick={goToPreviousPage}
                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                >
                Previous
                </button>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
                
                <button onClick={goToNextPage}
                className={`next ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
                >
                Next
                </button>
                <select id="pagelimit-select" onChange={e => {setContestPerPage(e.target.value)
                    setCurrentPage(1)
                }}>
                    <option value="100">100</option>
                    <option value="50">50</option>
                    <option value="25">25</option>
                </select>
            </div>
        </div>
    )
}

