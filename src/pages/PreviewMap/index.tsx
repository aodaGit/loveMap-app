import { BMap } from '../BuissnessMap'
import styles from './index.module.scss'
import carIcon from '../../assets/images/car.png'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import domtoimage from '../../lib/dom-to-image'
import moment from 'moment'
import { Button } from 'antd'
const PreviewMap = () => {
  const location = useLocation()
  const [list, setList] = useState<BMap[]>([])
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const state: BMap[] = location.state
    const sortData =
      state.sort((c, b) => +moment(b.time).valueOf() - +moment(c.time).valueOf()) ?? []
    setList(() => [...sortData])
  }, [location.state])
  const getIMG = () => {
    const node = document.getElementById('ZYR')
    domtoimage
      ?.toJpeg(node, {
        scale: 4,
        quality: 0.95,
        width: node?.clientWidth ?? 0,
        height: node?.clientHeight ?? 0
      })
      .then(url => {
        const link = document.createElement('a')
        link.download = `${moment().format('LLLL')}.jpeg`
        link.href = url
        link.click()
      })
  }

  return (
    <div className={styles.previewMap}>
      <div className={styles.content} id="ZYR">
        {list.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.time}>
              <span>
                <img className={styles.carIcon} src={carIcon}></img>
              </span>
              <span className={styles.text}>{item?.time}</span>
            </div>
            <div className={styles.address}>
              <span className={styles.icon}>
                <span className={styles.redC}></span>
                <span className={styles.borderC}></span>
                <span className={styles.greenC}></span>
              </span>
              <span className={styles.name}>
                <span>{item?.from}</span>
                <span>{item?.to}</span>
              </span>
            </div>
            <div className={styles.spendTime}>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.allMileage}</span>
                  <span>km</span>
                </span>
                <span>????????????</span>
              </span>
              <span className={styles.column}>
                <span className={styles.value}>{item?.spendTime}</span>
                <span>????????????</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.average}</span>
                  <span>km/h</span>
                </span>
                <span>????????????</span>
              </span>
              <span className={styles.column}>
                <span>
                  <span className={styles.value}>{item?.maxSpend}</span>
                  <span>km/h</span>
                </span>
                <span>????????????</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        className={styles.save}
        type="primary"
        onClick={() => {
          getIMG()
        }}
      >
        ??????????????????
      </Button>
    </div>
  )
}

export default PreviewMap
