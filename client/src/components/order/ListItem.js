import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
	orderApprove,
	orderCancel,
	orderDeliver
} from '../../actions/orderActions'

const ListItem = ({ orderApprove, orderCancel, orderDeliver, orderInfo }) => {
	const approveHandler = () => {
		orderApprove(orderInfo._id)
	}

	const calcelHandler = () => {
		orderCancel(orderInfo._id)
	}

	const deliverHandler = () => {
		orderDeliver(orderInfo._id)
	}

	return (
		<div className='order mdl-card mdl-shadow--2dp'>
			<div className='mdl-card__title'>
				<h2 className='mdl-card__title-text'>{orderInfo.name}</h2>
			</div>
			<div className='mdl-card__supporting-text'>
				<p>{orderInfo.status}</p>
				<p>
					Address: {orderInfo.address}, {orderInfo.pincode}
					<br />
					Amount: {orderInfo.amount}
					<br />
					Date-Time: {orderInfo.date}, {orderInfo.time}
				</p>
				<h4>Items</h4>
				{orderInfo.items.map((item, key) => (
					<p key={key}>
						{item.count} X {item.item.quantity} {item.item.unit}{' '}
						{item.item.name} at Rs. {item.item.rate}/-
					</p>
				))}
			</div>
			<div className='mdl-card__actions mdl-card--border'>
				{orderInfo.status === 'Pending Approval' ? (
					<button
						onClick={approveHandler}
						className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
					>
						Approve
					</button>
				) : orderInfo.status === 'Approved' ? (
					<button
						onClick={deliverHandler}
						className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
					>
						Deliver
					</button>
				) : null}
				{orderInfo.status !== 'Cancelled' &&
				orderInfo.status !== 'Delivered' ? (
					<button
						onClick={calcelHandler}
						className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'
					>
						Cancel
					</button>
				) : (
					<p>No actions</p>
				)}
			</div>
		</div>
	)
}

ListItem.propTypes = {
	orderApprove: PropTypes.func.isRequired,
	orderCancel: PropTypes.func.isRequired,
	orderDeliver: PropTypes.func.isRequired,
	orderInfo: PropTypes.object.isRequired
}

export default withRouter(
	connect(null, {
		orderApprove,
		orderCancel,
		orderDeliver
	})(ListItem)
)
