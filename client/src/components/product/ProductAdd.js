import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { alertShow } from '../../actions/alertActions'
import { productAdd, clearAlert } from '../../actions/productActions'

const ProductAdd = ({
	alertShow,
	product: { alert },
	productAdd,
	clearAlert,
	history
}) => {
	const initialProduct = {
		description: '',
		descriptionLabel: '',
		name: '',
		nameLabel: '',
		pic: null,
		quantity: 0,
		quantityLabel: '',
		rate: 0,
		rateLabel: '',
		unit: '',
		unitLabel: '',
		type: true,
		valid: true
	}

	const [product, setProduct] = useState(initialProduct)

	useEffect(() => {
		if (alert) {
			alert === 'File too large'
				? alertShow('Product added but Image ' + alert, 'success')
				: alert === 'Product added'
				? alertShow(alert, 'success')
				: alertShow(alert)
			clearAlert()
			if (alert === 'Product added' || alert === 'File too large') {
				setProduct(initialProduct)
				history.push('/products')
			}
		}
		// eslint-disable-next-line
	}, [alert])

	const descriptionHandler = ({ target: { value } }) => {
		setProduct({
			...product,
			description: value,
			descriptionLabel: value === '' ? ' (cannnot be empty)' : '',
			valid: value === '' || product.name === '' || product.rate === 0
		})
	}

	const formSubmitHandler = event => {
		event.preventDefault()
		productAdd(product)
	}

	const nameHandler = ({ target: { value } }) => {
		setProduct({
			...product,
			name: value,
			nameLabel: value === '' ? ' (cannnot be empty)' : '',
			valid: value === '' || product.description === '' || product.rate === 0
		})
	}

	const picHandler = event => {
		setProduct({
			...product,
			pic: event.target.files ? event.target.files : null
		})
	}

	const quantityHandler = ({ target: { value } }) => {
		setProduct({
			...product,
			quantity: value,
			quantityLabel: value === 0 ? ' (cannnot be zero)' : '',
			valid:
				value === '' ||
				product.description === '' ||
				product.name === '' ||
				product.rate === 0
		})
	}

	const rateHandler = ({ target: { value } }) => {
		setProduct({
			...product,
			rate: value,
			rateLabel: value === 0 ? ' (cannnot be zero)' : '',
			valid:
				value === '' ||
				product.description === '' ||
				product.name === '' ||
				product.rate === 0
		})
	}

	const typeHandler = ({ target: { value } }) => {
		setProduct({
			...product,
			type: value === 'true'
		})
	}

	const unitHandler = ({ target: { value } }) => {
		setProduct({
			...product,
			unit: value,
			unitLabel: value === 0 ? ' (cannnot be zero)' : '',
			valid: value === '' || product.description === '' || product.rate === 0
		})
	}

	return (
		<div>
			<form onSubmit={formSubmitHandler}>
				<div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-half-focused'>
					<input
						autoFocus
						className='mdl-textfield__input'
						type='text'
						name='name'
						value={product.name}
						onChange={nameHandler}
					/>
					<label className='mdl-textfield__label' htmlFor='name'>
						{'Name' + product.nameLabel}
					</label>
				</div>
				<br />
				<div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-half-focused'>
					<input
						className='mdl-textfield__input'
						type='text'
						name='description'
						value={product.description}
						onChange={descriptionHandler}
					/>
					<label className='mdl-textfield__label' htmlFor='description'>
						{'Description' + product.descriptionLabel}
					</label>
				</div>
				<br />
				<label
					className='mdl-radio mdl-js-radio mdl-js-ripple-effect'
					htmlFor='productType'
				>
					<input
						type='radio'
						id='productType'
						className='mdl-radio__button'
						name='type'
						value={true}
						checked={product.type === true}
						onChange={typeHandler}
					/>
					<span className='mdl-radio__label'>Product</span>
				</label>
				<label
					className='mdl-radio mdl-js-radio mdl-js-ripple-effect'
					htmlFor='serviceType'
				>
					<input
						type='radio'
						id='serviceType'
						className='mdl-radio__button'
						name='type'
						value={false}
						checked={product.type === false}
						onChange={typeHandler}
					/>
					<span className='mdl-radio__label'>Service</span>
				</label>
				<br />
				<input
					type='file'
					id='pic'
					name='pic'
					accept='image/jpg, image/jpeg, image/png, image/webp'
					onChange={picHandler}
				/>
				<br />
				<br />
				{product.type ? (
					<>
						<div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-half-focused'>
							<input
								autoFocus
								className='mdl-textfield__input'
								type='number'
								name='quantity'
								value={product.quantity}
								onChange={quantityHandler}
							/>
							<label className='mdl-textfield__label' htmlFor='quantity'>
								{'Quantity' + product.quantityLabel}
							</label>
						</div>
						<br />
						<div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-half-focused'>
							<input
								autoFocus
								className='mdl-textfield__input'
								type='text'
								name='unit'
								value={product.unit}
								onChange={unitHandler}
							/>
							<label className='mdl-textfield__label' htmlFor='unit'>
								{'Unit' + product.unitLabel}
							</label>
						</div>
						<br />
					</>
				) : null}
				<div className='mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-half-focused'>
					<input
						autoFocus
						className='mdl-textfield__input'
						type='number'
						name='rate'
						value={product.rate}
						onChange={rateHandler}
					/>
					<label className='mdl-textfield__label' htmlFor='rate'>
						{'Rate' + product.rateLabel}
					</label>
				</div>
				<br />
				<input
					className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
					type='submit'
					value='Add Product'
					disabled={product.valid}
				/>
			</form>
		</div>
	)
}

const mapStateToProps = state => ({
	product: state.product
})

ProductAdd.propTypes = {
	alertShow: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired,
	productAdd: PropTypes.func.isRequired,
	clearAlert: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {
	alertShow,
	clearAlert,
	productAdd
})(ProductAdd)
