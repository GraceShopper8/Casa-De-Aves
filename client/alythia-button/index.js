import React, {Component} from 'react'

class Alythia extends Component {
  render() {
    return (
      <form
        action={`http://localhost:8080/api/clients/${this.props.clientID}`}
        className="form"
        method="GET"
      >
        <button>Log in with Alythia</button>
      </form>
    )
  }
}

export default Alythia
