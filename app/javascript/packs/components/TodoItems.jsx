// This component is only for the table body structure

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItems extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.toggleCompletedTodoItems();
	}

	render() {
		return (
			<>
				<hr />
				<button
					className="btn btn-outline-primary btn-block mb-3"
					onClick={this.handleClick}
				>
					{this.props.hideCompletedTodoItems
						? `Show Completed Items`
						: `Hide Completed Items `}
				</button>

				<div>
					<div className="table-responsive">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Status</th>
									<th scope="col">Item</th>
									<th scope="col" className="text-right">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>{this.props.children}</tbody>
						</table>
					</div>
				</div>
			</>
		);
	}
}

export default TodoItems;
TodoItems.propTypes = {
	toggleCompletedTodoItems: PropTypes.func.isRequired,
	hideCompletedTodoItems: PropTypes.bool.isRequired,
};
