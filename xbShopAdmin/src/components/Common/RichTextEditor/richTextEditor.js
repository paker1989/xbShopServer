/**
 * 集成了ant-d form富文本编辑器
 * <p>valuePropName: richContent</p>
 * <p>集成了antd的upload</p>
 * reference:
 * integrate form: https://braft.margox.cn/demos/antd-upload
 * APIs: https://www.yuque.com/braft-editor/be/gz44tn
 * icon issue check: https://github.com/margox/braft-editor/issues/357
 */
import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Upload, Icon } from 'antd';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';

import { selectFileImage } from '../../../utils/upload.helper';
import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';
import './richTextEditor.scss';

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
        placeholder = '请输入商品详情',
        language = 'zh',
        ...props
    },
    ref
) => {
    const { onChange, richContent } = props;
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(richContent));
    const compressOptions = useSelector((state) => state.meta.imageReducers.compress.gallery);

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
                language={language}
                placeholder={placeholder}
                onChange={handleChange}
                value={editorState}
                extendControls={extendControls}
            />
        </div>
    );
};

export default forwardRef(RichTextEditor);
