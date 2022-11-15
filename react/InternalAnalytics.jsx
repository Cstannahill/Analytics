import React from 'react';
import { useEffect, useState } from 'react';
import debug from 'sabio-debug';
import analyticsService from '../../services/internalAnalyticService';
import UsersOrgsStatistics from '../../components/analytics/internal/UsersOrgsStatistics';
import BarChart from '../../components/analytics/internal/BarChart';
import ChartModal from '../../components/analytics/internal/ChartModal';
import OrgStatsTable from '../../components/analytics/internal/OrgStatsTable';
import { Row } from 'react-bootstrap';
import RevenueChart from '../../components/analytics/internal/RevChart';
import '../../assets/scss/icons.scss';
const _logger = debug.extend('InternalAnalytics');

const InternalAnalytics = () => {
    const [analytics, setAnalytics] = useState();
    const [modalProps, setModalProps] = useState();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        analyticsService.getAllAnalytics().then(onGetAllAnalyticsSuccess).catch(onGetAllAnalyticsError);
    }, []);

    const onModalToggle = (props) => {
        _logger('Modal From Main Page', props);
        setModalProps((prevState) => {
            let data = { ...prevState };
            data = props;
            toggle(!modal);
            return data;
        });
    };
    const toggle = () => {
        setModal(!modal);
    };
    const onGetAllAnalyticsSuccess = (response) => {
        _logger(response);
        setAnalytics((prevState) => {
            let newData = { ...prevState };
            newData = response.item;
            newData.orgsAnalytics.revenues.forEach((org) => {
                org.annualRevenue = parseFloat(org.annualRevenue).toFixed(2);
                org.monthlyRevenue = parseFloat(org.monthlyRevenue).toFixed(2);
                org.weeklyRevenue = parseFloat(org.weeklyRevenue).toFixed(2);
            });
            return newData;
        });
    };
    const onGetAllAnalyticsError = (error) => {
        _logger(error);
    };
    _logger(analytics);
    return (
        <>
            <div className="col-12">
                <Row className="mx-2">
                    <div className="col-lg-5 analyticsCardWidget col-sm-12 col-md-12 mt-5">
                        {analytics?.usersAnalytics && analytics?.orgsAnalytics && (
                            <UsersOrgsStatistics
                                users={analytics?.usersAnalytics}
                                orgs={analytics?.orgsAnalytics}
                                orders={analytics?.ordersAnalytics}
                                modalToggle={onModalToggle}
                            />
                        )}
                    </div>
                    <div className="col-lg-7 col-sm-12 col-md-12 justify-content-end mb-5">
                        {analytics?.orgsAnalytics && (
                            <OrgStatsTable
                                clssName="mb-3"
                                invites={analytics?.orgsAnalytics?.invites}
                                revenues={analytics?.orgsAnalytics?.revenues}
                            />
                        )}
                    </div>
                </Row>
            </div>
            <Row>
                <div className="col-lg-5 col-sm-12 col-md-12 mb-2">
                    {analytics?.revenueAnalytics && <BarChart revenue={analytics?.revenueAnalytics} />}
                </div>
                <div className="col-lg-7 col-sm-12 col-md-12">
                    <RevenueChart />
                </div>
            </Row>

            <ChartModal content={modalProps} toggle={toggle} modal={modal} />
        </>
    );
};

export default InternalAnalytics;
