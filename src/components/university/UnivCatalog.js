import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

const GET_UNIVERSITIES = gql`{
  universities {
    id
    name
    city
    state
    country
  }
}`

function UnivCatalog() {
  const { data, loading, error } = useQuery(GET_UNIVERSITIES);  
  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;
    
  return (
  <div className="container">
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">University catalog</h3>        
        <h4><Link to="/create" className="btn btn-primary">Add University</Link></h4>          
        <div className="panel-body">
          <table className="table table-stripe">
            <thead>
              <tr><th>Name</th><th>City</th><th>State</th><th>Country</th></tr>
            </thead>
            <tbody>
              {data.universities.map( (uni, index) => (
                <tr key={index}>
                  <td><Link to={`/show/${uni.id}`}>{uni.name}</Link></td>
                  <td>{uni.city}</td><td>{uni.state}</td><td>{uni.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(UnivCatalog);
