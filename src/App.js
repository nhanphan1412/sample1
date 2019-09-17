import React from 'react';
import './App.css';
import './bootstrap.min.css';

function App() {
    return (
        <div>
            <List/>
        </div>
    );
}

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: ["Ăn sáng", "Tập thể dục", "Ăn trưa", "Ăn chiều", "Ăn tối"],
            value: '',
            count: 0
        }

        this.handleChange = this.handleChange.bind(this);

    }
    
    edited(index, itemForEdit) {
        this.state.items[index] = itemForEdit;
        this.forceUpdate();
    }

    eventdelete(itemForDelete){
        this.state.items.forEach((item, index) => {
            if(itemForDelete === item) {
                this.state.items[index] = itemForDelete;
                this.state.items.splice(index, 1);
            }
        });
        this.forceUpdate();
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        console.log(e.target.value);
    }

    addNew(){
        alert(this.state.value);
        this.state.items.push(this.state.value);
        this.forceUpdate();
    }

    countchecked(isChecked){

        if(isChecked) {
            this.setState({
                count: this.state.count + 1
            })
        }
        else{
            this.setState({
                count: this.state.count - 1
            })
        }
        console.log(this.state.count);
        // this.state.items.length;
    }

    render() {

        let that = this;

        return (
            <div>
                <div className="formReact">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 offset-3">
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className="formReact__title">Form Add New</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="formReact__group">
                                            <input
                                                type="text"
                                                placeholder="Add text name"
                                                className="form-control"
                                                onChange={this.handleChange}
                                            />
                                            <i className="fas fa-file-alt"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 text-right">
                                        <button
                                            type="button"
                                            className="btn btn-add"
                                            onClick={() => this.addNew()}
                                        >
                                            <i className="fas fa-plus"></i>
                                            Add new
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>Todo</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.items.map(function (item, index) {
                                                    return (
                                                        <ListItem
                                                            key={index}
                                                            item={item}
                                                            willEdit={item => that.edited(index,item)}
                                                            willDelete={item => that.eventdelete(item)}
                                                            countChecked={isChecked => that.countchecked(isChecked)}
                                                        />
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>

                                        <p>Total: <span>{this.state.count}</span> checked</p>
                                        <p>Total: <span>{this.state.items.length - this.state.count}</span> unchecked</p>
                                        <p>Total item: {this.state.items.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showResult: false,
            value: "",
            isChecked: false
        };

        this.handleChange
            = this.handleChange.bind(this);
        this.toggleChange
            = this.toggleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
        console.log(e.target.value);
    }

    btnEdit(){
        this.state.value = this.props.item;
        this.setState({
            showResult: !this.state.showResult
        })
    }

    btnDelete(){
        this.props.willDelete(this.props.item);
    }

    handleCancel(){
        this.setState({
            showResult: !this.state.showResult
        })
    }

    handleUpdate(){
        console.log('handleUpdate');
        this.props.willEdit(this.state.value);
        this.setState({
            showResult: !this.state.showResult
        });
    }

    toggleChange(){
        let checked = !this.state.isChecked;
        this.setState({
            isChecked : checked
        })
        this.props.countChecked(checked);
    }

    componentDidMount() {
        // nothing to do
    }

    render() {

        return (
            <tr>
                <td>
                    <input
                        type="checkbox"
                        checked={this.state.isChecked}
                        onChange={this.toggleChange}
                    />
                </td>
                <td>
                    <span style={{textDecoration: this.state.isChecked ? "line-through" : "none",display: this.state.showResult ? "none" : "block"}}>{this.props.item}</span>
                    <div className="formEdit" style={{display: this.state.showResult ? "block" : "none"}}>
                        <input
                            className="editItem"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <buton type="button" onClick={ () => this.handleUpdate()}>OK</buton>
                        <button type="button" onClick={ () => this.handleCancel()}>Cancel</button>
                    </div>
                </td>
                <td className="text-center">

                    <a className="edit" data-toggle="tooltip" data-placement="top" title="Edit" onClick={() => this.btnEdit()}>
                        <i className="fas fa-pencil-alt"></i>
                    </a>

                    <a className="delete" data-toggle="tooltip" data-placement="top" title="Delete" onClick={() => this.btnDelete()}>
                        <i className="fas fa-trash-alt"></i>
                    </a>

                </td>
            </tr>
        );
    }
}

export default App;
