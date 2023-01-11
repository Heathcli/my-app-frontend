import React, { useEffect, useState } from 'react'
import { Button, Segmented } from 'antd';
import { Space, Table, Tag } from 'antd';
import UserCenter from '../../../../components/UserCenterLayout'
import { SegmentedLabeledOption, SegmentedValue } from 'antd/es/segmented';
import styles from './index.module.less';
import { parseSearch } from '../../../../lib/util';


const { Column, ColumnGroup } = Table;

type DataType = {
  id: number,
  title: string,
  cover: string,
  status: 0 | 1 | 2, // 0 - 发布；1 - 草稿/下线；2 - 回收站
  createdAt: string,
  updateAt: string
}

const dataSource = [
  {
    id: '1',
    title: '胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌胡彦斌',
    cover: 'https://5b0988e595225.cdn.sohucs.com/a_auto,c_cut,x_0,y_0,w_4592,h_3061/images/20181215/4e77f3573d1a4a48b8821d6b82be2a32.jpeg',
    createdAt: '2022-12-29 09:55:10',
    updateAt: '2022-12-29 09:55:10'
  },
  {
    id: '2',
    title: '胡彦斌',
    cover: 'https://5b0988e595225.cdn.sohucs.com/a_auto,c_cut,x_0,y_0,w_4592,h_3061/images/20181215/4e77f3573d1a4a48b8821d6b82be2a32.jpeg',
    createdAt: '2022-12-29 09:55:10',
    updateAt: '2022-12-29 09:55:10'
  },
];

export default function ArticleManage() {
  // 发布状态列表
  const [statusList, setStatusList] = useState<(SegmentedValue | SegmentedLabeledOption)[]>([
    {
      label: '已发布',
      value: 0
    },
    {
      label: '已下线',
      value: 1
    },
    {
      label: '回收站',
      value: 2
    }
  ])
  // 当前选中的状态
  const [currentStatus, setCurrentStatus] = useState<number>(0)
  const [showDeleteModel,setShowDeleteModel] = useState<boolean>(false)
  const [showChangeLineModel,setShowChangeLineModel] = useState<boolean>(false)
  useEffect(() => {
    const initStatus = parseSearch(window.location.search).status
    if (initStatus) {
      setCurrentStatus(parseInt(initStatus))
    }
  }, [])

  const switchStatus = (status: SegmentedValue) => {
    setCurrentStatus(status as number)
    window.history.pushState(
      null,
      '',
      `${window.location.pathname}?status=${status}`
    );
  }

  const renderAction = (record: DataType) => {
    return <>
      <Button
        type="dashed"
        size='small'
        onClick={() => window.location.href = `/user/center/article-manage/publish-content/${record.id}`}>
        编辑
      </Button>
      <Button
        type="dashed"
        size='small'
        onClick={() => setShowChangeLineModel(true)}>
        {currentStatus === 0 && '下线'}
        {currentStatus === 1 && '上线'}
        {currentStatus === 2 && '恢复'}
      </Button>
      {
        currentStatus !== 2 && <Button
        type="dashed"
        size='small'
        onClick={() => setShowDeleteModel(true)}>
        删除
      </Button>
      }
    </>
  }

  return (
    <UserCenter>
      <div className={styles.mt_articleManage}>
        <div className={styles.header}>
          <Segmented
            value={currentStatus}
            onChange={switchStatus}
            options={statusList}
            block={true}
            onResize={undefined}
            onResizeCapture={undefined} />
          <Table dataSource={dataSource} scroll={{ x: 1000 }}>
            <Column title="id" dataIndex="id" key="id" width={50} align='center' />
            <Column title="标题" dataIndex="title" key="title" width={400} align='center' />
            <Column
              title="封面图"
              dataIndex="cover"
              key="cover"
              render={(cover: string) => (
                <div className={styles.cover_box}>
                  <img className={styles.cover} src={cover}></img>
                </div>
              )}
              align='center'
            />
            <Column title="创建时间" dataIndex="createdAt" key="createdAt" align='center' />
            <Column title="更新时间" dataIndex="updateAt" key="updateAt" align='center' />
            <Column
              title="Action"
              key="action"
              fixed='right'
              width={200}
              align='center'
              render={(_: any, record: DataType) => (
                <Space size="middle">
                  {renderAction(record)}
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </UserCenter>
  )
}
