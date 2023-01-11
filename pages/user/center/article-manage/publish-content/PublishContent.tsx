import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Helmet } from "react-helmet";
import { message } from 'antd'
import http from '../../../../../lib/http'
import { useRouter } from 'next/router';

type InsertFnType = (url: string, alt: string, href: string) => void
type Props = {
    type:'edit' | 'add'
}

function PublishContent(props:Props) {
    const router = useRouter()
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    // 编辑器内容
    const [html, setHtml] = useState<string>('')

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        if(props.type === 'add') {
            addInit()
        } else {
            modInit(router.query.id as number | string)
        }
    }, [])
    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        excludeKeys: [
            'bgColor',
            'lineHeight',
            'todo',
            'emotion',
            'group-video',
            'insertTable',
            'fullScreen',
            'insertImage',
            'sup',
            'sub'
        ]
    }

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        MENU_CONF: {
            uploadImage: {
                // 上传图片
                async customUpload(file: File, insertFn: InsertFnType) {
                    http.upload('/article/upload', 'image', file,).then((res: any) => {
                        if (res.url) {
                            insertFn(res.url, '', '')
                        }
                    }).catch(() => {

                    })
                },
                // 上传错误，或者触发 timeout 超时
                onError(file: File, err: any, res: any) {
                    message.error('上传图片超时，请稍后重试')
                }
            },
            // 代码块支持
            codeSelectLang: {
                codeLangs: [
                    { text: 'CSS', value: 'css' },
                    { text: 'HTML', value: 'html' },
                    { text: 'Javascript', value: 'Javascript' },
                    { text: 'Typescript', value: 'Typescript' }
                ]
            }
        },
        placeholder: '请输入内容...',
    }

    const addInit = () => {
        setHtml('<p>新增</p>')
    }

    const modInit = (id:number | string) => {
        setHtml('<p>编辑</p>')
    }
    return (
        <>
            <Helmet>
                <title>新建文章</title>
            </Helmet>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
        </>
    )
}

export default PublishContent