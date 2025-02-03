import {useEffect, useState} from 'react'

export const useRetrieveToken = () => {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const receiveMessage = ({data}) => {
            if (!data?.source) setToken(data)
        }

        window.addEventListener('message', receiveMessage, true)

        window.ReactNativeWebView?.postMessage('ready')

        return () => window.removeEventListener('message', receiveMessage)
    }, [])

    return token
}
