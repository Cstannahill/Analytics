import React from 'react';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './analyticstats.css';
import debug from 'sabio-debug';

const _logger = debug.extend('InternalAnalytics');

function StatisticsWidget(props) {
    _logger(props);
    const { modalToggle } = props;
    const textClass = props.trend.textClass || 'text-muted';

    const handleModal = () => {
        modalToggle(props);
    };

    return (
        <Card className={classNames('widget-flat', 'border')}>
            <Card.Body>
                {props.icon && <h2 className="float-end">{props.icon}</h2>}
                <h5 className={classNames('fw-normal', 'mt-0', 'text-dark')} title={props.description}>
                    {props.title}
                </h5>
                <h3 className={classNames('mt-3', 'mb-3', 'text-dark')}>{props.stats}</h3>

                {props.trend && (
                    <p className={classNames('mb-0', textClass)}>
                        <span className={classNames(props.trend.textClass, 'me-2')}>
                            {props.trend.icon}
                            {props.trend.value}
                        </span>
                        <span className="text-nowrap text-muted">{props.trend.time}</span>
                        <button type="button" className="btn btn-sm btn-primary small float-end" onClick={handleModal}>
                            View More
                        </button>
                    </p>
                )}
            </Card.Body>
        </Card>
    );
}

StatisticsWidget.propTypes = {
    icon: PropTypes.element.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    stats: PropTypes.number.isRequired,
    trend: PropTypes.shape({
        textClass: PropTypes.string,
        icon: PropTypes.element,
        value: PropTypes.string,
        time: PropTypes.string,
    }).isRequired,
    orgOrders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            annualRevenue: PropTypes.string,
            monthlyRevenue: PropTypes.string,
            weeklyRevenue: PropTypes.string,
            annualOrders: PropTypes.number,
        })
    ),
    modalToggle: PropTypes.func.isRequired,
};

export default StatisticsWidget;
