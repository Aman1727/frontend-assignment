import {useFetch} from "../hooks/useFetch";
import { useState } from "react";
import ContestList from "./ContestList";
import Graph from "./Graph"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

// Styles
import './Home.css'

export default function Home() {
    
    const url = 'https://codeforces.com/api/contest.list';
    const {data: contestList, isPending, error} = useFetch(url)
    const [search, setSearch] = useState('')
    const [filterValue, setfilterValue] = useState('ALL')
    const [phase, setphase] = useState("")
    var filteredContests = search.length === 0 ? contestList : contestList.filter(contest => contest.name.toLowerCase().includes(search.toLowerCase()))
    const [isFav, setIsFav] = useState(false)
    

    if(contestList!= null){
        const filtered = filteredContests.filter(contest => {
            if(filterValue === "ALL"){
                return true;
            }
            return contest.type === filterValue
        })
        filteredContests = filtered
    }

    if(contestList!= null){
        const filtered = filteredContests.filter(contest => {
            if(phase === ""){
                return true;
            }
            return contest.phase === phase
        })
        filteredContests = filtered
    }

    return (
        <div>

            <div className="header">
                {/* FILTER */}
                <select id="standard-select" onChange={e => setfilterValue(e.target.value)}>
                    <option value="ALL">All</option>
                    <option value="ICPC">ICPC</option>
                    <option value="CF">CF</option>
                </select>

                {/* END FILTER */}


                {/* SEARCH BAR */}

                <input 
                        type="text" 
                        id="search"
                        placeholder="Search..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus required
                />
            
                {/* END SEARCH BAR */}


                <select id="standard-select" onChange={e => setphase(e.target.value)}>
                        <option value='' disabled selected>Phase</option>
                        <option value="BEFORE">Ongoing</option>
                        <option value="FINISHED">Finished</option>
                </select>


                <button id="btn" onClick={(e) => setIsFav(prevCheck => !prevCheck)}>Fav</button>
            
            </div>

            {/* CONTEST LIST */}
            {isPending && 
            <div style={{width: '100%', margin: 'auto'}}>
                <Loader type="ThreeDots" color="#e1e1e1" height={70} width={70}/>
            </div>}
            {error && <div>{error}</div>}
            {filteredContests && <ContestList filteredContests={filteredContests} isFav = {isFav}/>}
            {/* END CONTEST LIST */}

        </div>
    )
}

