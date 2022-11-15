import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
const _logger = debug.extend('RevChart');

const DonutChart = (props) => {
    const { content } = props;
    const sumCounts = (ar) => {
        let x = 0;
        for (let index = 0; index < ar.length; index++) {
            const element = ar[index];
            x = x + element.invites;
        }
        return x;
    };

    switch (content.description) {
        case 'Users':
            var dataInfo = [content?.users?.activeUsers, content?.users?.pendingUsers];
            var label = ['Active Users', 'Pending Users'];
            var total = (
                <>
                    <p>Total Users </p>
                    <h4 className="text-center">{content?.users?.totalUsers}</h4>
                </>
            );
            var currentMonth = (
                <>
                    <p>Users Added This Month</p>
                    <h4 className="text-center">{content?.users?.currentMonthNewUsers}</h4>
                </>
            );
            var prevMonth = (
                <>
                    <p>Users Added Last Month </p>
                    <h4 className="text-center">{content?.users?.prevMonthNewUsers}</h4>
                </>
            );
            var startOfMonth = (
                <>
                    <p>Users at Start of Month</p>
                    <h4 className="text-center">{content?.users?.prevTotalActiveUsers}</h4>
                </>
            );
            var active = (
                <>
                    <p>Active Users </p>
                    <h4 className="text-center">{content?.users?.activeUsers}</h4>
                </>
            );
            var pending = (
                <>
                    <p>Pending Users </p>
                    <h4 className="text-center">{content?.users?.pendingUsers}</h4>
                </>
            );
            break;
        case 'Organizations':
            dataInfo = [content?.orgs?.activeOrgs, content?.orgs?.pendingOrgs];
            label = ['Active Orgs', 'Pending Orgs'];
            total = (
                <>
                    <p>Total Organizations </p>
                    <h4 className="text-center">{content.orgs.totalOrgs}</h4>
                </>
            );
            currentMonth = (
                <>
                    <p>Organizations Added This Month</p>
                    <h4 className="text-center">{content?.orgs?.activeOrgs - content?.orgs?.prevActiveOrgs}</h4>
                </>
            );
            prevMonth = (
                <>
                    <p>Organizations Added Last Month</p>
                    <h4 className="text-center">{content.orgs.orgsAddedPrevMonth}</h4>
                </>
            );
            startOfMonth = (
                <>
                    <p>Total Active at Start of Month </p>
                    <h4 className="text-center">{content.orgs.prevActiveOrgs}</h4>
                </>
            );
            active = (
                <>
                    <p>Active Organizations </p>
                    <h4 className="text-center">{content.orgs.activeOrgs}</h4>
                </>
            );
            pending = (
                <>
                    <p>Pending Organizations </p>
                    <h4 className="text-center">{content.orgs.pendingOrgs}</h4>
                </>
            );
            break;
        case 'Orders':
            dataInfo = content?.orgOrders?.map((org) => org.totalOrders);
            label = content?.orgOrders.map((org) => org.name);
            total = (
                <>
                    <p>Total Orders </p>
                    <h4 className="text-center">{content.orders.totalOrders}</h4>
                </>
            );
            currentMonth = (
                <>
                    <p>Orders This month</p>
                    <h4 className="text-center">{content.orders.currentMonthOrders}</h4>
                </>
            );
            prevMonth = (
                <>
                    <p>Orders Last month </p>
                    <h4 className="text-center">{content.orders.prevMonthOrders}</h4>
                </>
            );
            var cancelled = (
                <>
                    <p>Cancelled Orders </p>
                    <h4 className="text-center">{content.orders.cancelledOrders}</h4>
                </>
            );
            var refunded = (
                <>
                    <p>Refunded Orders </p>
                    <h4 className="text-center">{content.orders.refundedOrders}</h4>
                </>
            );
            break;
        case 'Invites':
            dataInfo = content?.invites?.revenues.map((org) => org.invites);
            label = content?.invites?.revenues.map((org) => org.name);
            total = (
                <>
                    <p>Total Invites </p>
                    <h4 className="text-center">{content.invites.totalInvites}</h4>
                </>
            );
            currentMonth = (
                <>
                    <p>Invites This Month</p>
                    <h4 className="text-center">{content.invites.currentMonthInvites}</h4>
                </>
            );
            prevMonth = (
                <>
                    <p>Invites Last Month </p>
                    <h4 className="text-center">{content.invites.prevMonthInvites}</h4>
                </>
            );
            active = (
                <>
                    <p>Invites By Active Members</p>
                    <h4 className="text-center">{sumCounts(content.invites.revenues)}</h4>
                </>
            );
            break;

        default:
            dataInfo = [content?.users?.activeUsers, content?.users?.pendingUsers];
            total = null;
            currentMonth = null;
            prevMonth = null;
            active = null;
            pending = null;
            startOfMonth = null;
            cancelled = null;
            refunded = null;
    }

    const additionalInfo = (
        <>
            <Row className="my-3">
                {total && <Col className="text-center">{total}</Col>}{' '}
                {active && <Col className="text-center">{active}</Col>}
                {(pending || refunded) && <Col className="text-center">{pending || refunded}</Col>}
            </Row>
            <Row className="my-3">
                {(prevMonth || cancelled) && <Col className="text-center">{prevMonth || cancelled}</Col>}
                {startOfMonth && <Col className="text-center">{startOfMonth}</Col>}
                {currentMonth && <Col className="text-center">{currentMonth}</Col>}
            </Row>
        </>
    );

    const options = {
        chart: {
            height: 1000,
            type: 'pie',
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        show: true,

                        name: {
                            show: true,
                            color: '#000000',
                        },
                    },
                },
            },
        },
        labels: label,
        colors: [
            '#3366E6',
            '#FF33FF',
            '#66664D',
            '#FFFF99',
            '#00B3E6',
            '#E6B333',
            '#FF6633',
            '#999966',
            '#99FF99',
            '#B34D4D',
            '#80B300',
            '#809900',
            '#E6B3B3',
            '#6680B3',
            '#66991A',
            '#FF99E6',
            '#CCFF1A',
            '#FF1A66',
            '#E6331A',
            '#33FFCC',
            '#66994D',
            '#B366CC',
            '#4D8000',
            '#B33300',
            '#CC80CC',
            '#FFB399',
            '#991AFF',
            '#E666FF',
            '#4DB3FF',
            '#1AB399',
        ],
        legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10,
        },
        responsive: [
            {
                breakpoint: 1000,
                options: {
                    chart: {
                        height: 400,
                    },
                    legend: {
                        show: true,
                    },
                },
            },
        ],
    };
    _logger(dataInfo);
    return (
        content && (
            <Card>
                <Card.Body>
                    <h5 className="mb-3">{additionalInfo}</h5>
                    <div className="d-flex justify-content-end">
                        <strong className="mx-3">Numbers by Active Members</strong>
                    </div>
                    <Chart
                        options={options}
                        series={dataInfo}
                        type="donut"
                        height={500}
                        className="apex-charts text-dark"
                    />
                </Card.Body>
            </Card>
        )
    );
};

DonutChart.props
    ? (DonutChart.propTypes = {
          content: PropTypes.oneOf(
              PropTypes.shape({
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
              })
          ).isRequired,
      })
    : (DonutChart.propTypes = null);

export default DonutChart;
