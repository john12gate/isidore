import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link, withRouter } from 'react-router-dom';

const ADD_UNIVERSITY = gql`
  mutation ( $input: UniversityInput! ) {
    createUniversity( data: $input ) {
      id
      name
      city
      state
      country
    }
  }`;
  
class CreateUniv extends Component {
  render() {
  let name, city, state, country;
  let input = {id: 0, name: "", city: "", state: "", country: ""}; 
    return (
      <Mutation 
        mutation={ADD_UNIVERSITY} onCompleted={() => this.props.history.push('/')}
      >
        {(createUniversity, { loading, error }) => (
          <div className="container">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Add university</h3>
              </div>
              <div className="panel-body">
                <h4><Link to="/" className="btn btn-primary">University Catalog</Link></h4>
                <form onSubmit={e => {									
                  input = {
                    id: 0, name: name.value, city: city.value, 
                    state: state.value, country: country.value
                  };									
                  e.preventDefault();
                  createUniversity({ variables: { input }});
                  name.value = ""; city.value = "";
                  state.value = ""; country.value = "";
                  }}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                      <input type="text" className="form-control" 
                        name="name" ref={node => { name = node; }} 
                        placeholder="NAME" 
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City:</label>
                      <input type="text" className="form-control" 
                        name="city" ref={node => { city = node; }} 
                        placeholder="CITY" 
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State:</label>
                      <input type="text" className="form-control" 
                        name="state" ref={node => { state = node; }} 
                        placeholder="STATE" 
                      />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country:</label>
                      <input type="text" className="form-control" 
                        name="country" ref={node => { country = node; }} 
                        placeholder="COUNTRY" 
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

export default withRouter(CreateUniv);
