import '@taxbit/react-sdk/style/inline.css'
import { TaxbitQuestionnaire } from '@taxbit/react-sdk'
import { useRetrieveToken } from './hooks/use-retrieve-token/useRetrieveToken'
import React from 'react'


function App() {
  const token = useRetrieveToken()

  const onSubmitCallback = (data) => {
    console.log('onSubmitCallback', data)
  }

  const onSuccessCallback = () =>
    window.ReactNativeWebView?.postMessage('submitted')


  const onErrorCallback = () =>
    window.ReactNativeWebView?.postMessage('error')

  return token ? (
    <>
      <TaxbitQuestionnaire
        bearerToken={token}
        questionnaire='W-FORM'
        onError={onErrorCallback}
        onSubmit={onSubmitCallback}
        onSuccess={onSuccessCallback}
        loadingComponent={<span className='loader'/>}
      />
    </>
  ) : (
    <span className='loader'/>
  )
}

export default App
