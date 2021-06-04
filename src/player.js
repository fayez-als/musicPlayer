import { duration, Typography } from '@material-ui/core'
import './player.css'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { IconButton } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import PauseIcon from '@material-ui/icons/Pause';
import { LinearProgress } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';






export function Player(props){
    const songsList =[
        {song:'sasha.mp3',singer:'Sasha Sloan',text:'House With No Mirror',img:'pic1.jfif'},
        {song:'Sting.mp3',singer:'Sting',text:'Desrt Rose',img:'pic3.jfif'},
        {song:'blackVelvet.mp3',singer:'Alanah Myles',text:'Black Velvet',img:'pic4.jfif'}

    ]
    
    const [playing,setPlaying] = useState(false)
    const playButton =  <IconButton onClick={Play}><PlayCircleFilledIcon  style={{fontSize:60}}fontSiz='large'/></IconButton>
    const PauseButton = <IconButton onClick={Pause} ><PauseIcon style={{fontSize:60}}fontSiz='large'/></IconButton>
    const song = useRef()
    const [event,setEvent] = useState('')

    const [duration,setDuration] = useState(0)
    const [currentTime,setCurrentTime] = useState(0)
    const [progress,setProgress] = useState(0)
    const [nowPlaying,setNowPlaying] =useState(0)
    



    useEffect(()=>{
        setProgress((currentTime/duration)*100)
        
        if(currentTime>=duration-1){
            Next()

        }


    })
    
    


 



    function Play(e){
        song.current.play()
        setPlaying(true)
        
      
    }
    function Pause(){
        song.current.pause()
        setPlaying(false)
    }

    function timeUpdate(e){
        setCurrentTime(e.target.currentTime)
    }
    function loadUpdate(e){
        setDuration(e.target.duration)
    }

    function progressUpdate(e){
        console.log(e)
        console.log(e.target.clientWidth,e.nativeEvent.offsetX)
        song.current.currentTime = ((e.nativeEvent.offsetX/e.target.clientWidth)*duration)
    }
    function Next(){
        if(nowPlaying<songsList.length-1){
        setNowPlaying(prev=>prev+1)
        song.current.load()
        if(playing){song.current.play()}
    }}

    function Prev(){
        if(nowPlaying>0){
        setNowPlaying(prev=>prev-1)
        song.current.load()
        if(playing){song.current.play()}
    }else{
        song.current.load()
        if(playing){song.current.play()}

    }}
    function onScrub(e){
        
        song.current.currentTime=e.target.value

    }



  


    return(

        <div className='player'>
            
        <div style={{backgroundImage:`url(/${songsList[nowPlaying].img})`}}className='picture'></div>
        <div className='infos'>
        <h3>{songsList[nowPlaying].text}</h3>
        <h4>{songsList[nowPlaying].singer}</h4>
        <div className='lower'> 
        
 
        <div className='time'><div>{`${Math.floor(currentTime/60)}:${("0"+Math.floor(currentTime%60)).slice(-2)}`}</div><div>{`${Math.floor(duration/60)}:${Math.floor(duration%60)}`}</div></div>

        <div  className='progress'><LinearProgress variant="determinate" value={progress} /></div>
        <input className='inputrange' type='range' mind={0} max={duration} value={currentTime} onChange={onScrub}/>
     
        <div className='buttons'><IconButton onClick={Prev}><SkipPreviousIcon  fontSize='large'/></IconButton>{playing?PauseButton:playButton}<IconButton onClick={Next}><SkipNextIcon fontSize='large'/></IconButton></div>
        </div>

        <audio onLoadedData={loadUpdate} onTimeUpdate={timeUpdate} ref={song}  autoplay>
           
                     <source src={'/'+ songsList[nowPlaying].song} type="audio/mpeg"/>
Your browser does not support the audio element.
                        </audio>


       

        
       
        
        
        
                        </div>

        </div>
        
    )
}