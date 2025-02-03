import {useEffect} from 'react'
import {useTaxbit} from '@taxbit/react-sdk'

export const Confirmation = ({
                                 bearerToken,
                                 questionnaire,
                             }: {
    questionnaire: 'W-FORM' | 'DPS';
    bearerToken: string;
}) => {
    const {
        canGetDocumentUrl,
        generateDocumentUrl,
        isGeneratingDocumentUrl,
        documentUrl,
    } = useTaxbit({bearerToken, questionnaire})

    useEffect(() => {
        if (canGetDocumentUrl) {
            generateDocumentUrl()
        }
    }, [canGetDocumentUrl])

    const downloadButton = canGetDocumentUrl ? (
        documentUrl ? (
            <a href={ documentUrl } className='taxbit-button' download>
                Download document
            </a>
        ) : isGeneratingDocumentUrl ? (
            <button className='taxbit-button' disabled>
                Generating PDF <InlineSpinner/>
            </button>
        ) : null
    ) : null

    return (
        <>
            <H2>Your tax form was created successfully!</H2>
            No further action is required.
            { downloadButton && (
                <>
                    <p>You can download your tax form below for your records.</p>
                    <p className='taxbit-primary-actions'>{ downloadButton }</p>
                </>
            ) }
        </>
    )
}
