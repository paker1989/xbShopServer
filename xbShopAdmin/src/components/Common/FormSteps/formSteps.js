/**
 * general Steps
 */
import React from 'react';
import { Steps } from 'antd';
import PropTypes from 'prop-types';

const { Step } = Steps;

const FormSteps = ({ activeStep, data, onChange }) => {
    return (
        <div className="form-steps">
            <Steps current={activeStep}>
                {data.map((item, index) => {
                    return (
                        <Step
                            key={`form-step-${item.title}`}
                            title={item.title}
                            onClick={() => {
                                onChange(index);
                            }}
                        />
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
