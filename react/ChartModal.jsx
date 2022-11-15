import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DonutChart from './DonutChart';
import debug from 'sabio-debug';

const _logger = debug.extend('InternalAnalytics');
const ChartModal = (props) => {
    _logger(props);
    const { modal, toggle, content } = props;

    return (
        <>
            <Modal show={modal} onHide={toggle} size="lg" className="text-dark">
                <Modal.Header onHide={toggle} closeButton className="bg-primary">
                    {content?.description && <h3 className="modal-title text-dark">{content?.description}</h3>}
                </Modal.Header>
                <Modal.Body>
                    <DonutChart content={content} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggle}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

ChartModal.props
    ? (ChartModal.propTypes = {
          modal: PropTypes.string.isRequired,
          toggle: PropTypes.func.isRequired,
          content: PropTypes.shape({
              users: PropTypes.shape({
                  totalUsers: PropTypes.number,
                  currentMonthNewUsers: PropTypes.number,
                  prevMonthNewUsers: PropTypes.number,
                  prevMonthTotalActiveUsers: PropTypes.number,
                  activeUsers: PropTypes.number,
                  pendingUsers: PropTypes.number,
              }),
              orders: PropTypes.shape({
                  totalOrders: PropTypes.number,
                  cancelledOrders: PropTypes.number,
                  currentMonthOrders: PropTypes.number,
                  prevMonthOrders: PropTypes.number,
                  refundedOrders: PropTypes.number,
                  orgOrders: PropTypes.arrayOf(
                      PropTypes.shape({
                          annualRevenue: PropTypes.string,
                          id: PropTypes.number,
                          invites: PropTypes.number,
                          monthlyRevenue: PropTypes.string,
                          name: PropTypes.string,
                          totalOrders: PropTypes.number,
                          weeklyRevenue: PropTypes.string,
                      })
                  ),
              }),
              orgs: PropTypes.shape({
                  totalOrgs: PropTypes.number,
                  activeOrgs: PropTypes.number,
                  pendingOrgs: PropTypes.number,
                  currentMonthInvites: PropTypes.number,
                  orgsAddedPrevMonth: PropTypes.number,
                  prevActiveOrgs: PropTypes.number,
                  prevMonthInvites: PropTypes.number,
                  revenues: PropTypes.arrayOf(
                      PropTypes.shape({
                          id: PropTypes.number,
                          name: PropTypes.string,
                          annualRevenue: PropTypes.number,
                          monthlyRevenue: PropTypes.number,
                          weeklyRevenue: PropTypes.number,
                          annualOrders: PropTypes.number,
                      })
                  ),
              }),
          }),
      })
    : (ChartModal.propTypes = null);

export default ChartModal;
