import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaUsers } from 'react-icons/fa';
import { IoIosBusiness } from 'react-icons/io';
import { BsCartCheckFill } from 'react-icons/bs';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';
import { FcInvite } from 'react-icons/fc';
import PropTypes from 'prop-types';
import StatisticsWidget from './StatisticsWidget';
import debug from 'sabio-debug';

const _logger = debug.extend('InternalAnalytics');

const UsersOrgsStatistics = (props) => {
    _logger(props);
    const { modalToggle } = props;
    const prevTotalOrders = props?.orders?.totalOrders - props?.orders?.currentMonthOrders;
    const prevTotalInvites = props?.orgs?.totalInvites - props?.orgs?.currentMonthInvites;
    const userStats = props.users
        ? ((props?.users?.activeUsers - props?.users?.prevTotalActiveUsers) / props?.users?.prevTotalActiveUsers) * 100
        : null;
    const orgStats = props.orgs
        ? ((props?.orgs?.activeOrgs - props?.orgs?.prevActiveOrgs) / props?.orgs?.prevActiveOrgs) * 100
        : null;
    const orderStats = props.orders ? ((props?.orders?.totalOrders - prevTotalOrders) / prevTotalOrders) * 100 : null;
    const inviteStats = props?.orgs?.totalInvites
        ? ((props?.orgs?.totalInvites - prevTotalInvites) / prevTotalInvites) * 100
        : null;
    const userTrend =
        userStats >= 0
            ? {
                  textClass: 'text-success',
                  icon: <GoArrowUp className="align-top" />,
                  value: userStats.toFixed(2) + '%',
                  time: 'Since last month',
              }
            : {
                  textClass: 'text-danger',
                  icon: <GoArrowDown />,
                  value: userStats.toFixed(2) + '%',
                  time: 'Since last month',
              };

    const orgTrend =
        orgStats >= 0
            ? {
                  textClass: 'text-success',
                  icon: <GoArrowUp className="align-top" />,
                  value: orgStats.toFixed(2) + '%',
                  time: 'Since last month',
              }
            : {
                  textClass: 'text-danger',
                  icon: <GoArrowDown />,
                  value: orgStats.toFixed(2) + '%',
                  time: 'Since last month',
              };
    const orderTrend =
        orderStats >= 0
            ? {
                  textClass: 'text-success',
                  icon: <GoArrowUp className="align-top" />,
                  value: orderStats.toFixed(2) + '%',
                  time: 'Since last month',
              }
            : {
                  textClass: 'text-danger',
                  icon: <GoArrowDown />,
                  value: orderStats.toFixed(2) + '%',
                  time: 'Since last month',
              };
    const inviteTrend =
        inviteStats >= 0
            ? {
                  textClass: 'text-success',
                  icon: <GoArrowUp className="align-top" />,
                  value: inviteStats.toFixed(2) + '%',
                  time: 'Since last month',
              }
            : {
                  textClass: 'text-danger',
                  icon: <GoArrowDown />,
                  value: inviteStats.toFixed(2) + '%',
                  time: 'Since last month',
              };

    return (
        <>
            <Row>
                <Col sm={12} lg={6}>
                    <StatisticsWidget
                        icon={<FaUsers className="int-analytics-stats-widget" />}
                        description="Users"
                        title="Users"
                        users={props?.users}
                        stats={props?.users?.activeUsers}
                        modalToggle={modalToggle}
                        trend={userTrend}></StatisticsWidget>
                </Col>
                <Col sm={12} lg={6}>
                    <StatisticsWidget
                        icon={<IoIosBusiness className="int-analytics-stats-widget" />}
                        description="Organizations"
                        title="Orgs"
                        stats={props?.orgs?.activeOrgs}
                        orgs={props?.orgs}
                        modalToggle={modalToggle}
                        trend={orgTrend}></StatisticsWidget>
                </Col>
            </Row>
            <Row>
                <Col sm={12} lg={6}>
                    <StatisticsWidget
                        icon={<BsCartCheckFill className="int-analytics-stats-widget" />}
                        description="Orders"
                        title="Orders"
                        orders={props.orders}
                        stats={props?.orders?.totalOrders}
                        orgOrders={props?.orgs?.revenues}
                        modalToggle={modalToggle}
                        trend={orderTrend}></StatisticsWidget>
                </Col>
                <Col sm={12} lg={6}>
                    <StatisticsWidget
                        icon={<FcInvite className="int-analytics-stats-widget" />}
                        description="Invites"
                        title="Invites"
                        invites={props?.orgs}
                        stats={props?.orgs?.totalInvites}
                        modalToggle={modalToggle}
                        trend={inviteTrend}></StatisticsWidget>
                </Col>
            </Row>
        </>
    );
};

UsersOrgsStatistics.propTypes = {
    users: PropTypes.shape({
        totalUsers: PropTypes.number,
        activeUsers: PropTypes.number,
        currentMonthNewUsers: PropTypes.number,
        pendingUsers: PropTypes.number,
        prevMonthNewUsers: PropTypes.number,
        prevTotalActiveUsers: PropTypes.number,
    }).isRequired,
    orgs: PropTypes.shape({
        totalOrgs: PropTypes.number,
        activeOrgs: PropTypes.number,
        pendingOrgs: PropTypes.number,
        prevActiveOrgs: PropTypes.number,
        totalInvites: PropTypes.number,
        currentMonthInvites: PropTypes.number,
        orgsAddedPrevMonth: PropTypes.number,
        prevMonthInvites: PropTypes.number,

        revenues: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                annualRevenue: PropTypes.string,
                monthlyRevenue: PropTypes.string,
                weeklyRevenue: PropTypes.string,
                annualOrders: PropTypes.string,
            })
        ),
    }).isRequired,
    orders: PropTypes.shape({
        totalOrders: PropTypes.number,
        currentMonthOrders: PropTypes.number,
        cancelledOrders: PropTypes.number,
        prevMonthOrders: PropTypes.number,
        refundedOrders: PropTypes.number,
    }).isRequired,
    modalToggle: PropTypes.func.isRequired,
};

export default UsersOrgsStatistics;
