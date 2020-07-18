import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Button, Card, Table, Popconfirm, Row, Col, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import HLPageHeader from '../Common/HighLightPageHeader/hLPageHeader';

import * as CategoryActionType from '../../store/actionType/categoryActionType';
import * as CategoryActionCreator from '../../store/action/categoryActions';
import { homeCategory as homeCategoryMeta } from '../../static/data/componentMeta/category/categoryMeta';

import './category.index.scss';
import { useUnmount } from 'ahooks';

const CategoryHome = ({ intl }) => {
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.categoryReducer.categories);
    const isInited = useSelector((state) => state.categoryReducer.isInited);
    const backendStatus = useSelector((state) => state.categoryReducer.backendStatus);
    const backendMsg = useSelector((state) => state.categoryReducer.backendMsg);

    const [loading, setLoading] = useState(!isInited);

    const { title, description, layout } = homeCategoryMeta;

    useEffect(() => {
        if (isInited === false) {
            dispatch(CategoryActionCreator.getCategories({}));
        } else {
            setLoading(false);
        }
    }, [isInited]);

    useEffect(() => {
        if (backendStatus === CategoryActionType._EDIT_CATEGORY_SUCCESS) {
            dispatch(CategoryActionCreator.resetAddCategoryStatus()); // reset backend status
        } else if (backendStatus === CategoryActionType._EDIT_CATEGORY_FAIL) {
            dispatch(CategoryActionCreator.resetAddCategoryStatus()); // reset backend status
            message.error(backendMsg);
        }
    }, [backendStatus]);

    useUnmount(() => {
        dispatch(CategoryActionCreator.resetAddCategoryStatus()); // reset backend status
    });

    const handleDelete = (idCategory) => {
        dispatch(CategoryActionCreator.updateCategory({ idCategory, isDeleted: 1 }));
    };

    const columns = [
        {
            title: intl.formatMessage({ id: 'common.id' }),
            dataIndex: 'idCategory',
            key: 'idCategory',
        },
        {
            title: intl.formatMessage({ id: 'cat.name' }),
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: intl.formatMessage({ id: 'cat.active' }),
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => {
                return intl.formatMessage({ id: text ? 'common.yes' : 'common.no' });
            },
            width: '25%',
        },
        {
            title: intl.formatMessage({ id: 'common.delete' }),
            dataIndex: 'operation',
            key: 'operation',
            width: '20%',
            render: (text, record) => {
                return (
                    <div className="option-sep-container">
                        <Popconfirm
                            title={intl.formatMessage({ id: 'common.delete.confirm' })}
                            onConfirm={() => handleDelete(record.idCategory)}
                        >
                            <span className="product-spec-form-item clickable danger inline-block">
                                {intl.formatMessage({ id: 'common.delete' })}
                            </span>
                        </Popconfirm>
                        <NavLink to={`/dashboard/addCategory/${record.idCategory}`}>
                            <FormattedMessage id="common.edit" />
                        </NavLink>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="category-home">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary">
                        <NavLink to="/dashboard/addCategory">{intl.formatMessage({ id: 'cat.addCat' })}</NavLink>
                    </Button>
                }
            />
            <div className="section-container">
                <Card bordered={false}>
                    <Row>
                        <Col {...layout.table}>
                            <Table
                                size="large"
                                columns={columns}
                                dataSource={categoryList}
                                rowKey={(record) => record.idCategory}
                                loading={loading}
                                // pagination={false}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default injectIntl(CategoryHome);
