/**
 * 集成了ant-d form富文本编辑器
 * <p>valuePropName: richContent</p>
 * <p>集成了antd的upload</p>
 * reference:
 * integrate form: https://braft.margox.cn/demos/antd-upload
 * APIs: https://www.yuque.com/braft-editor/be/gz44tn
 * icon issue check: https://github.com/margox/braft-editor/issues/357
 */
import React, { forwardRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Upload, Icon } from 'antd';
import { injectIntl } from 'react-intl';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';

import { selectFileImage } from '../../../utils/upload.helper';
import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';
import './richTextEditor.scss';

/* eslint-disable */
const _supported_languages = ['zh', 'zh-hant', 'en'];

const RichTextEditor = (
    {
        controls = [
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
        ],
        placeholder = 'product.add.detailDscp.placeholder',
        language,
        intl,
        ...props
    },
    ref
) => {
    const { onChange, richContent } = props;
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(richContent));
    const [langProps, setLangProps] = useState(language || globalLocale);
    const compressOptions = useSelector((state) => state.meta.imageReducers.compress.gallery);
    const globalLocale = useSelector((state) => state.meta.languageReducers.globalLocale);

    /**
     * define language, priority: language props -> global locale
     */
    useEffect(() => {
        if (_supported_languages.findIndex((lang) => lang === langProps) === -1) {
            setLangProps(_supported_languages[0]);
        }
    }, [language, globalLocale]);

    const handleChange = (content) => {
        setEditorState(content);
        onChange(content.toHTML());
    };

    const uploadHandler = async (param) => {
        const { file } = param;

        if (!file) {
            return false;
        }
        const thumbUrl = await selectFileImage(
            file.originFileObj || file,
            productGenerator.maxOriginFileSize,
            compressOptions
        );
        handleChange(
            ContentUtils.insertMedias(editorState, [
                {
                    type: 'IMAGE',
                    url: thumbUrl,
                },
            ])
        );
        return true;
    };

    const extendControls = [
        {
            key: 'antd-uploader',
            type: 'component',
            component: (
                <Upload accept="image/*" showUploadList={false} customRequest={uploadHandler}>
                    <button type="button" className="control-item button upload-button" data-title="插入图片">
                        <Icon type="picture" theme="filled" />
                    </button>
                </Upload>
            ),
        },
    ];

    return (
        <div ref={ref}>
            <BraftEditor
                className="rich-text-editor"
                controls={controls}
                language={langProps}
                placeholder={intl.formatMessage({ id: placeholder })}
                onChange={handleChange}
                value={editorState}
                extendControls={extendControls}
            />
        </div>
    );
};

export default injectIntl(forwardRef(RichTextEditor));
