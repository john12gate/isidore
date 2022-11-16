import React from 'react';
import {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_UNIVERSITY = gql`
  query ($univId: Float!) {
  university( id: $univId )  {
    id
    name
    city
    state
    country
  }
}`;

const DELETE_UNIVERSITY = gql`
  mutation ($univId: Float!) {
  deleteUniversity( id: $univId )  {    
    name
    city
    state
    country
  }
}`;

class ShowUniv extends Component {
render() {
  const param = this.props.match.params; 
  const univId = parseFloat(param.id);
    return (
    <Query pollInterval={500} query={GET_UNIVERSITY} variables={{ univId }}>				
      { ({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4><Link to="/" className="btn btn-primary">University catalog</Link></h4>
                <h3 className="panel-title">{data.university.name} </h3>
              </div>
              <div className="panel-body">
                <dl>
                  <dt>City:</dt><dd>{data.university.city}</dd>
                  <dt>State:</dt><dd>{data.university.state}</dd>
                  <dt>Country:</dt><dd>{data.university.country}</dd>
                </dl>
                <Mutation mutation={DELETE_UNIVERSITY} key={data.university.id} 
                  onCompleted={() => this.props.history.push('/')}
                >
                {(deleteUniversity, { loading, error }) => (
                  <div>
                    <form onSubmit={e => {
                      e.preventDefault();
                      deleteUniversity({ variables: { univId } }); }}>
                      <Link to={`/edit/${data.university.id}`} 
                        className="btn btn-success">
                        Edit
                      </Link>&nbsp;
                      <button type="submit" className="btn btn-danger">
                        Delete
                      </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
                  </div>
                )}
                </Mutation>                                
              </div>
            </div>					
          </div>
        )
      }}
    </Query>
  )
}}

export default withRouter(ShowUniv);
