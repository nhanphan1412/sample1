import React from 'react';
import '../css/App.css';
import StoreData from '../data/ajax-store.json';

function Management(){
    return(
        <Store />
    );
}

class Store extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            itemPages: 5
        }
    }


    render(){
        console.log(this.state);
        return(
            <div className="container">
                <Filter 
                    changeItemPages={value => this.setState({itemPages: value})} 
                    itemPages={this.state.itemPages}
                />
                <List itemPages={this.state.itemPages} />
            </div>
        )
    }
}

class Filter extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
            open: false,
            field: [
                { key: "-1", value: 'All Field(s)' },
                { key: "0", value: 'Seller SKU' },
                { key: "1", value: 'Product Name' }
            ],
            itemsPage: [
                { key: '5', value: '5' },
                { key: '10', value: '10' },
            ]
        };

        this.handleChange = this.handleChange.bind(this);

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
                                    <select 
                                        className="ml-2"
                                        onChange={value => this.props.changeItemPages(value.target.value)}
                                        // onChange={value => console.log(value.target.value)}
                                        value={this.props.itemPages}
                                    >
                                    {
                                        this.state.itemsPage.map(function (data, index) {
                                            return (                                           
                                                <option key={index} value={data.key}>{data.value}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                                <div className="ml-2">
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
            store: '',
            country: '',
            channel: ''
        };
    }

    showSetting(item){
        this.setState({
            open: true,
            store: item.store.name,
            country: item.country,
            channel: item.channel.name
        });
        console.log( item.country + ' - ' + item.store.name + ' - ' + item.channel.name);
    }

    clickSetting() {
        // alert(JSON.stringify(this.state.item));
        this.closeSetting();
    }

    closeSetting() {
        this.setState({
            open: false,
        });
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
                        StoreData.slice(0, this.props.itemPages).map( (data,index) => {
                            return(
                                <ListItem
                                    key={index}
                                    item={data}
                                    onClick={() => this.showSetting(data)}
                                />
                            )
                        })
                    }
                    </tbody>
                </table>
                <div
                    className={"mask" + (this.state.open ? ' show' : '')}
                    onClick={() => this.clickSetting()}
                >

                </div>
                <Setting    
                    open={this.state.open} 
                    store={this.state.store}
                    channel={this.state.channel}
                    country={this.state.country}
                    onClick={() => this.clickSetting()} 
                    onClose={() => this.closeSetting()} 
                    />
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

    render(){
        return(
            <tr>
                <td>{this.props.item.country}</td>
                <td>{this.props.item.store.name}</td>
                <td><div className={this.props.item.channel.name + "-channel"}></div></td>
                <td>
                    {this.props.item.setting.updated.at.date}<br />
                    {this.props.item.setting.updated.at.time}
                </td>
                <td>{this.props.item.setting.updated.by}</td>
                <td>
                    <button type="button" 
                            className="btn m-btn--pill btn-secondary btn-sm"
                            onClick={() => this.props.onClick && this.props.onClick()}
                    >
                            Settings
                    </button>
                </td>
            </tr>
        )
    }
}

class Setting extends React.Component {
    render() {
        return (
            <div className={"form-setting p-3 right" + (this.props.open ? ' show' : '') }>
                    <span   className="hidden-list-item-modify-store"
                            onClick={() => this.props.onClose && this.props.onClose()}
                    >
                        <i className="fa fa-times"></i>
                    </span>
                <h5 className="mb-4"><strong>Settings</strong></h5>
                <div className="form-group m-form__group">
                    <label>Store Name</label>
                    <input type="text" className="form-control" disabled value={this.props.store} />
                </div>
                <div className="form-group m-form__group">
                    <label>Country</label>
                    <input type="text" className="form-control" disabled value={this.props.country} />
                </div>
                <div className="form-group m-form__group">
                    <label>Channel</label>
                    <div className={this.props.channel + "-channel d-block"}></div>
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
                    <button className="btn btn-primary" type="button" onClick={() => this.props.onClick && this.props.onClick()}>Save</button>
                </div>
            </div>
        )
    }
}

export default Management;
