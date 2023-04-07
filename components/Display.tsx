import styles from '@/styles/display.module.scss'

import { useCallback, useMemo, useState } from "react";
import $ from 'jquery'
import { useClock } from "@/hooks/useClock";
import { UI } from "@/components/UI";
import { useSettings } from "@/hooks/useSettings";
import ReactPlayer from 'react-player'
import { useVideoData } from '@/hooks/useVideoData';
import { BlinkStyle } from '@/types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const Colon = ({ style }: { style: BlinkStyle}) => {
  return (
    <span className={
      style === 'sharp'
        ? styles.sharpColon
        : style === 'smooth'
        ? styles.smoothColon
        : undefined
    }>:</span>
  )
}

export const Display = () => {
  const { settings } = useSettings()
  const { currentTime } = useClock()
  const { data, queuePosition, nextVideo, endOfQueueKey} = useVideoData()

  const [uiOpen, setUiOpen] = useState<boolean>(false)
  const [hours, minutes, seconds] = currentTime.split(':')
  
  const handleOpenUi = () => setUiOpen(true)
  const handleCloseUi = () => setUiOpen(false)

  const srcFileName = useMemo(() => 
    data[queuePosition]?.fileName ?? ''
  , [queuePosition, data])

  const onVideoEnded = useCallback(async () => {
    $('#video').fadeOut(settings?.videoFadeInOutTime ?? 0)
    await delay(settings?.videoFadeInOutTime ?? 0)
    await delay((settings?.timeBetweenVideos ?? 0) * 1000)
    await nextVideo()
    $('#video').fadeIn(settings?.videoFadeInOutTime ?? 0)
  }, [nextVideo, settings?.timeBetweenVideos, settings?.videoFadeInOutTime])

  return (
    <>
      <section className={styles.showcase} onClick={handleOpenUi}>
        {settings &&
          <span id="clock"
            className={styles.clock}
            style={{
              fontFamily: settings?.clockFontFamily,
              fontSize: `${settings?.clockFontSize}rem`,
              top: settings?.clockPosition === 'top' ? '0%' : undefined,
              bottom: settings?.clockPosition === 'bottom' ? '0%' : undefined,
              color: settings?.clockColor,
            }}
          >
            {hours}
            <Colon key={seconds} style={settings?.blinkStyle} />
            {minutes}
            {seconds && (<><Colon key={seconds} style={settings?.blinkStyle}/>{seconds}</>)}
          </span>
        }
        {data.length !== 0 &&
          <ReactPlayer
            key={endOfQueueKey}
            id='video'
            url={srcFileName}
            muted
            onEnded={onVideoEnded}
            controls={false}
            playing
            onError={nextVideo}
          />
        }
      </section>
      <UI open={uiOpen} onClose={handleCloseUi} />
    </>
  );
};

export default Display;