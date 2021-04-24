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
    toggleLoop: () => void
    toggleShuffle: () => void
    clearPlayerState: () => void
    isLooping: boolean
    isShuffling: boolean
}

type PlayerContextProviderProps = {
    children: ReactNode // ReactNode for any kind of HTML tag
}

export const PlayerContext = createContext({} as PlayerContextData) 

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)

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

    function toggleLoop(){
        setIsLooping(!isLooping)
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean){
        setIsPlaying(state)
    }

    function clearPlayerState() {
        setEpisodeList([])
        setcurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length

    function playNext() {
        if(isShuffling){
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setcurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (hasNext){
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
            toggleLoop,
            isLooping,
            isShuffling,
            toggleShuffle,
            clearPlayerState,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}