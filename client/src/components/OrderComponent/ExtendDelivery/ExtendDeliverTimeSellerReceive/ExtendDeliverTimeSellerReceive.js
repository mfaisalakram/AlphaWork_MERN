import * as types from '../../../constants/constants';
import React from 'react';
import MessageTemplate from '../../MessageTemplate/MessageTemplate';
import './ExtendDeliverTimeSellerReceive.css';
const ExtendDeliverTimeSellerReceive = (props) => {
  let btns = '';

  if (props.chat.status === 'send') {
    btns = (
      <div>
        <button
          className="btn btn-danger"
          onClick={() =>
            props.request({
              id: props.chat.id,
              request: types.DECLINE_EXTEND_ORDER,
            })
          }
        >
          decline
        </button>
        <button
          className="btn btn-success"
          onClick={() =>
            props.request({
              id: props.chat.id,
              request: types.ACCEPT_EXTEND_ORDER,
            })
          }
        >
          Accept
        </button>
      </div>
    );
  } else if (props.chat.status === 'withdraw') {
    btns = <button>Request was withdrawn by your Buyer</button>;
  } else {
    btns = <button>you Responded To Buyer Request</button>;
  }

  return (
    <div className="ExtendDeliverTimeSellerReceive">
      <div className="top">
        <img src="" alt="" />

        <h4>Order Request</h4>
        <p>Seller started an issue is:</p>
        <p>
          <strong>{props.chat.title}</strong>
        </p>
      </div>
      <MessageTemplate
        image={props.image}
        username={props.chat.seller_username}
        message={props.chat.description}
      />
      <div className="extend-table-outer">
        <p className="info">
          <strong>
            Seller requested to extend the delivery time of the order.
          </strong>
        </p>
        <div className="info-table">
          <table className="table table-striped table-extend">
            <thead>
              <tr>
                <th>Item</th>
                <th>Duration</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Delivery Extended</td>
                <td>
                  {props.chat.time} {props.chat.time == 1 ? ' days' : ' days'}
                </td>
                <td>No Change</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="button-box">{btns}</div>
      </div>
    </div>
  );
};

export default ExtendDeliverTimeSellerReceive;
