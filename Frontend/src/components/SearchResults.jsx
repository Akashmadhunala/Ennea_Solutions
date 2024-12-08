import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function SearchResults() {
    const {query}=useParams();
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        const searchResult = async () => {
            setSearchData([]);
            try {
                const response = await fetch(`http://localhost:8080/courses/search/${query}`);
                const data = await response.json();
                setSearchData(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        searchResult();
    }, [query]);
    return (
        <div style={{display:"flex",justifyContent:"center"}}>
        {searchData.length>0?<div className="grid-container" style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",marginTop:"5%",width:"90%"}}>
            {searchData.map((course) => (
                <Link to={`/course/${course.id}`} className="course-link" key={course.id}>
                    <div className="card course-card">
                        <img src={course.image} className="card-img-top" alt="course_img" style={{ height: '14rem', width: '14rem' }} />
                        <div className="card-body">
                            <div className="card-text">
                                <span style={{fontWeight:"700"}}>{course.title}</span> <br />
                                <span style={{fontSize:"0.8rem"}}>{course.tutor}</span>
                                <div style={{display:"flex",alignItems:'center'}}>
                                    <span style={{fontSize:'0.8rem',fontWeight:'bold'}}>{course.rating}</span> &nbsp;
                                    <div className="Stars" style={{ "--rating": course.rating, display:"inline",fontSize:"1.3rem"  }}></div>
                                </div>
                                <span style={{fontWeight:"700"}}>&#8377;{course.price.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>:<div style={{marginTop:'160px',fontSize:'2rem'}}>No Results Found</div>}
        </div>        
    );
}
