import { createContext, ReactNode, useState, useContext } from 'react'

type Episode = {
    title: string
    members: string
    thumbnail: string
    duration: number
    url: string
}

type PlayerContextData = {
    episodeList: Episode[]
    currentEpisodeIndex: number
    isPlaying: boolean
    play: (episode: Episode) => void
    playList: (list: Episode[], index: number) => void
    togglePlay: () => void
    setPlayingState: (state: boolean) => void
    playNext: () => void
    playPrevious: () => void
    hasNext: boolean
    hasPrevious: boolean
    
}

type PlayerContextProviderProps = {
    children: ReactNode // ReactNode for any kind of HTML tag
}

export const PlayerContext = createContext({} as PlayerContextData) 

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    function play(episode: Episode){
        setEpisodeList([episode])
        setcurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list)
        setcurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay(){
        setIsPlaying(!isPlaying)
    }

    function setPlayingState(state: boolean){
        setIsPlaying(state)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if(hasNext){
            setcurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if(hasPrevious){
            setcurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    return (
        <PlayerContext.Provider 
        value={{
            episodeList,
            currentEpisodeIndex, 
            play,
            playList,
            playNext,
            playPrevious, 
            isPlaying, 
            togglePlay, 
            setPlayingState,
            hasPrevious,
            hasNext,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}