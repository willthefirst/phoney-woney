import React, { useEffect, useState } from 'react'
import { isJSDocUnknownTag } from 'typescript'
import NotSupportedMessage from './NotSupportedMessage'

// Necessary since Typescript doesn't support `Accelerometer` as of 12/3/22.
declare var Accelerometer: any

type Props = {}

function PhoneApp({ }: Props) {
    const [notSupported, setNotSupported] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        if (!(('Accelerometer' in window))) {
            setNotSupported(true)
            return
        }

        const acl = new Accelerometer({ frequency: 60 })

        acl.addEventListener("reading", () => {
            setData(acl)
            console.log(`Acceleration along the X-axis ${acl.x}`)
            console.log(`Acceleration along the Y-axis ${acl.y}`)
            console.log(`Acceleration along the Z-axis ${acl.z}`)
        })

        acl.start()

    }, [])

    return (
        <div>
            {notSupported ?
                <NotSupportedMessage /> :
                <pre>{JSON.stringify(data, undefined, 2)}</pre>
            }
        </div>
    )
}

export default PhoneApp
