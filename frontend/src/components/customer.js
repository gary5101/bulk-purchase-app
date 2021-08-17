import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import AppNavbar from './AppNavbar'
import { Redirect } from 'react-router-dom';
export default class Customer extends Component {
    state = {
        search: '',
        productList: [],
        vendornames: [],
        activeorder: '',
        orderQuantity: 1,
        activeState: 'search',
        button1: 'btn btn-outline-success',
        button2: 'btn btn-sm btn-outline-secondary',
        orders: [],
        activerate: '',
        rating: 1,
        review: '',
        orderrating: 1,
        activerateorder: '',
        activeVendor:'',
        allvendorreviews:[],
    }
    // constructor(props){
    //     super(props);
    //     // this.getVendor=this.getVendor.bind(this)
    // }
    buttonOne = (e) => {
        this.setState({ button1: 'btn btn-outline-success' })
        this.setState({ button2: 'btn btn-sm btn-outline-secondary' })
        this.setState({ activeState: 'search' })
        const route = 'http://localhost:4000/api/product/specific/' + this.state.search
        axios.get(route)
            .then(res => {
                console.log(res.data)
                this.setState({ productList: res.data, activeorder: '' })
            })
            .catch(err => console.log(err))
        this.setState({ activeorder: '' })
        this.setState({ orderQuantity: 1 })
    }
    buttonTwo = (e) => {
        this.setState({ button1: 'btn btn-sm btn-outline-secondary' })
        this.setState({ button2: 'btn btn-outline-success' })
        this.setState({ activeState: 'order' })
        const route = 'http://localhost:4000/api/order/' + JSON.parse(window.sessionStorage.getItem("user")).id
        axios.get(route)
            .then(res => {
                this.setState({ orders: res.data })
            })
            .catch(err => console.log(err))
        setTimeout(() => {
            // console.log(this.state.orders)
            this.setState({ activeorder: '' })
            this.setState({ orderQuantity: 1 })
            this.setState({ activerate: '' })
            this.setState({ activerateorder: '' })
        }, 500)

    }
    onChangeSearch = (e) => {
        this.setState({ search: e.target.value })
    }
    onChangeQuantity = (e) => {
        this.setState({ orderQuantity: e.target.value })
    }
    onSearch = (e) => {
        e.preventDefault()
        const route = 'http://localhost:4000/api/product/specific/' + this.state.search
        axios.get(route)
            .then(res => {
                console.log(res.data)
                this.setState({ productList: res.data, activeorder: '' })
            })
            .catch(err => console.log(err))
    }
    sortPrice = () => {
        this.setState({ productList: this.state.productList.sort((a, b) => (a.productPrice > b.productPrice) ? 1 : ((b.productPrice > a.productPrice) ? -1 : 0)) });
    }
    sortRating = () => {
        this.setState({ productList: this.state.productList.sort((a, b) => (a.productVendorRating > b.productVendorRating) ? 1 : ((b.productVendorRating > a.productVendorRating) ? -1 : 0)) });
    }
    sortQuantity = () => {
        this.setState({ productList: this.state.productList.sort((a, b) => (a.productQuantity > b.productQuantity) ? 1 : ((b.productQuantity > a.productQuantity) ? -1 : 0)) });
    }
    editQuantity = (e, id) => {
        e.preventDefault()
        let route = 'http://localhost:4000/api/order/' + id
        axios.put(route, { orderQuantity: this.state.orderQuantity })
            .then(res => {
                console.log('hi')
                this.setState({ activeorder: '' })
                this.setState({ orderQuantity: 1 })
                // window.location.reload(false)
            }).then(res => {
                const route = 'http://localhost:4000/api/order/' + JSON.parse(window.sessionStorage.getItem("user")).id
                axios.get(route)
                    .then(res => {
                        this.setState({ orders: res.data })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log())
    }
    onRate = (id) => {
        this.setState({ rating: 1 })
        this.setState({ activerate: id })
    }
    getReviews=(id)=>{
        this.setState({activeVendor:id})
        let route="http://localhost:4000/api/vendor/review/"+id
        axios.get(route)
        .then(res=>{
            this.setState({allvendorreviews:res.data})
        })
        .catch(err=>{console.log(err)})
    }
    onRateOrder = (id) => {
        this.setState({ orderrating: 1 })
        this.setState({ review: '' })
        this.setState({ activerateorder: id })
    }
    onOrder = (id) => {
        this.setState({ activeorder: id })
        this.setState({ orderQuantity: 1 })
    }
    onChangeReview = (e) => {
        this.setState({ review: e.target.value })
    }
    onChangeOrderRating = (e) => {
        this.setState({ orderrating: e.target.value })
    }
    onChangeRating = (e) => {
        this.setState({ rating: e.target.value })
    }
    submitRating = (e, id, totalrating, numberofrating) => {
        e.preventDefault()
        // console.log('1')
        if (totalrating == null) {
            totalrating = 0
            // console.log('2')

        }
        if (numberofrating == null) {
            numberofrating = 0
            // console.log('3')

        }
        let vendorupdate = {
            totalRating: totalrating + parseInt(this.state.rating, 10),
            numberOfRating: numberofrating + 1
        }
        // console.log(vendorupdate)
        let route = 'http://localhost:4000/api/vendor/' + id
        // console.log(route)
        axios.put(route, vendorupdate)
            .then(res => {
                this.setState({ activerate: '' })
                this.setState({ rating: 1 })
            }).catch(err => console.log(err))
    }
    submitOrderRating = (e, id) => {
        e.preventDefault()
        let route = 'http://localhost:4000/api/order/review/' + id
        let update = {
            orderReview: this.state.review,
            orderRating: parseInt(this.state.orderrating, 10)
        }
        console.log(route)
        axios.put(route, update)
            .then(res => {
                console.log("hiiii")
                this.setState({ activerateorder: '' })
                this.setState({ orderrating: 1 })
                this.setState({ review: '' })
            })
            .catch(err => console.log(err))

    }
    confirmOrder = (e, id) => {
        e.preventDefault()
        let order = {
            orderCustomer: JSON.parse(window.sessionStorage.getItem("user")).id,
            orderProduct: id,
            orderQuantity: this.state.orderQuantity
        }
        axios.post('http://localhost:4000/api/order', order)
            .then(res => {
                console.log(res);
                this.setState({ orderQuantity: 1 })
                this.setState({ activeorder: '' })
            })
            .then(res => {
                const route = 'http://localhost:4000/api/product/specific/' + this.state.search
                axios.get(route)
                    .then(res => {
                        console.log(res.data)
                        this.setState({ productList: res.data, activeorder: '' })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <React.Fragment>
                <AppNavbar />
                {(window.sessionStorage.getItem("user") == null)
                    ? <h1>Access Restricted</h1>
                    : (JSON.parse(window.sessionStorage.getItem("user")).type == 'vendor')
                        ? <h1>You are not a customer <Link to='/vendor'>click here </Link></h1>
                        :
                        (
                            <React.Fragment>
                                <h1>Hello {JSON.parse(window.sessionStorage.getItem("user")).username}</h1>
                                <nav class="navbar navbar-light bg-light">
                                    <form class="form-inline">
                                        <button class={this.state.button1} type="button" onClick={this.buttonOne}>Search</button>
                                        <button class={this.state.button2} type="button" onClick={this.buttonTwo}>View Orders</button>
                                    </form>
                                </nav>
                                {
                                    (this.state.activeState == "search")
                                        ? <React.Fragment>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Search" aria-describedby="basic-addon2" value={this.state.search} onChange={this.onChangeSearch} />
                                                <div class="input-group-append">
                                                    <button class="btn btn-primary" type="button" onClick={this.onSearch}>Search</button>
                                                </div>
                                            </div>
                                            <table className="table table-striped">
                                                <thead class='thead-dark'>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Product Price<button class='btn' onClick={this.sortPrice}><span style={{ color: 'white' }}>{'\u25b2'}</span></button></th>
                                                        <th>Product Quantity Left<button class='btn' onClick={this.sortQuantity}><span style={{ color: 'white' }}>{'\u25b2'}</span></button></th>
                                                        <th>Product Vendor</th>
                                                        <th>Vendor Rating<button class='btn' onClick={this.sortRating}><span style={{ color: 'white' }}>{'\u25b2'}</span></button></th>
                                                        <th> </th>
                                                        {/* <th>Product Status</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.productList.map((curr, i) => {
                                                            return (
                                                                <tr>
                                                                    <td>{curr.productName}</td>
                                                                    <td>{curr.productPrice}</td>
                                                                    <td>{curr.productQuantity}</td>
                                                                    <td>
                                                                        <button class="btn btn-link " onClick={() => { this.getReviews(curr.productVendor) }}>{curr.productVendorName}</button>
                                                                        {
                                                                            this.state.activeVendor == curr.productVendor
                                                                                ? (
                                                                                    <React.Fragment>
                                                                                        <ul>
                                                                                            {
                                                                                                this.state.allvendorreviews.map((review, i) => {
                                                                                                    return (
                                                                                                        <li>{review.orderReview}</li>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </ul>
                                                                                    </React.Fragment>
                                                                                )
                                                                                : null
                                                                        }
                                                                    </td>
                                                                    <td>{curr.productVendorRating}</td>
                                                                    <td>
                                                                        <button class="btn btn-success" onClick={() => { this.onOrder(curr._id) }}>Order</button>
                                                                        {
                                                                            this.state.activeorder == curr._id
                                                                                ? (
                                                                                    <React.Fragment>
                                                                                        <form onSubmit={(e) => { this.confirmOrder(e, curr._id) }}>
                                                                                            <div class="form-group mx-sm-3 mb-2">
                                                                                                <label for="orderQuantity" class="sr-only">Order Quantity</label>
                                                                                                <input type="number" class="form-control" id="orderQuantity" placeholder="Order Quantity" value={this.state.orderQuantity} onChange={this.onChangeQuantity} min='1' max={curr.productQuantity} />
                                                                                            </div>
                                                                                            <input type="submit" value="confirm" class="btn btn-primary mb-2" />
                                                                                        </form>
                                                                                    </React.Fragment>
                                                                                )
                                                                                : null
                                                                        }
                                                                    </td>
                                                                    {/* <td>{curr.productStatus}</td> */}
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <table className="table ">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Product Vendor</th>
                                                        <th>Order Price</th>
                                                        <th>Order Quantity</th>
                                                        <th>Order Status</th>
                                                    </tr>
                                                </thead>
                                                {

                                                    this.state.orders.map((curr, i) => {
                                                        return (
                                                            <tr>
                                                                <td>{curr.productName}</td>
                                                                <td>{curr.productVendor}</td>
                                                                <td>{curr.orderPrice}</td>
                                                                <td>{curr.orderQuantity}</td>
                                                                <td>
                                                                    {
                                                                        curr.orderStatus == 'Waiting'
                                                                            ? <React.Fragment>
                                                                                <p style={{ color: '#999900' }}>Waiting</p>
                                                                                <p>Products Left: {curr.productLeft}</p>
                                                                                <button class="btn btn-warning" onClick={() => { this.onOrder(curr.id) }}>Edit Quantity</button>
                                                                                {
                                                                                    this.state.activeorder == curr.id
                                                                                        ? (
                                                                                            <React.Fragment>
                                                                                                <form onSubmit={(e) => { this.editQuantity(e, curr.id) }}>
                                                                                                    <div class="form-group mx-sm-3 mb-2">
                                                                                                        <label for="orderQuantity" class="sr-only">Order Quantity</label>
                                                                                                        <input type="number" class="form-control" id="orderQuantity" placeholder="Order Quantity" value={this.state.orderQuantity} onChange={this.onChangeQuantity} min='1' max={curr.productLeft + curr.orderQuantity} />
                                                                                                    </div>
                                                                                                    <input type="submit" value="confirm" class="btn btn-primary mb-2" />
                                                                                                </form>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                        : null
                                                                                }
                                                                            </React.Fragment>
                                                                            : curr.orderStatus == 'Placed'
                                                                                ? <React.Fragment>
                                                                                    <p style={{ color: 'green' }}>Placed</p>
                                                                                    <div>
                                                                                        <button class="btn btn-warning" onClick={() => { this.onOrder(curr.id) }}>Edit Quantity</button>
                                                                                    </div>
                                                                                    {
                                                                                        this.state.activeorder == curr.id
                                                                                            ? (
                                                                                                <React.Fragment>
                                                                                                    <form onSubmit={(e) => { this.editQuantity(e, curr.id) }}>
                                                                                                        <div class="form-group mx-sm-3 mb-2">
                                                                                                            <label for="orderQuantity" class="sr-only">Order Quantity</label>
                                                                                                            <input type="number" class="form-control" id="orderQuantity" placeholder="Order Quantity" value={this.state.orderQuantity} onChange={this.onChangeQuantity} min='1' max={curr.productLeft + curr.orderQuantity} />
                                                                                                        </div>
                                                                                                        <input type="submit" value="confirm" class="btn btn-primary mb-2" />
                                                                                                    </form>
                                                                                                </React.Fragment>
                                                                                            )
                                                                                            : null
                                                                                    }
                                                                                    <button class="btn btn-info" onClick={() => { this.onRate(curr.id) }}>Rate Vendor</button>
                                                                                    {
                                                                                        this.state.activerate == curr.id
                                                                                            ? (
                                                                                                <React.Fragment>
                                                                                                    <form onSubmit={(e) => { this.submitRating(e, curr.productVendorId, curr.productVendorTotalRating, curr.productVendorNumberOfRating) }}>
                                                                                                        <div class="form-group mx-sm-3 mb-2">
                                                                                                            <label for="Rating" class="sr-only">Rating</label>
                                                                                                            <input type="number" class="form-control" id="rating" placeholder="Rating" value={this.state.rating} onChange={this.onChangeRating} min='1' max='5' />
                                                                                                        </div>
                                                                                                        <input type="submit" value="confirm" class="btn btn-primary mb-2" />
                                                                                                    </form>
                                                                                                </React.Fragment>
                                                                                            )
                                                                                            : null
                                                                                    }
                                                                                </React.Fragment>
                                                                                : curr.orderStatus == 'Dispatched'
                                                                                    ? <React.Fragment>
                                                                                        <p style={{ color: 'blue' }}>Dispatched</p>
                                                                                        <div>
                                                                                            <button class="btn btn-info" onClick={() => { this.onRate(curr.id) }}>Rate Vendor</button>
                                                                                            {
                                                                                                this.state.activerate == curr.id
                                                                                                    ? (
                                                                                                        <React.Fragment>
                                                                                                            <form onSubmit={(e) => { this.submitRating(e, curr.productVendorId, curr.productVendorTotalRating, curr.productVendorNumberOfRating) }}>
                                                                                                                <div class="form-group mx-sm-3 mb-2">
                                                                                                                    <label for="Rating" class="sr-only">Rating</label>
                                                                                                                    <input type="number" class="form-control" id="rating" placeholder="Rating" value={this.state.rating} onChange={this.onChangeRating} min='1' max='5' />
                                                                                                                </div>
                                                                                                                <input type="submit" value="confirm" class="btn btn-primary mb-2" />
                                                                                                            </form>
                                                                                                        </React.Fragment>
                                                                                                    )
                                                                                                    : null
                                                                                            }
                                                                                        </div>
                                                                                        <button class="btn btn-info" onClick={() => { this.onRateOrder(curr.id) }}>Rate Order</button>
                                                                                        {
                                                                                            this.state.activerateorder == curr.id
                                                                                                ? (
                                                                                                    <React.Fragment>

                                                                                                        <form onSubmit={(e) => { this.submitOrderRating(e, curr.id) }}>
                                                                                                            <div class="form-group mx-sm-3 mb-2">
                                                                                                                <label for="Rating" class="sr-only">Rating</label>
                                                                                                                <input type="text" class="form-control" id="review" placeholder="review" value={this.state.review} onChange={this.onChangeReview} />
                                                                                                                <input type="number" class="form-control" id="rating" placeholder="Rating" value={this.state.orderrating} onChange={this.onChangeOrderRating} min='1' max='5' />
                                                                                                            </div>
                                                                                                            <input type="submit" value="confirm" class="btn btn-primary mb-2" />
                                                                                                        </form>
                                                                                                    </React.Fragment>
                                                                                                )
                                                                                                : null
                                                                                        }
                                                                                    </React.Fragment>
                                                                                    : <React.Fragment>
                                                                                        <p style={{ color: 'red' }}>Cancelled</p>
                                                                                    </React.Fragment>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </table>
                                        </React.Fragment>
                                }
                            </React.Fragment>
                        )
                }
            </React.Fragment>
        )
    }
}
