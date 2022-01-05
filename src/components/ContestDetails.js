import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loader from "react-loader-spinner";
// styles
import './ContestDetails.css'

export default function ContestDetails() {
    const data = useParams();
    const {data: contestList, isPending, error} = useFetch('https://codeforces.com/api/contest.list')
    var d = []
    if(contestList != null){
        d = contestList.filter((contest) => contest.id == data.id)
    }

    return (
        <>
            <div className="back">
                <Link to={'/'} style={{color: 'black'}}>
                    Back
                </Link>
            </div>
            {d.length == 0 && <div style={{width: '100%', margin: 'auto'}}>
                <Loader type="ThreeDots" color="#e1e1e1" height={70} width={70}/>
            </div>}
            {d.length > 0 && <div className="details">
                <div className="meta-data">
                    <div className="id">ID: {d[0].id}</div>
                    <div className="name">Name: {d[0].name} </div>
                    <div className="type">Type: {d[0].type} </div>
                    <div className="phase">Phase: {d[0].phase}</div>
                </div>
                <div className="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel tincidunt libero. Integer vestibulum tristique nulla eu lobortis. Aliquam nisi enim, placerat et elit ut, mollis fringilla tellus. Aliquam erat volutpat. Quisque pretium congue mauris, non mattis tortor eleifend in. Curabitur tempor mattis ex, vel vestibulum metus porta vitae. Nunc non mauris laoreet nibh lacinia dignissim. Pellentesque sollicitudin tellus vehicula neque pretium maximus. Donec sollicitudin ut ex egestas maximus. Maecenas vitae arcu eget odio cursus ultrices. Donec tempus urna quis porttitor rutrum. Morbi tortor tortor, posuere vel rhoncus interdum, fringilla vel orci. Cras vel malesuada sem, id consectetur quam. Pellentesque lobortis nibh augue, at elementum ipsum placerat ac. Curabitur tempus pharetra felis, eget sagittis nulla lobortis id. Integer et rutrum turpis, at malesuada risus.
                Suspendisse arcu leo, efficitur id auctor vel, malesuada nec ante. In convallis, ligula sed placerat tincidunt, urna felis bibendum nisi, nec ultrices risus mauris eu sapien. Sed ac odio nibh. Nunc molestie condimentum semper. Pellentesque scelerisque, purus quis placerat ullamcorper, lorem odio tincidunt libero, non bibendum augue risus in massa. Nullam ut tempor odio. Maecenas vitae ante et massa consequat blandit.
                </div>
            </div>}
            
        </>
    )
}
