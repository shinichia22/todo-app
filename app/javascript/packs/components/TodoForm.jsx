import React from 'react';
import PropTypes from 'prop-types';
import setAxiosHeaders from './AxiosHeaders';

import axios from 'axios';
class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.titleRef = React.createRef();
	}

	handleSubmit(e) {
		e.preventDefault();
		setAxiosHeaders();
		axios
			.post('/api/v1/todo_items', {
				todo_item: {
					title: this.titleRef.current.value,
					complete: false,
				},
			})
			.then((response) => {
				const todoItem = response.data;
				this.props.createTodoItem(todoItem);
				this.props.clearErrors();
			})
			.catch((error) => {
				console.log(error);
				this.props.handleErrors(error);
			});
		e.target.reset();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="my-3">
				<div className="form-row">
					<div className="form-group col-md-8">
						<input
							type="text"
							name="title"
							ref={this.titleRef}
							required
							className="form-control"
							id="title"
							placeholder="Write your todo item here..."
						/>
					</div>
					<div className="form-group col-md-4">
						<button className="btn btn-outline-success btn-block">
							Add To Do Item
						</button>
					</div>
				</div>
			</form>
		);
	}
}

export default TodoForm;

TodoForm.propTypes = {
	createTodoItem: PropTypes.func.isRequired,
	handleErrors: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
};

// We create a ref via this.titleRef = React.createRef(); and ref={this.titleRef} in order to access data on the input field.
// We create a handleSubmit function that is called when our form is submitted via onSubmit={this.handleSubmit}. To ensure the method is called, we add this.handleSubmit = this.handleSubmit.bind(this); to our constructor.
// The handleSubmit method prevents the form from submitting by default via e.preventDefault();, and instead makes a POST request to the create action on our API via axios. If the request is successful, we create a new TodoItem by calling this.props.createTodoItem(todoItem);. Note that we have not created this method yet.
// Note that we need to format out POST request as follows, as this is how Rails expects to receive the POST request. Be sure to set complete to false, since a user wouldn't be adding a completed TodoItem to their list.
