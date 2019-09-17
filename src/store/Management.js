import React from 'react';
import '../App.css';
import '../bootstrap.min.css';
import StoreData from '../data/ajax-store.json';

function Management(){
    return(
        <div className="container">
            <Filter />
            <List />
        </div>
    );
}

class Filter extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            open: false,
            field: [
                { key: -1, value: 'All Field(s)' },
                { key: 0, value: 'Seller SKU' },
                { key: 1, value: 'Product Name' }
            ],
            itemsPage: [
                { key: -1, value: '10' },
                { key: 0, value: '20' },
                { key: 1, value: '30' },
                { key: 2, value: '50' }
            ]
        };

    }

    toogleOpen(){
        this.setState({
            open: !this.state.open
        });
    }

    render(){
        return(
            <div>
                <div className="m-filter mt-4 mb-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-xl-8 col-12 d-flex m-filter_search">
                                <button className="btn btn-filter mr-2 collapsed" 
                                        type="button"
                                        onClick={() => this.toogleOpen()}
                                >
                                    <i className="fa fa-filter"></i>
                                    Filter
                                    <i className="la la-angle-up"></i>
                                </button>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <select>
                                            {
                                                this.state.field.map(function (data, index) {    
                                                    return (                                           
                                                        <option key={index} value={data.key}>{data.value}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <input type="text" className="form-control"
                                        placeholder=" Search by Seller SKU, Product Name" />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-12 d-flex justify-content-end m-filter_action">
                                <div className="filter-length">
                                    <label>Items/Page</label>
                                    <select>
                                    {
                                        this.state.itemsPage.map(function (data, index) {
                                            return (                                           
                                                <option key={index} value={data.key}>{data.value}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                                <div className="btn-group ml-2">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                    >
                                        <i className="fa fa-download"></i> Download
                                    </button>
                                    <div className="dropdown-menu">
                                        {/* <a className="dropdown-item" href="#">CSV</a>
                                        <a className="dropdown-item" href="#">Excel</a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"collapse" + (this.state.open ? ' show' : '')}>
                            <div className="card card-body">
                                <div className="row">
                                    sầdfdsafsd
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }    
}

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render(){
        return(
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th rowSpan="2">Country</th>
                        <th rowSpan="2">Store name</th>
                        <th rowSpan="2">Channel</th>
                        <th colSpan="2">Services Updated</th>
                        <th rowSpan="2">Action</th>
                    </tr>
                    <tr>
                        <th>At</th>
                        <th>By</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        StoreData.map( (data,index) => {
                            return(
                                <ListItem
                                    key={index}
                                    item={data}
                                />
                            )
                        })
                    }
                    </tbody>
                </table>

                <div className={"form-setting p-3 right" + (this.state.open ? ' show' : '') }>
                    <span className="hidden-list-item-modify-store">
                        <i className="fa fa-times"></i>
                    </span>
                    <h5 className="mb-4"><strong>Settings</strong></h5>
                    <div className="form-group m-form__group">
                        <label>Store Name</label>
                        <input type="text" className="form-control" disabled value="" />
                    </div>
                    <div className="form-group m-form__group">
                        <label>Country</label>
                        <input type="text" className="form-control" disabled value="" />
                    </div>
                    <div className="form-group m-form__group">
                        <label>Channel</label>
                        <input type="text" className="form-control" disabled value="" />
                    </div>
                    <div className="form-group m-form__group">
                        <label className="font-weight-bold">Store Services</label>
                        <div className="row">
                            <div className="col-xl-9">
                                <label className="mt-1">Pull Sale Order <span title="On/ Off this field, system will pull/ stop pulling sale order from channel to Epsilo."><i className="fa fa-question-circle text-info"></i></span></label>
                            </div>
                            <div className="col-xl-3 text-right">
                                <input type="checkbox" defaultChecked="checked" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-9">
                                <label className="mt-1">Pull Product <span title="On/ Off this field, system will pull/ stop pulling sale order from channel to Epsilo."><i className="fa fa-question-circle text-info"></i></span></label>
                            </div>
                            <div className="col-xl-3 text-right">
                                <input type="checkbox" defaultChecked="checked" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-9">
                                <label className="mt-1">Allow Sync Stock <span title="On/ Off this field, system will pull/ stop pulling sale order from channel to Epsilo."><i className="fa fa-question-circle text-info"></i></span></label>
                            </div>
                            <div className="col-xl-3 text-right">
                                <input type="checkbox" defaultChecked="checked" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-9">
                                <label className="mt-1">Allow Sync Price <span title="On/ Off this field, system will pull/ stop pulling sale order from channel to Epsilo."><i className="fa fa-question-circle text-info"></i></span></label>
                            </div>
                            <div className="col-xl-3 text-right">
                                <input type="checkbox" defaultChecked="checked" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-9">
                                <label className="mt-1">Fulfillment <span title="On/ Off this field, system will pull/ stop pulling sale order from channel to Epsilo."><i className="fa fa-question-circle text-info"></i></span></label>
                            </div>
                            <div className="col-xl-3 text-right">
                                <input type="checkbox" defaultChecked="checked" />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="button">Save</button>
                    </div>
                </div>

            </div>
        )
    }
}

class ListItem extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    showSetting(){
        this.setState({
            open: !this.state.open
        });
    }

    render(){
        return(
            <tr>
                <td>{this.props.item.country}</td>
                <td>{this.props.item.store.name}</td>
                <td>{this.props.item.channel.name}</td>
                <td>
                    {this.props.item.setting.updated.at.date}<br />
                    {this.props.item.setting.updated.at.time}
                </td>
                <td>{this.props.item.setting.updated.by}</td>
                <td>
                    <button type="button" 
                            className="btn m-btn--pill btn-secondary btn-sm"
                            onClick={() => this.showSetting()}
                    >
                            Settings
                    </button>
                </td>
            </tr>
        )
    }
}

export default Management;
