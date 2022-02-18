import './index.css'

const OrderedItems = props => {
  const {itemDetails} = props

  return (
    <>
      <li className="ordered-items-mobile-li">
        <div>
          <img
            src={itemDetails.imageUrl}
            className="ordered-items-li-image"
            alt="ordered-items"
          />
          <div className="ordered-items-li-details-container">
            <h1 className="ordered-items-li-name">{itemDetails.name}</h1>
            <div className="ordered-item-quantity-cost-container">
              <p className="ordered-items-li-cost">{`Quantity: ${itemDetails.quantity}`}</p>
              <p className="ordered-items-li-cost">
                Cost: ₹ {`${itemDetails.cost * itemDetails.quantity}/-`}
              </p>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default OrderedItems
