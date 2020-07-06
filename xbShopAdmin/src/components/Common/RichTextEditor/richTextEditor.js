import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import PropTypes from 'prop-types';

import './richTextEditor.scss';

const RichTextEditor = (props) => {
    const { controls, language, placeholder } = props;
    return (
        <BraftEditor className="rich-text-editor" controls={controls} language={language} placeholder={placeholder} />
    );
};

RichTextEditor.defaultProps = {
    controls: [
        'bold',
        'italic',
        'underline',
        'undo',
        'redo',
        'font-size',
        'text-color',
        'separator',
        'link',
        'separator',
        'media',
    ],
    placeholder: '请输入商品详情',
    language: 'zh',
};

RichTextEditor.propTypes = {
    controls: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    language: PropTypes.string,
};

export default RichTextEditor;
