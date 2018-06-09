// /* eslint-disable react/prefer-stateless-function */
// import React, { Component } from 'react'
// import { connect } from 'react-redux'

// import { me } from '../store'
// import { getUsersOrders } from '../store/order'

// class OrderDetail extends Component {
//   componentDidMount = () => {
//     this.props.loadInitialData()
//     this.props.getUsersOrders(this)
//   }

//   render() {
//     console.log('props', this.props)
//     const cart = this.props.cartContents ? this.props.cartContents : []
//     const items = cart.split(',').filter((el, idx) => {
//       if (el[idx - 1] === 'id') return el
//     })
//     console.log('cart items:', items)
//     let cartTotal = 0

//     return (
//       <div className="container">
//         <ul className="collection col s6">
//           {items.map((item, index) => {
//             cartTotal += Number(item.price)
//             return (
//               <li className="collection-item avatar" key={index}>
//                 <img
//                   src={`img/${item.imgUrl}`}
//                   alt={item.name}
//                   className="circle"
//                 />
//                 <span className="title bold">{item.name}</span>
//                 <p className="bold">${item.price}</p>
//                 <br />
//                 <p>{item.description}</p>
//                 <a
//                   href="#!"
//                   className="secondary-content"
//                   onClick={() => this.handleDelete(index)}>
//                   <i className="material-icons">delete</i>
//                 </a>
//               </li>
//             )
//           })}
//           <li className="collection-item avatar blue-grey lighten-3">
//             <h6>TOTAL PRICE:</h6>
//             <h3>${cartTotal}</h3>
//           </li>
//         </ul>
//       </div>
//     )
//   }
// }

// const mapState = state => {
//   return {
//     userOrders: state.order.usersOrders,
//     userId: state.user.id,
//     isLoggedIn: !!state.user.id,
//   }
// }

// const mapDispatch = dispatch => ({
//   loadInitialData: () => dispatch(me()),
//   getUsersOrders: userId => dispatch(getUsersOrders(userId)),
// })

// export default connect(
//   mapState,
//   mapDispatch
// )(OrderDetail)
