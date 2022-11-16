import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Link, withRouter } from 'react-router-dom';

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

const UPD_UNIVERSITY = gql`
  mutation ( $input: UniversityInput! ) {
    updateUniversity( data: $input ) {
      id
      name
      city
      state
      country
    }
  }`;
  
class EditUniv extends Component {
  render() {
    const param = this.props.match.params; 
    const univId = parseFloat(param.id);    
    return (
      <Query pollInterval={500} query={GET_UNIVERSITY} variables={{ univId }}>				
        { ({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          let name, city, state, country;
          let input = {id: univId, name: "", city: "", state: "", country: ""}; 
    return (
      <Mutation mutation={UPD_UNIVERSITY}
        key={data.university.id}
        onCompleted={() => this.props.history.push('/')}
      >
        {(updateUniversity, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Edit university</h3>
              </div>
              <div className="panel-body">
                <h4><Link to="/" className="btn btn-primary">University Catalog</Link></h4>
                <form onSubmit={e => {									
                  input = {
                    id: univId, name: name.value, city: city.value, 
                    state: state.value, country: country.value
                  };									
                  e.preventDefault();
                  updateUniversity({ variables: { input }});
                  name.value = ""; city.value = "";
                  state.value = ""; country.value = "";
                  }}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                      <input type="text" className="form-control" 
                        name="name" ref={node => { name = node; }} 
                        placeholder="NAME" defaultValue={data.university.name}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City:</label>
                      <input type="text" className="form-control" 
                        name="city" ref={node => { city = node; }} 
                        placeholder="CITY" defaultValue={data.university.city}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State:</label>
                      <input type="text" className="form-control" 
                        name="state" ref={node => { state = node; }} 
                        placeholder="STATE" defaultValue={data.university.state}
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country:</label>
                      <input type="text" className="form-control" 
                        name="country" ref={node => { country = node; }} 
                        placeholder="COUNTRY" defaultValue={data.university.country}
                      />
                  </div>
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
              </div>
            </div>
          </div>
        )}
      </Mutation>
    )
    }
    }
    </Query>
    )
  }
}

export default withRouter(EditUniv);
