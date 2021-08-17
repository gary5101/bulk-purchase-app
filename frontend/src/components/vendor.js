import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import AppNavbar from './AppNavbar'
import { Redirect } from 'react-router-dom';
export default class Vendor extends Component {
    // tester=() =>{
    //     console.log("100")
    //     console.log()
    // }
    state = {
        productList: [],
        readyProducts: [],
        dispatchedProducts: [],
        productName: '',
        productPrice: 0,
        productQuantity: 1,
        activeState: 'available',
        button1: "btn btn-outline-success",
        button2: "btn btn-sm btn-outline-secondary",
        button3: "btn btn-sm btn-outline-secondary",
        dummy: '',
        activeproduct:'',
        productReview: [],
    }

    componentDidMount() {
        let route = 'http://localhost:4000/api/vendor/product/' + JSON.parse(window.sessionStorage.getItem("user")).id
        // console.log(route);
        axios.get(route)
            .then(res => {
                // console.log(this.state.productList)
                this.setState({ productList: res.data })
                // console.log(this.state.productList)
            }
            )
            .catch(err => console.log(err));

    }
    componentDidUpdate() {
        if (this.state.activeState == 'available') {
            let route = 'http://localhost:4000/api/vendor/product/' + JSON.parse(window.sessionStorage.getItem("user")).id
            // console.log(route);
            axios.get(route)
                .then(res => {
                    // console.log(this.state.activeState)
                    this.setState({ productList: res.data })
                    // console.log(this.state.productList)

                }
                )
                .catch(err => console.log(err))
        }
        else if (this.state.activeState == 'readyToDispatch') {
            let route1 = 'http://localhost:4000/api/vendor/product/ready/' + JSON.parse(window.sessionStorage.getItem("user")).id
            // console.log(route);
            axios.get(route1)
                .then(res => {
                    // console.log(this.state.activeState)
                    this.setState({ readyProducts: res.data })
                    // console.log(this.state.readyProducts)
                }
                )
                .catch(err => console.log(err));
        }
        else {
            let route2 = 'http://localhost:4000/api/vendor/product/dispatched/' + JSON.parse(window.sessionStorage.getItem("user")).id
            // console.log(route);
            axios.get(route2)
                .then(res => {
                    // console.log(this.state.activeState)
                    this.setState({ dispatchedProducts: res.data })
                    // console.log(this.state.activeState)
                }
                )
                .catch(err => console.log(err))
        }
    }
    buttonOne = (e) => {
        this.setState({
            button1: "btn btn-outline-success",
            button2: "btn btn-sm btn-outline-secondary",
            button3: "btn btn-sm btn-outline-secondary",
            activeState: 'available',
            activeproduct:''
        })
    }
    buttonTwo = (e) => {
        this.setState({
            button2: "btn btn-outline-success",
            button1: "btn btn-sm btn-outline-secondary",
            button3: "btn btn-sm btn-outline-secondary",
            activeState: 'readyToDispatch',
            activeproduct:''
        })
    }
    buttonThree = (e) => {
        this.setState({
            button3: "btn btn-outline-success",
            button2: "btn btn-sm btn-outline-secondary",
            button1: "btn btn-sm btn-outline-secondary",
            activeState: 'Dispatched',
            activeproduct:''
        })

    }
    onChangeName = (e) => {
        this.setState({ productName: e.target.value })
    }
    onChangePrice = (e) => {

        this.setState({ productPrice: e.target.value })
    }
    onChangeQuantity = (e) => {
        this.setState({ productQuantity: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const product = {
            productName: this.state.productName,
            productPrice: this.state.productPrice / this.state.productQuantity,
            productQuantity: this.state.productQuantity,
            productVendor: JSON.parse(window.sessionStorage.getItem("user")).id,
            productStatus: "available",
        }
        console.log(product);
        axios.post('http://localhost:4000/api/product', product)
            .then(res => {
                console.log(product)
                this.setState({
                    productName: '',
                    productPrice: 0,
                    productQuantity: 1,
                })
            }
            )
            .catch(err => console.log(err));
    }
    getReview(id) {
        let route = 'http://localhost:4000/api/product/reviews/' + id
        axios.get(route)
            .then(res => {
                this.setState({activeproduct:id})
                this.setState({ productReview: res.data })
            })
    }
    onDispatch = (curr) => {
        let route = 'http://localhost:4000/api/product/' + curr._id
        const productUpdate = {
            productStatus: 'dispatched'
        }
        axios.put(route, productUpdate)
            .then(res => {
                this.setState({ dummy: '' })
            }
            )
            .catch(err => console.log(err))
    }
    onCancel = (curr) => {
        let route = 'http://localhost:4000/api/product/' + curr._id
        const productUpdate = {
            productStatus: 'cancelled'
        }
        axios.put(route, productUpdate)
            .then(res => {
                this.setState({ dummy: '' })
            }
            )
            .catch(err => console.log(err))
    }
    render() {
        return (
            <React.Fragment>
                <AppNavbar />
                {
                    (window.sessionStorage.getItem("user") == null)
                        ? <h1>Access Restricted</h1>
                        : (JSON.parse(window.sessionStorage.getItem("user")).type == 'customer')
                            ? <h1>You are not a vendor <Link to='/customer'>click here </Link></h1>
                            :
                            (
                                <React.Fragment>
                                    <React.Fragment>
                                        <h1>Hello {JSON.parse(window.sessionStorage.getItem("user")).username}</h1>
                                        <h3>Add Product</h3>
                                        <form class="form-inline" onSubmit={this.onSubmit}>
                                            <div class="form-group mx-sm-3 mb-2">
                                                <label for="productName" class="sr-only">Product Name</label>
                                                <input type="text" class="form-control" id="productName" placeholder="Product Name" value={this.state.productName} onChange={this.onChangeName} />
                                            </div>
                                            <div class="form-group mx-sm-3 mb-2">
                                                <label for="productPrice" class="sr-only">Product Price</label>
                                                <input type="number" class="form-control" id="productPrice" placeholder="Product Price" value={this.state.productPrice} onChange={this.onChangePrice} min='0' />
                                            </div>
                                            <div class="form-group mx-sm-3 mb-2">
                                                <label for="productQuantity" class="sr-only">Product Quantity</label>
                                                <input type="number" class="form-control" id="productQuantity" placeholder="Product Quantity" value={this.state.productQuantity} onChange={this.onChangeQuantity} min='1' />
                                            </div>
                                            <input type="submit" value="Add Product" class="btn btn-primary mb-2" />
                                        </form>
                                        <nav class="navbar navbar-light bg-light">
                                            <form class="form-inline">
                                                <button class={this.state.button1} type="button" onClick={this.buttonOne}>Current Listing</button>
                                                <button class={this.state.button2} type="button" onClick={this.buttonTwo}>Ready To Dispatch</button>
                                                <button class={this.state.button3} type="button" onClick={this.buttonThree}>Dispatched</button>
                                            </form>
                                        </nav>
                                    </React.Fragment>
                                    {this.state.activeState == 'available'
                                        ? (
                                            <React.Fragment>
                                                <table className="table table-striped">
                                                    <thead class='thead-dark'>
                                                        <tr>
                                                            <th>Product Name</th>
                                                            <th>Product Price</th>
                                                            <th>Product Quantity Left</th>
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
                                                                        <td><button class="btn btn-danger" onClick={() => this.onCancel(curr)}>Cancel</button></td>
                                                                        {/* <td>{curr.productStatus}</td> */}
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </React.Fragment>
                                        )
                                        : (
                                            this.state.activeState == 'readyToDispatch'
                                                ? (
                                                    <React.Fragment>
                                                        <table className="table table-striped">
                                                            <thead class='thead-dark'>
                                                                <tr>
                                                                    <th>Product Name</th>
                                                                    <th>Product Price</th>
                                                                    <th> </th>
                                                                    {/* <th>Product Status</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.readyProducts.map((curr, i) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{curr.productName}</td>
                                                                                <td>{curr.productPrice}</td>
                                                                                <td><button class="btn btn-dark" onClick={() => this.onDispatch(curr)}>Dispatch</button>      <button class="btn btn-danger" onClick={() => this.onCancel(curr)}>Cancel</button></td>
                                                                                {/* <td>{curr.productStatus}</td> */}
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </React.Fragment>
                                                )
                                                : (
                                                    <React.Fragment>
                                                        <table className="table table-striped">
                                                            <thead class='thead-dark'>
                                                                <tr>
                                                                    <th>Product Name</th>
                                                                    <th>Product Price</th>
                                                                    <th>Product Reviews and rating</th>
                                                                    {/* <th>Product Status</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.dispatchedProducts.map((curr, i) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{curr.productName}</td>
                                                                                <td>{curr.productPrice}</td>
                                                                                {/* <td>{curr.productQuantity}</td> */}
                                                                                <td>
                                                                                    <button class='btn btn-info' onClick={()=>(this.getReview(curr._id))}>Get Review and Rating</button>
                                                                                    {
                                                                                        this.state.activeproduct==curr._id
                                                                                        ?
                                                                                        <ul>
                                                                                        {
                                                                                            this.state.productReview.map((review, i) => {
                                                                                                if(review.orderRating!=null)
                                                                                                {
                                                                                                return (
                                                                                                    <li>
                                                                                                        <ul>
                                                                                                            <li>Rating:{review.orderRating}</li>
                                                                                                            <li>Review:{review.orderReview}</li>
                                                                                                        </ul>
                                                                                                    </li>
                                                                                                )
                                                                                                }
                                                                                                else
                                                                                                {
                                                                                                    return null
                                                                                                }
                                                                                            })
                                                                                        }
                                                                                        </ul>
                                                                                        :null
                                                                                        }
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </React.Fragment>
                                                )
                                        )}
                                </React.Fragment>
                            )
                }
            </React.Fragment>
        )
    }
}