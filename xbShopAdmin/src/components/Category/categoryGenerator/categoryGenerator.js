/**
 * 添加主页
 */
import React from 'react';
import { Button, Card, Row, Col } from 'antd';
import { injectIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';

import HLPageHeader from '../../Common/HighLightPageHeader/hLPageHeader';
import AddForm from './addCategoryForm';

import { addCategory as addCategoryMeta } from '../../../static/data/componentMeta/category/categoryMeta';
import './categoryGenerator.scss';

const CategoryGenerator = ({ intl }) => {
    const { description, title } = addCategoryMeta;

    const { layout } = addCategoryMeta;
    return (
        <div className="category-generator">
            <HLPageHeader
                title={intl.formatMessage({ id: title })}
                description={intl.formatMessage({ id: description })}
                extra={
                    <Button type="primary">
                        <NavLink to="/dashboard/category">{intl.formatMessage({ id: 'common.return.list' })}</NavLink>
                    </Button>
                }
            />
            <div className="section-container">
                <Card bordered={false}>
                    <Row style={{ margin: '40px 0' }}>
                        <Col {...layout.formWrapper}>
                            <AddForm />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default injectIntl(CategoryGenerator);
