/**
 * general Steps
 */
import React from 'react';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
// import {useca} from 'ahooks';
// import cx from 'classnames';

const { Step } = Steps;

const FormSteps = ({ activeStep, data, onChange }) => {
    return (
        <div className="form-steps">
            <Steps current={activeStep}>
                {data.map((item, index) => {
                    return (
                        <Step
                            key={`form-step-${index}`}
                            title={item.title}
                            onClick={() => {
                                onChange(index);
                            }}
                        ></Step>
                    );
                })}
            </Steps>
        </div>
    );
};

FormSteps.propTypes = {
    activeStep: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string, status: PropTypes.string })),
    onChange: PropTypes.func,
};

export default FormSteps;
