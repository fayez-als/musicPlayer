import { Typography } from '@material-ui/core'
import './player.css'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import PauseIcon from '@material-ui/icons/Pause';
import { LinearProgress } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';




export function Player(props){
    const [playing,setPlaying] = useState(false)
    const playButton =  <IconButton onClick={Play}><PlayCircleFilledIcon  style={{fontSize:60}}fontSiz='large'/></IconButton>
    const PauseButton = <IconButton onClick={Pause}><PauseIcon style={{fontSize:60}}fontSiz='large'/></IconButton>
    const [playingnow,setPlayingnow] = useState(0)
    const [songs,setSong] = useState(['sasha.mp3','magnet.mp3'])
    const [duration,setDuration] = useState(300)
    const [current,setCurrent] = useState('0')


 



    const music = document.querySelector('audio')

    

    function Play(e){
        const music = document.querySelector('audio')
        
        
        
        music.play()
        
        setPlaying(true)
        music.addEventListener('timeupdate',updateTime)

        

    }

    function updateTime(e){
        console.log(e)
        
        setCurrent(e.srcElement.currentTime)
    }

    function Pause(){
        music.pause()
        setPlaying(false)
    }
    function Next(){
        if(playingnow<songs.length-1){
        setPlayingnow(playingnow+1)
        console.log('next')
        const music = document.querySelector('audio')
        music.load()
        music.play()
        
        
        setPlaying(true)}
    }
    function Prev(){
        if(playingnow>0){
        setPlayingnow(playingnow-1)
        console.log('next')
        const music = document.querySelector('audio')
        music.load()
        music.play()
       
        
        setPlaying(true)}else{
            const music = document.querySelector('audio')
            music.load()
            music.play()

        }
    }



    return(

        <div className='player'>
            
        <div style={{backgroundImage:'url(/pic1.jfif)'}}className='picture'></div>
        <div className='infos'>
        <h3>House With No Mirrors</h3>
        <h4>Sasha Someone</h4>
        <div className='lower'>
        <div className='time'>
        <div>{`${Math.floor(current/60)}:${("0"+Math.floor(current%60)).slice(-2)}`}</div>
        <div>{`${Math.floor(duration/60)}:${Math.floor(duration%60)}`}</div></div>
        <div className='progress'><LinearProgress variant="determinate" value={(current/(duration))*100} /></div>
        

        <div className='buttons'><IconButton><SkipPreviousIcon onClick={Prev} fontSize='large'/></IconButton>{playing?PauseButton:playButton}<IconButton onClick={Next}><SkipNextIcon fontSize='large'/></IconButton></div>
        </div>
        <audio autoplay>
           
                     <source src={songs[playingnow]} type="audio/mpeg"/>
Your browser does not support the audio element.
                        </audio>

        
       
        
        
        
                        </div>
        </div>
    )
}